from akin_learning.backend.routes.auth import auth_blueprint
from akin_learning.backend.routes.dashboard import dashboard_blueprint
from akin_learning.backend.routes.google_auth import google_auth_blueprint

# List of all blueprints
api_blueprints = [
    google_auth_blueprint,
]

app_blueprints = [
    auth_blueprint,
    dashboard_blueprint,
]
