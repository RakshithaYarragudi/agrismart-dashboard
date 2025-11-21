const express = require('express');
const { db } = require('../config/firebase');
const axios = require('axios');
const router = express.Router();

/**
 * @swagger
 * /recommend-crop:
 *   post:
 *     summary: Get crop recommendations based on various factors
 *     tags: [Crops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               soil_type:
 *                 type: string
 *               budget:
 *                 type: number
 *               land_size:
 *                 type: number
 *               duration_preference:
 *                 type: number
 *               location:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lon:
 *                     type: number
 *               previous_crops:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Crop recommendations generated successfully
 */
router.post('/recommend-crop', async (req, res) => {
  try {
    const { soil_type, budget, land_size, duration_preference, location, previous_crops = [] } = req.body;

    // Fetch crops from database
    const cropsSnapshot = await db.collection('crops').get();
    const crops = cropsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch weather data
    let weatherData = null;
    if (location) {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );
        weatherData = weatherResponse.data;
      } catch (error) {
        console.error('Weather fetch failed, using default values');
      }
    }

    // Score each crop
    const scoredCrops = crops.map(crop => {
      let score = 100; // Base score

      // Soil compatibility (30 points)
      if (soil_type && crop.soil_types && crop.soil_types.includes(soil_type)) {
        score += 30;
      }

      // Budget compatibility (20 points)
      if (budget && land_size) {
        const totalCost = crop.budget_per_acre * land_size;
        if (totalCost <= budget) {
          score += 20;
        } else {
          score -= Math.min(20, ((totalCost - budget) / budget) * 100);
        }
      }

      // Duration preference (15 points)
      if (duration_preference && crop.duration_days) {
        const durationDiff = Math.abs(crop.duration_days - duration_preference);
        score -= Math.min(15, (durationDiff / duration_preference) * 100);
      }

      // Crop rotation rules (15 points)
      if (previous_crops.length > 0) {
        const rotationPenalty = previous_crops.includes(crop.name) ? 15 : 0;
        score -= rotationPenalty;
      }

      // Weather compatibility (20 points)
      if (weatherData) {
        const temp = weatherData.main.temp;
        const humidity = weatherData.main.humidity;

        // Temperature check
        if (temp > 35) score -= 5;
        if (temp < 10) score -= 5;

        // Pest risk based on humidity
        if (humidity > 70) {
          score -= crop.pest_risk === 'High' ? 10 : 5;
        }
      }

      // Ensure score is between 0-100
      score = Math.max(0, Math.min(100, score));

      return {
        crop: crop.name,
        score: Math.round(score),
        duration: crop.duration_days,
        cost_per_acre: crop.budget_per_acre,
        profit_per_acre: crop.profit_per_acre,
        pest_risk: calculatePestRisk(crop, weatherData),
        recommended_companion: crop.companion_crops || [],
        animal_risk_level: crop.animal_risk_level,
        suitability: getSuitabilityLevel(score)
      };
    });

    // Sort by score descending
    scoredCrops.sort((a, b) => b.score - a.score);

    res.json({
      recommendations: scoredCrops.slice(0, 10), // Top 10 recommendations
      weather_alerts: generateWeatherAlerts(weatherData),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Crop recommendation error:', error);
    res.status(500).json({ error: 'Failed to generate crop recommendations' });
  }
});

/**
 * @swagger
 * /crop-calendar:
 *   post:
 *     summary: Generate crop lifecycle calendar
 *     tags: [Crops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               crop_id:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: object
 *     responses:
 *       200:
 *         description: Crop calendar generated successfully
 */
router.post('/crop-calendar', async (req, res) => {
  try {
    const { crop_id, start_date, location } = req.body;

    const cropDoc = await db.collection('crops').doc(crop_id).get();
    if (!cropDoc.exists) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    const crop = cropDoc.data();
    const startDate = new Date(start_date);
    
    const calendar = {
      preparation: addDays(startDate, -14),
      sowing: startDate,
      germination: addDays(startDate, 7),
      growth: addDays(startDate, Math.floor(crop.duration_days * 0.3)),
      flowering: addDays(startDate, Math.floor(crop.duration_days * 0.6)),
      harvesting: addDays(startDate, crop.duration_days),
      post_harvest: addDays(startDate, crop.duration_days + 7)
    };

    res.json({
      crop: crop.name,
      duration_days: crop.duration_days,
      calendar,
      activities: generateActivities(calendar, crop)
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to generate crop calendar' });
  }
});

/**
 * @swagger
 * /cost-estimate:
 *   post:
 *     summary: Calculate cost and profit estimation
 *     tags: [Crops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               crop_id:
 *                 type: string
 *               land_size:
 *                 type: number
 *               additional_costs:
 *                 type: object
 *     responses:
 *       200:
 *         description: Cost estimation calculated successfully
 */
router.post('/cost-estimate', async (req, res) => {
  try {
    const { crop_id, land_size, additional_costs = {} } = req.body;

    const cropDoc = await db.collection('crops').doc(crop_id).get();
    if (!cropDoc.exists) {
      return res.status(404).json({ error: 'Crop not found' });
    }

    const crop = cropDoc.data();
    const baseCost = crop.budget_per_acre * land_size;
    const expectedProfit = crop.profit_per_acre * land_size;
    
    const totalAdditionalCosts = Object.values(additional_costs).reduce((sum, cost) => sum + cost, 0);
    const totalCost = baseCost + totalAdditionalCosts;
    const netProfit = expectedProfit - totalCost;
    const roi = (netProfit / totalCost) * 100;

    res.json({
      crop: crop.name,
      land_size,
      cost_breakdown: {
        base_cost: baseCost,
        additional_costs: totalAdditionalCosts,
        total_cost: totalCost
      },
      profit_breakdown: {
        expected_revenue: expectedProfit,
        net_profit: netProfit,
        roi: Math.round(roi * 100) / 100
      },
      per_acre: {
        cost: crop.budget_per_acre,
        profit: crop.profit_per_acre
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate cost estimate' });
  }
});

// Helper functions
function calculatePestRisk(crop, weatherData) {
  if (!weatherData) return crop.pest_risk;
  
  const humidity = weatherData.main.humidity;
  if (humidity > 70) return 'High';
  if (humidity > 50) return 'Medium';
  return crop.pest_risk;
}

function getSuitabilityLevel(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Moderate';
  return 'Poor';
}

function generateWeatherAlerts(weatherData) {
  if (!weatherData) return [];
  
  const alerts = [];
  if (weatherData.main.temp > 38) alerts.push('Heat alert');
  if (weatherData.main.humidity > 70) alerts.push('High pest risk due to humidity');
  if (weatherData.rain && weatherData.rain['1h'] < 2) alerts.push('Consider irrigation');
  
  return alerts;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
}

function generateActivities(calendar, crop) {
  return [
    { phase: 'Preparation', activity: 'Soil preparation and fertilization', date: calendar.preparation },
    { phase: 'Sowing', activity: `Sow ${crop.name} seeds`, date: calendar.sowing },
    { phase: 'Germination', activity: 'Monitor germination and thin plants', date: calendar.germination },
    { phase: 'Growth', activity: 'Weeding and pest control', date: calendar.growth },
    { phase: 'Flowering', activity: 'Monitor flowering and fruit set', date: calendar.flowering },
    { phase: 'Harvesting', activity: `Harvest ${crop.name}`, date: calendar.harvesting }
  ];
}

module.exports = router;