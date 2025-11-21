const request = require('supertest');
const app = require('../app');

describe('Farm Management API', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'OK');
    });
  });

  describe('POST /recommend-crop', () => {
    it('should return crop recommendations', async () => {
      const mockData = {
        soil_type: 'loamy',
        budget: 50000,
        land_size: 2,
        duration_preference: 90
      };

      const res = await request(app)
        .post('/recommend-crop')
        .send(mockData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('recommendations');
      expect(Array.isArray(res.body.recommendations)).toBe(true);
    });

    it('should handle missing parameters gracefully', async () => {
      const res = await request(app)
        .post('/recommend-crop')
        .send({});

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('recommendations');
    });
  });
});