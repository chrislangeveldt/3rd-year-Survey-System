import json
import random
import string

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Q

from survey.models import Response, Survey
from hiho_admin.models import Company


#################################################################################
# Admin Login
#################################################################################

@csrf_exempt
def register(request): # Only for admins
    if request.method == 'POST':
        json_data = json.loads(request.body)
        name = json_data['name']
        password = json_data['password']

        user = User.objects.filter(username=name).first()
        if user:
            return JsonResponse({'success':False, 'message':'Name already exists'})
        
        user = User.objects.create_user(username=name, password=password)
        user.save()
        return JsonResponse({'success':True})

@csrf_exempt
def admin_login(request):
    print(request.method)
    if request.method == 'POST':
        json_data = json.loads(request.body)
        name = json_data['name']
        password = json_data['password']

        user = authenticate(request, username=name, password=password)

        if user:
            login(request, user)
            return JsonResponse({'success':True})
        else: 
            return JsonResponse({'success':False, 'message':'Incorrect Details'})

@csrf_exempt
def admin_logout(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success':False, 'logged_in':False})
    
    logout(request)
    return JsonResponse({'success':True})

@csrf_exempt
def create_defaults(request): # only done once
    if request.method == 'GET':
        company = Company(name='Individuals')
        company.save()
        survey = Survey(id='Individuals', link='http://localhost:3000/SignUp/Individuals', name='Individuals', company=company)
        survey.save()
        return JsonResponse({'success':True})


#################################################################################
# Company Related
#################################################################################

@csrf_exempt
def get_companies(request):
    if request.method == 'GET':
        companies = list(Company.objects.filter(~Q(name='Individuals')).all().values())
        
        for i in range(len(companies)):
            surveys = list(Survey.objects.filter(company_id=companies[i]['name']).all().values())
            
            for j in range(len(surveys)):
                surveys[j]['created_at'] = surveys[j]['created_at'].strftime('%Y-%m-%d') 
                surveys[j]['is_active'] = str(surveys[j]['is_active'])
                amount = Response.objects.filter(survey_id=surveys[j]['id']).count()
                surveys[j]['amount'] = amount
                
                
            companies[i]['created_at'] = companies[i]['created_at'].strftime("%Y-%m-%d")
            companies[i]['surveys'] = surveys
            companies[i]['is_company'] = True
            
            
        individuals = list(Response.objects.filter(survey_id='Individuals').all().values())
        for i in range(len(individuals)):
            individuals[i]['completed_at'] = individuals[i]['completed_at'].strftime('%Y-%m-%d')
            individuals[i]['is_company'] = False

        companies += (individuals)
        return JsonResponse({'success':True, 'companies':companies})

@csrf_exempt
def create_company(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        name = json_data['name']

        if not name:
            return JsonResponse({'success':False})

        company = Company.objects.filter(name=name).first()
        if company:
            return JsonResponse({'success':False, 'message':'Name already exists'})
        
        company = Company(name=name)
        company.save()
        return JsonResponse({'success':True})

@csrf_exempt
def delete_company(request, company_name):
    if request.method == 'DELETE':
        company = Company.objects.filter(name=company_name).first()
        if company:
            company.delete()
            return JsonResponse({'success':True})
        else:
            return JsonResponse({'success':False, 'message': 'Company does not exist'})



#################################################################################
# Survey Related
#################################################################################

@csrf_exempt
def create_survey(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        survey_name = json_data['survey_name']
        company_name = json_data['company_name']

        company = Company.objects.filter(name=company_name).first()
        if not company:
            return JsonResponse({'success':False, 'message':'Company does not exist'})

        survey = Survey.objects.filter(company=company).filter(name=survey_name).first()
        if survey:
            return JsonResponse({'success':False, 'message':'Survey name already exists for this company'})

        id = ''.join(random.choice(string.ascii_letters + string.digits) for i in range(16))
        survey = Survey.objects.filter(id=id).first()
        while survey:
            id = ''.join(random.choice(string.ascii_letters + string.digits) for i in range(16))
            survey = Survey.objects.filter(id=id).first()
        link = 'http://localhost:3000/Survey/' + id

        survey = Survey(id=id, link=link, name=survey_name, company=company)
        survey.save()
        return JsonResponse({'success':True, 'link':link})

@csrf_exempt
def delete_survey(request, survey_id):
    if request.method == 'DELETE':
        survey = Survey.objects.filter(id=survey_id).first()
        if survey:
            survey.delete()
            return JsonResponse({'success':True})
        else:
            return JsonResponse({'success':False, 'message': 'Survey does not exist'})
            
@csrf_exempt
def toggle_survey(request, survey_id):
    if request.method == 'PUT':
        survey = Survey.objects.filter(id=survey_id).first()
        if survey:
            if survey.is_active:
                survey.is_active = False
            else:
                survey.is_active = True
            survey.save()
            return JsonResponse({'success':True})

        else:
            return JsonResponse({'success':False, 'message': 'Survey does not exist'})

@csrf_exempt
def get_surveys(request, company_name):
    if not request.user.is_authenticated:
        return JsonResponse({'success':False, 'logged_in':False})
    
    if request.method == 'GET':
        company = Company.objects.filter(name=company_name).first()
        if not company:
            return JsonResponse({'success':False, 'message': 'Company does not exist'})
        
        surveys = list(Survey.objects.filter(company=company).all().values()) 
        return JsonResponse({'success':True, 'surveys':surveys})


#################################################################################
# Response Related
#################################################################################

@csrf_exempt
def get_individuals(request):
    if request.method == 'GET':
        responses = list(Response.objects.filter(survey_id='Individuals').all().values())

        for i in range(len(responses)):
            responses[i]['completed_at'] = responses[i]['completed_at'].strftime('%Y-%m-%d')
        
        return JsonResponse({'success':True, 'responses':responses})

@csrf_exempt
def get_responses(request, survey_id):
    if not request.user.is_authenticated:
        return JsonResponse({'success':False, 'logged_in':False})
    
    if request.method == 'GET':  
        survey = Survey.objects.filter(id=survey_id).first()
        if not survey:
            return JsonResponse({'success':False, 'message': 'Survey does not exist'})      
        responses = list(Response.objects.filter(survey=survey).all().values())
        if not responses:
            return JsonResponse({'success':False, 'message':'no responses'})

        return JsonResponse({'success':True, 'responses':responses})

@csrf_exempt
def get_response(request, response_id):
    if request.method == 'GET':  
        response = list(Response.objects.filter(id=response_id).all().values())
        if not response:
            return JsonResponse({'success':False, 'message': 'Response does not exist'})      
        return JsonResponse({'success':True, 'response':response[0]})

@csrf_exempt
def delete_response(request, response_id):
    if request.method == 'DELETE':
        response = Response.objects.filter(id=response_id).first()
        if response:
            response.delete()
            return JsonResponse({'success':True})
        else:
            return JsonResponse({'success':False, 'message': 'Response does not exist'})

@csrf_exempt
def get_summary(request, survey_id):
    if request.method == 'GET':  
        survey = Survey.objects.get(id=survey_id)
        responses = list(Response.objects.filter(survey=survey).all().values())
        for i in range(len(responses)):
            responses[i]['completed_at'] = responses[i]['completed_at'].strftime('%m')
        labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        cats = ['leadership_score', 'people_score', 'money_score', 'strategy_score', 'execution_score']
        datasets = {}

        for cat in cats:
            sums = []
            for m in months:
                sum = 0
                count = 0
                for res in responses:
                    if m == res['completed_at']:
                        sum += res[cat]
                        count += 1
                avg = sum
                if avg != 0:
                    avg = sum/count
                sums.append(avg)

            datasets[cat] = sums
            
        return JsonResponse({'success':True, 'summary':datasets})