// server.js
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

// Database connection
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root1234',
  database: process.env.DB_NAME || 'tennisproapp'
});

// Routes
app.get('/api/v1/analytics/shots/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, shotType } = req.query;
    
    // Validate dates
    if (!startDate || !endDate) {
      return res.status(400).json({
        error: 'INVALID_PARAMETERS',
        message: 'Start and end dates are required'
      });
    }
    
    // Get shots from database
    const [shots] = await pool.query(
      `SELECT * FROM shots 
       WHERE user_id = ? 
       AND timestamp BETWEEN ? AND ?
       ${shotType ? 'AND shot_type = ?' : ''}
       ORDER BY timestamp`,
      shotType ? [userId, startDate, endDate, shotType] : [userId, startDate, endDate]
    );
    
    if (!shots.length) {
      return res.status(404).json({
        error: 'NO_DATA_FOUND',
        message: 'No shot data found for specified parameters'
      });
    }
    
    // Call ML service (simplified)
    const mlResults = await mockMlService(shots);
    
    // Return combined results
    res.json({
      success: true,
      data: {
        basic: {
          totalShots: shots.length,
          averageSpeed: calculateAverage(shots, 'speed'),
          averageAccuracy: calculateAverage(shots, 'accuracy')
        },
        advanced: mlResults,
        recommendations: generateRecommendations(mlResults)
      }
    });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: 'SERVER_ERROR',
      message: 'An error occurred while processing your request'
    });
  }
});

// Helper functions
function calculateAverage(data, field) {
  return data.reduce((sum, item) => sum + item[field], 0) / data.length;
}

async function mockMlService(shotData) {
  // Simulating ML service call
  return {
    improvementAreas: ["spin control", "shot accuracy"],
    consistencyScore: 76.5,
    performanceTrend: "improving"
  };
}

function generateRecommendations(mlResults) {
  // Generate recommendations based on ML results
  return [
    "Focus on increasing topspin for better control",
    "Practice hitting targets at different court positions"
  ];
}

const PORT = process.env.PORT || 5013;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));