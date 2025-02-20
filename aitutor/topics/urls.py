from django.urls import path
from .views import TopicList, QuestionList

urlpatterns = [
    path('topics/', TopicList.as_view()),
    path('topics/<int:topic_id>/questions/', QuestionList.as_view()),
]