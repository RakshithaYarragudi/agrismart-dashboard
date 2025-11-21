const express = require('express');
const { db } = require('../config/firebase');
const router = express.Router();

/**
 * @swagger
 * /pesticides:
 *   get:
 *     summary: Get list of pesticides with filtering
 *     tags: [Pesticides]
 *     parameters:
 *       - in: query
 *         name: crop
 *         schema:
 *           type: string
 *       - in: query
 *         name: pest_type
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pesticides list retrieved successfully
 */
router.get('/', async (req, res) => {
  try {
    const { crop, pest_type } = req.query;
    let query = db.collection('pesticides');

    if (crop) {
      query = query.where('recommended_for', 'array-contains', crop);
    }

    const snapshot = await query.get();
    const pesticides = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filter by pest type if provided
    const filteredPesticides = pest_type 
      ? pesticides.filter(p => 
          p.name.toLowerCase().includes(pest_type.toLowerCase()) ||
          p.description.toLowerCase().includes(pest_type.toLowerCase()))
      : pesticides;

    res.json({
      count: filteredPesticides.length,
      pesticides: filteredPesticides
    });

  } catch (error) {
    console.error('Pesticides fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch pesticides' });
  }
});

module.exports = router;