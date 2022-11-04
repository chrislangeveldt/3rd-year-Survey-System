from django.urls import path

from . import views

urlpatterns = [

    path('register', views.register),

    path('login', views.admin_login),

    path('logout', views.admin_logout),

    path('create_defaults', views.create_defaults),

    path('get_companies', views.get_companies),

    path('create_company', views.create_company),

    path('delete_company/<company_name>', views.delete_company),

    path('create_survey', views.create_survey),

    path('delete_survey/<survey_id>', views.delete_survey),

    path('toggle_survey/<survey_id>', views.toggle_survey),

    path('get_surveys/<company_name>', views.get_surveys),

    path('get_individuals', views.get_individuals),

    path('get_responses/<survey_id>', views.get_responses),

    path('get_response/<response_id>', views.get_response),

    path('delete_response/<response_id>', views.delete_response),

    path('get_summary/<survey_id>', views.get_summary),

]