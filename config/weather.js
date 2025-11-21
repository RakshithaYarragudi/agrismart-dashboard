const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get weather data by location
 *     tags: [Weather]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Weather data retrieved successfully
 *       400:
 *         description: Missing required parameters
 *       500:
 *         description: Weather API error
 */
router.get('/', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      rainfall: response.data.rain ? response.data.rain['1h'] || 0 : 0,
      windSpeed: response.data.wind.speed,
      location: response.data.name
    };

    // Add alerts based on conditions
    const alerts = [];
    if (weatherData.temperature > 38) alerts.push('Heat alert: Temperature above 38°C');
    if (weatherData.humidity > 70) alerts.push('High pest risk: Humidity above 70%');
    if (weatherData.rainfall < 2 && weatherData.rainfall > 0) alerts.push('Irrigation needed: Low rainfall');

    res.json({
      ...weatherData,
      alerts,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Weather API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;