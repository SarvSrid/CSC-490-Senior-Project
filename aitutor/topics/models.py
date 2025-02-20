from django.db import models

# Create your models here.

class Topic(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Question(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    text = models.TextField()
    difficulty = models.CharField(max_length=20)

    def __str__(self):
        return self.text