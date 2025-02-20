from django.shortcuts import render
from rest_framework import generics
from .models import Topic, Question
from .serializers import TopicSerializer, QuestionSerializer
# Create your views here.

class TopicList(generics.ListAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

class QuestionList(generics.ListAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        topic_id = self.kwargs['topic_id']
        return Question.objects.filter(topic_id=topic_id)