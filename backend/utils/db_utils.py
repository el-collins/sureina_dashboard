import pandas as pd
from sqlalchemy import text
import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../db_etl')))
from db.connection import get_db_engine

# Database engine
engine = get_db_engine()

# Years to query
YEARS = range(2022, 2026)

# Currency field (easy to modify)
CURRENCY_FIELD = "price"  # Change to "price_set_shop_money_amount" if needed

def fetch_sales_data(year_filter, columns, table_prefix):
    """Fetch data from a yearly table (e.g., order_line_items_{year})."""
    data = []
    years = YEARS if year_filter == 'all' else [int(year_filter)]
    for year in years:
        table_name = f"{table_prefix}_{year}"
        with engine.connect() as connection:
            query = text(f"SELECT {', '.join(columns)} FROM {table_name}")
            result = connection.execute(query)
            for row in result.fetchall():
                data.append(dict(zip(columns, row)))
    return pd.DataFrame(data)

def fetch_sales_location_data(year_filter, country_filter):
    data = []
    years = YEARS if year_filter == 'all' else [int(year_filter)]
    for year in years:
        orders_table = f"orders_{year}"
        with engine.connect() as connection:
            schema_query = text(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{orders_table}'")
            schema_result = connection.execute(schema_query).fetchall()
            # print(f"Columns in {orders_table}: {[row[0] for row in schema_result]}")
            query = text(f"""
                SELECT total_price_set_shop_money_amount, shipping_address_country, shipping_address_province
                FROM {orders_table}
                WHERE (:country = 'all' OR shipping_address_country = :country)
            """)
            result = connection.execute(query, {"country": country_filter})
            for row in result.fetchall():
                total_price = float(row[0] or 0)
                country_val = row[1] or "Unknown"
                province = row[2] or "Unknown"
                # print(f"Row Data: country={country_val}, province={province}, revenue={total_price}")
                data.append({
                    "country": country_val,
                    "province": province,
                    "revenue": total_price,
                    "order_count": 1
                })
    return pd.DataFrame(data)


def fetch_order_trends_data(year_filter):
    """Fetch order data for trend analysis."""
    data = []
    years = YEARS if year_filter == 'all' else [int(year_filter)]
    for year in years:
        table_name = f"orders_{year}"
        with engine.connect() as connection:
            query = text(f"SELECT created_at, total_price_set_shop_money_amount FROM {table_name}")
            result = connection.execute(query)
            for row in result.fetchall():
                created_at = row[0]
                total_price = float(row[1] or 0)
                if created_at:
                    data.append({
                        "date": created_at.strftime("%Y-%m"),
                        "revenue": total_price,
                        "order_count": 1
                    })
    return pd.DataFrame(data)