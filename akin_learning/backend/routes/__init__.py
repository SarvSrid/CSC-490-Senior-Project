from akin_learning.backend.routes.aichat import aichat_blueprint
from akin_learning.backend.routes.aichat_dashboard import aichat_dash_blueprint
from akin_learning.backend.routes.auth import auth_blueprint
from akin_learning.backend.routes.dashboard import dashboard_blueprint
from akin_learning.backend.routes.google_auth import google_auth_blueprint
from akin_learning.backend.routes.progress import progress_blueprint
from akin_learning.backend.routes.questions import questions_blueprint

# List of all blueprints
api_blueprints = [
    google_auth_blueprint,
    aichat_blueprint,
    aichat_dash_blueprint,
]

app_blueprints = [
    auth_blueprint,
    dashboard_blueprint,
    progress_blueprint,
    # questions_blueprint,
]
