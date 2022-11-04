from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=128, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)