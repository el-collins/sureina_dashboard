from flask import Blueprint, jsonify, request
import pandas as pd
from utils.db_utils import fetch_sales_data, CURRENCY_FIELD

top_products_bp = Blueprint('top_products', __name__)

@top_products_bp.route('/top-products', methods=['GET'])
def get_top_products():
    """
    Get Top Products by Quantity and Revenue
    ---
    tags:
      - Products
    parameters:
      - name: year
        in: query
        type: string
        required: false
        default: all
        description: Filter results by year (e.g., '2023') or 'all' for all years
    responses:
      200:
        description: List of top products by quantity and revenue
        schema:
          type: object
          properties:
            top_by_quantity:
              type: array
              items:
                type: object
                properties:
                  product_id:
                    type: string
                    description: Unique identifier of the product
                  name:
                    type: string
                    description: Name of the product
                  quantity:
                    type: integer
                    description: Total quantity sold
            top_by_revenue:
              type: array
              items:
                type: object
                properties:
                  product_id:
                    type: string
                    description: Unique identifier of the product
                  name:
                    type: string
                    description: Name of the product
                  revenue:
                    type: number
                    format: float
                    description: Total revenue generated
    """
    year = request.args.get('year', 'all')
    sales_data = fetch_sales_data(year, ["product_id", "name", "quantity", CURRENCY_FIELD], "order_line_items")
    sales_data["revenue"] = sales_data[CURRENCY_FIELD].astype(float) * sales_data["quantity"].astype(int)
    top_by_quantity = sales_data.groupby(["product_id", "name"])["quantity"].sum().reset_index().sort_values("quantity", ascending=False).head(5)
    top_by_revenue = sales_data.groupby(["product_id", "name"])["revenue"].sum().reset_index().sort_values("revenue", ascending=False).head(5)
    return jsonify({
        "top_by_quantity": top_by_quantity.to_dict(orient="records"),
        "top_by_revenue": top_by_revenue.to_dict(orient="records")
    })