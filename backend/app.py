from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from routes.top_products import top_products_bp
from routes.sales_location import sales_location_bp
from routes.order_trends import order_trends_bp

app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],  # Vite's default development port
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Configure Swagger
swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": 'apispec',
            "route": '/apispec.json',
            "rule_filter": lambda rule: True,  # all in
            "model_filter": lambda tag: True,  # all in
        }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/docs"
}

swagger = Swagger(app, config=swagger_config, template={
    "swagger": "2.0",
    "info": {
        "title": "Sales Dashboard API",
        "description": "API for Sales Dashboard Analytics",
        "version": "1.0.0",
        "contact": {
            "email": "support@example.com"
        }
    },
    "basePath": "/api",
    "schemes": [
        "http",
        "https"
    ]
})

# Register blueprints (modular routes)
app.register_blueprint(top_products_bp, url_prefix='/api')
app.register_blueprint(sales_location_bp, url_prefix='/api')
app.register_blueprint(order_trends_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True, port=5000)