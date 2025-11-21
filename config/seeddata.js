// scripts/seedData.js
const { db } = require('../config/firebase');

const crops = [
  {
    name: "Tomato",
    soil_types: ["loamy", "sandy loam"],
    duration_days: 90,
    water_requirement: "Medium",
    budget_per_acre: 35000,
    profit_per_acre: 60000,
    pest_risk: "Medium",
    companion_crops: ["Marigold", "Basil"],
    animal_risk_level: "Low"
  },
  {
    name: "Rice",
    soil_types: ["clay", "clay loam"],
    duration_days: 120,
    water_requirement: "High",
    budget_per_acre: 45000,
    profit_per_acre: 75000,
    pest_risk: "High",
    companion_crops: ["Azolla", "Sesbania"],
    animal_risk_level: "Medium"
  }
];

const pesticides = [
  {
    name: "Neem Oil",
    description: "Organic pesticide from neem seeds",
    amazon_link: "https://amazon.com/neem-oil",
    flipkart_link: "https://flipkart.com/neem-oil",
    recommended_for: ["Tomato", "Rice", "Vegetables"]
  }
];

async function seedData() {
  for (const crop of crops) {
    await db.collection('crops').add(crop);
  }
  for (const pesticide of pesticides) {
    await db.collection('pesticides').add(pesticide);
  }
  console.log('Data seeded successfully');
}