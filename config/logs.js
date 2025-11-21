const express = require('express');
const { db } = require('../config/firebase');
const router = express.Router();

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Get farm logs for a user
 *     tags: [Logs]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logs retrieved successfully
 */
router.get('/', async (req, res) => {
  try {
    const { user_id, start_date, end_date } = req.query;
    
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    let query = db.collection('farm_logs').where('user_id', '==', user_id);

    if (start_date) {
      query = query.where('date', '>=', new Date(start_date));
    }
    if (end_date) {
      query = query.where('date', '<=', new Date(end_date));
    }

    query = query.orderBy('date', 'desc');

    const snapshot = await query.get();
    const logs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate ? doc.data().date.toDate().toISOString() : doc.data().date
    }));

    res.json({
      count: logs.length,
      logs
    });

  } catch (error) {
    console.error('Logs fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Create a new farm log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               crop_id:
 *                 type: string
 *               notes:
 *                 type: string
 *               date:
 *                 type: string
 *               activity_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Log created successfully
 */
router.post('/', async (req, res) => {
  try {
    const { user_id, crop_id, notes, date, activity_type } = req.body;

    if (!user_id || !activity_type) {
      return res.status(400).json({ error: 'User ID and activity type are required' });
    }

    const logData = {
      user_id,
      crop_id: crop_id || null,
      notes: notes || '',
      date: date ? new Date(date) : new Date(),
      activity_type,
      created_at: new Date()
    };

    const docRef = await db.collection('farm_logs').add(logData);

    res.status(201).json({
      id: docRef.id,
      ...logData,
      date: logData.date.toISOString()
    });

  } catch (error) {
    console.error('Log creation error:', error);
    res.status(500).json({ error: 'Failed to create log' });
  }
});

// Similar PUT and DELETE endpoints for full CRUD...

module.exports = router;