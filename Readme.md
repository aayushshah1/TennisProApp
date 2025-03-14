# TennisPro Shot Analytics API

This API provides tennis shot analytics data for the TennisPro mobile application, integrating both basic statistics and ML-powered insights.

## API Endpoints

### Get Shot Analytics

```
GET /api/v1/analytics/shots/:userId
```

Retrieves comprehensive shot analytics for a specific user, including basic stats and ML-generated recommendations.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | path | Yes | User identifier |
| startDate | query | Yes | Start date (YYYY-MM-DD) |
| endDate | query | Yes | End date (YYYY-MM-DD) |
| shotType | query | No | Filter by shot type (forehand, backhand, serve, volley) |

#### Response Format

```json
{
  "success": true,
  "data": {
    "basic": {
      "totalShots": 25,
      "averageSpeed": 76.0,
      "averageAccuracy": 70.5
    },
    "advanced": {
      "improvementAreas": ["spin control", "shot accuracy"],
      "consistencyScore": 76.5,
      "performanceTrend": "improving"
    },
    "recommendations": [
      "Focus on increasing topspin for better control",
      "Practice hitting targets at different court positions"
    ]
  }
}
```

## API Testing

### Postman Screenshot

![Postman API Test](/postman-screenshot.png)

## ML Integration

The API connects to a machine learning service that:
1. Analyzes shot patterns and mechanics
2. Identifies areas for improvement
3. Generates personalized recommendations

## Error Handling

| Status Code | Description |
|-------------|-------------|
| 400 | Invalid parameters |
| 404 | No data found |
| 500 | Server error |

## Setup Instructions

1. Install dependencies: `npm install`
2. Configure environment variables in `.env`
3. Setup database: Run SQL scripts in `db/setup.sql`
4. Start server: `node server.js`