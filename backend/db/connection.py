# db/connection.py
import os
from sqlalchemy import create_engine
from dotenv import load_dotenv
import logging

# Load environment variables from the .env file
load_dotenv()

def get_db_engine():
    """
    Returns a SQLAlchemy engine connected to the PostgreSQL database
    using credentials stored in the .env file.
    """
    try:
        # Fetch the database connection details from environment variables
        db_user = os.getenv('DB_USER')
        db_password = os.getenv('DB_PASSWORD')
        db_host = os.getenv('DB_HOST')
        db_port = os.getenv('DB_PORT')
        db_name = os.getenv('DB_NAME')

        if not all([db_user, db_password, db_host, db_port, db_name]):
            raise ValueError("Missing one or more required environment variables.")

        # Construct the database connection string
        db_connection_string = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'

        # Create and return a SQLAlchemy engine
        engine = create_engine(db_connection_string)
        logging.info("Successfully connected to the PostgreSQL database.")
        return engine

    except Exception as e:
        logging.error(f"Failed to connect to the PostgreSQL database: {e}")
        raise
