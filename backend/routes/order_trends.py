from flask import Blueprint, jsonify, request
from utils.db_utils import fetch_order_trends_data
import numpy as np

order_trends_bp = Blueprint('order_trends', __name__)

@order_trends_bp.route('/order-trends', methods=['GET'])
def get_order_trends():
    """
    Get Monthly Order Trends and Revenue Changes
    ---
    tags:
      - Order Analytics
    parameters:
      - name: year
        in: query
        type: string
        required: false
        default: all
        description: Filter results by year (e.g., '2023') or 'all' for all years
    responses:
      200:
        description: Monthly order trends with revenue and growth metrics
        schema:
          type: array
          items:
            type: object
            properties:
              date:
                type: string
                format: date
                description: Month and year of the trend data
              revenue:
                type: number
                format: float
                description: Total revenue for the month
              order_count:
                type: integer
                description: Total number of orders for the month
              revenue_change:
                type: number
                format: float
                description: Percentage change in revenue compared to previous month
    """
    year = request.args.get('year', 'all')
    trend_df = fetch_order_trends_data(year)
    monthly_trends = trend_df.groupby("date").agg({"revenue": "sum", "order_count": "sum"}).reset_index().sort_values("date")
    monthly_trends["revenue_change"] = monthly_trends["revenue"].pct_change() * 100
    
    # Convert NaN to None (which becomes null in JSON)
    monthly_trends = monthly_trends.replace({np.nan: None})
    
    response = {
        "trends": monthly_trends.to_dict(orient="records")
    }
    return jsonify(response)