from flask import Blueprint, jsonify, request
from utils.db_utils import fetch_sales_location_data

sales_location_bp = Blueprint('sales_location', __name__)

@sales_location_bp.route('/sales-by-location', methods=['GET'])
def get_sales_by_location():
    """
    Get Sales Data by Location (Country and City)
    ---
    tags:
      - Location Analytics
    parameters:
      - name: year
        in: query
        type: string
        required: false
        default: all
        description: Filter results by year (e.g., '2023') or 'all' for all years
      - name: country
        in: query
        type: string
        required: false
        default: all
        description: Filter results by specific country or 'all' for all countries
    responses:
      200:
        description: Sales data grouped by country and top 5 cities
        schema:
          type: object
          properties:
            by_country:
              type: array
              items:
                type: object
                properties:
                  country:
                    type: string
                    description: Country name
                  revenue:
                    type: number
                    format: float
                    description: Total revenue for the country
                  order_count:
                    type: integer
                    description: Total number of orders from the country
            by_city:
              type: array
              items:
                type: object
                properties:
                  country:
                    type: string
                    description: Country name
                  province:
                    type: string
                    description: Province name
                  revenue:
                    type: number
                    format: float
                    description: Total revenue for the province
                  order_count:
                    type: integer
                    description: Total number of orders from the province
    """
    year = request.args.get('year', 'all')
    country = request.args.get('country', 'all')
    location_df = fetch_sales_location_data(year, country)
    by_country = location_df.groupby("country").agg({"revenue": "sum", "order_count": "sum"}).reset_index().sort_values("revenue", ascending=False)
    by_province = location_df.groupby(["country", "province"]).agg({"revenue": "sum", "order_count": "sum"}).reset_index().sort_values("revenue", ascending=False).head(5)
    response = {
        "by_country": by_country.to_dict(orient="records"),
        "by_province": by_province.to_dict(orient="records")
    }
    # print(f"Sales by Location Response: {response}")
    return jsonify(response)