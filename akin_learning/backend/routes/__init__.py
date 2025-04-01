from .dashboard import dashboard_blueprint
from .auth import auth_blueprint

# List of all blueprints
api_blueprints = [
    auth_blueprint,
]

app_blueprints = [
    dashboard_blueprint,
]
