import json

from datetime import datetime

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth.models import User

from survey.models import Survey, Response

@csrf_exempt
def is_active(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        id = json_data['id']
        
        survey = Survey.objects.filter(id=id).first()
        if not survey:
            return JsonResponse({'success':False, 'message':'Survey with this link does not exist'})
        if not survey.is_active:
            return JsonResponse({'success':False, 'message':'Survey with this link has been closed'})

        return JsonResponse({'success':True})

@csrf_exempt
def submit_response(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        survey_id = json_data['survey_id']
        name = json_data['name']
        email = json_data['email']
        leadership_score = json_data['leadership_score']
        people_score = json_data['people_score']
        money_score = json_data['money_score']
        strategy_score = json_data['strategy_score']
        execution_score = json_data['execution_score']

        survey = Survey.objects.filter(id=survey_id).first()
        if not survey:
            return JsonResponse({'success':False, 'message':'Survey does not exist'})
        if not survey.is_active:
            return JsonResponse({'success':False, 'message':'Survey with this link has been closed'})

        
        response = Response(name=name, email=email, leadership_score=leadership_score, people_score=people_score, money_score=money_score, strategy_score=strategy_score, execution_score=execution_score, survey=survey)
        response.save()
        return JsonResponse({'success':True})

