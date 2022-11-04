import json
from django.db import models

from hiho_admin.models import Company

class Survey(models.Model):
    id = models.CharField(max_length=128, primary_key=True)
    link = models.CharField(max_length=128)
    name = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)


class Response(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default='')
    email = models.EmailField(default='')
    leadership_score = models.IntegerField()
    people_score = models.IntegerField()
    money_score = models.IntegerField()
    strategy_score = models.IntegerField()
    execution_score = models.IntegerField()
    completed_at = models.DateTimeField(auto_now_add=True) 
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)