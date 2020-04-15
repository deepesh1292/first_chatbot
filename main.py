

# -*- coding: utf-8 -*-
"""
Created on Mon Mar 30 13:45:07 2020
@author: Deepesh.Shrivastava
"""
import json
from flask import Flask, request, make_response, jsonify

app = Flask(__name__)
global age,amount,number,disease,plan
age = 'a'
disease=[]
amount='c'
number='d'
plan='e'
@app.route('/webhook', methods=['GET','POST'])

def webhook():
	""" this method handles the http request for dialogflow webhook
	This is meant to be in conjunction with insurance bot intent"""
	global amount, number
	req = request.get_json(silent=True, force=True)
	try:
		action=req.get('queryResult').get('action')
	except AttributeError:
		return 'json error'
	
	if action == 'rntutbase':
		res = rntut(req)
		
		
		
	if action == 'rntut.rntut-custom':
		res = rntut_custom(req)
	
	if action == 'rntut.rntut-custom.rntut-custom-yes':
		res = rntut_custom_yes(req)
		
	if action == 'rntut.rntut-custom.rntut-custom-yes.rntut-custom-yes-custom':
		res = rntut_custom_yes_custom(req)
	
	if action == 'genderbase':
		res = gender(req)
		
	if action == "Gender.Gender-custom":
		res = gender_custom(req)
	 
	if action == "agebase":
		res = agebase(req)
		
	if action == "age.age-custom":
		res = age_custom(req)
	
	if action == "age.age-custom.age-custom-custom":
		res = age_custom_custom(req)
	
	if action == "dependentbase":
		res = dependent(req)
		
	if action == "dependent.dependent-custom":
		res = dependent_custom(req)
	
	if action == "policybase":
		res = policy(req)
	
	if action == "policy.policy-yes":
		res = policy_yes(req)
			
	if action == "policy.policy-no":
		res = policy_no(req)
	
	if action == "policy.policy-yes.policy-yes-custom":
		res = policy_no(req)
	
	if action == "policy.policy-no.policy-no-custom":
		res = policy_no_custom(req) 
	
	if action == "diseasebase":
		res = diseasebase(req)
	if action =="disease.disease-yes":
		 res = disease_yes(req)
	if action =="disease.disease-yes.disease-yes-custom":
		amount = req.get('queryResult').get('queryText')
		res = disease_yes_custom(req)
	if action =="disease.disease-yes.disease-yes-custom.disease-yes-custom-custom":
		number = req.get('queryResult').get('queryText')
		res = planbase(req) 
	if action == "disease.disease-custom":
		res = planbase(req)
		
	if action == "plan.plan-custom":
		res = plan_custom(req)
		
	if action == "input.unknown":
		res = fallback(req)
	if action == "DefaultFallbackIntent.DefaultFallbackIntent-fallback":
		res = fallbackagain(req)
		
	return make_response(jsonify(res))

def fallback(req):
	return {
	"fulfillmentText": "Sorry I didn't get that, can you repeat?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						}
			}
		}
	]
}
def fallbackagain(req):
	return {
	"fulfillmentText": "You can start all over by typing  a 'Hi'",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						}
			}
		}
	]
}
	
def rntut(req):
		
	return {
	"fulfillmentText": "What would you like to start with?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"text": "70% of the customers who chat with us are successful to find a right product that suits your need.",
				"buttons":{
						"title": "take an insurance policy",
						"title1": "a Coverage for my family",
						"title2": "want a protection policy",
						"title3": "need to take a policy",
						
						
						
						}
			}
		}
	]
}

def rntut_custom(req):
	
	return {
	"fulfillmentText": "Sure. Can i ask you for some more details in this regard?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "Yes",
						"title1": "No"
											
						}
			}
		}
	]
}
def rntut_custom_yes(req):
	
	return {
	"fulfillmentText": "Are you taking the policy for you or someone?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "For myself",
						"title1": "Others"
											
						}
			}
		}
	]
}
def rntut_custom_yes_custom(req):
	
	return {
	"fulfillmentText": "What is the main purpose of taking the policy?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "Family coverage",
						"title1": "Protection",
						"title2": "Insurance Coverage"
											
						}
			}
		}
	]
}
def gender(req):
	return{
	"fulfillmentText": "Please select your gender",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "Male",
						"title1": "Female",
						"title2": "Others"
											
						}
			}
		}
	]
}
def gender_custom(req):
	return{
	"fulfillmentText": "May i know your age?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "18-30",
						"title1": "31-45",
						"title2": "46-60",
						"title3": "greater than 60"
											
						}
			}
		}
	]
}

def agebase(req):
	parameters = req['queryResult']['parameters']
	global age
	age = parameters.get('agge')
	print(age)
	return{
	"fulfillmentText": "Are you employed or doing business",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "Employed",
						"title1": "Business"
									  }
			}
		}
	]
}
def age_custom(req):
	 return{
	"fulfillmentText": "How much do you earn per month",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "Less than or equal to 25K",
						"title1": "Between 26K to 30K",
						"title2": "Between 36K to 45K",
						"title3": "Between 46K to 55K",
						"title4": "More than 55K"
						
									  }
			}
		}
	]
}
def age_custom_custom(req):
		 return{
	"fulfillmentText": "Are you married?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "Yes",
						"title1": "No"
						}
			}
		}
	]
}
def dependent(req):
		 return{
	"fulfillmentText": "How many dependents do you have?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "1",
						"title1": "2",
						"title2": "3",
						"title3": "4 or more"
						
									  }
			}
		}
	]
}
def dependent_custom(req):
	return{
	"fulfillmentText": "what is the age of dependents?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "between 18 and 30",
						"title1": "between 31 and 45",
						"title2": "between 46 and 60",
						"title3": "greater than 60"
						
									  }
			}
		}
	]
}
def policy(req):
	return{
	"fulfillmentText": "Have you taken an insurance policy before?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "Yes",
						"title1": "No"
						}
			}
		}
	]
}     
def policy_yes(req):
	return{
	"fulfillmentText": "Is that inforce now or not continued?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "Continuing",
						"title1": "Discontinued"
						}
			}
		}
	]
}
def policy_no(req):
	return{
	"fulfillmentText": "Have you used Nicotine before",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "Never used",
						"title1": "Used in the past",
						"title2": "Occasionally using",
						"title3": "Frequently Using"
						}
			}
		}
	]
}
def policy_no_custom(req):
	return{
	"fulfillmentText": "Please select if you are under medication for anything",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "Diabetics",
						"title1": "Hypertension",
						"title2": "Blood Pressure",
						"title3": "Heart Disease",
						"title4": "Nervous Problem",
						"title5": "None",
						}
			}
		}
	]
}
def diseasebase(req):
	parameters = req['queryResult']['parameters']
	global disease
	disease = parameters.get('disease')
	return{
	"fulfillmentText": "Do you have a Mortgage Loan?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "Yes",
						"title1": "Not, at present"
						}
			}
		}
	]
} 
def disease_yes(req):
		return{
	"fulfillmentText": "How much is the outstanding loan at present?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						
						}
			}
		}
	]
}
def disease_yes_custom(req):
	print(req['queryResult']['queryText'])
	global amount
	amount = req['queryResult']['queryText']
	print (amount)
		#amount = amount['amount']
	
	return{
	"fulfillmentText": "How many years it would take for you to repay?",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"text": "95% of the Mortgage Loan payers take out a Decreasing Mortgage Coverage Policy to cover the loan.",
				"buttons":{
						
						}
			}
		}
	]
}
def planbase(req):
	print(req['queryResult']['queryText'])
	 
	#parameters = req['queryResult']['parameters']
	global number
	number = req['queryResult']['queryText']
	print (number)
	
	return{
	"fulfillmentText": "You can opt for any of the below coverage amount",
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						"title": "1 million",
						"title1": "2 million"
						}
			}
		}
	]
}
def plan_custom(req):
	parameters = req['queryResult']['parameters']
	global plan
	plan = parameters.get('plan')
	premium = 65
	global age,amount,number,disease
	if age == '18-30' and plan=="1 million":
		premium = 65 
	elif age == '18-30' and plan=="2 million":
		premium = 75
	elif age == '31-45' and plan=="1 million":
		premium = 85 
	elif age == '31-45' and plan=="2 million":
		premium = 95
	elif age == '46-60' and plan=="1 million":
		premium = 105
	elif age == '46-60' and plan=="2 million":
		premium = 115
	elif age == 'greater than 60' and plan=="1 million":
		premium = 125 
	elif age == 'greater than 60' and plan=="2 million":
		premium = 140
	try:
		if disease[0]!="None":
			premium = premium+len(disease)*10
	except:
		pass
	global amount
	if amount =='c':
		state = "Thanks, based on the information you have provided we suggest - a Level Term Insurance for Life Coverage. As per our calculation you would be needing: ${} for {} Life Coverage".format(premium,plan)
	else:
		state =  "Thanks, based on the information you have provided we suggest two plans - One Level Term Insurance for Life Coverage and another Decreasing Term Insurance for your Mortgage Loan. As per our calculation you would be needing: ${} for {} Life Coverage and amount of ${} for your Credit Insurance for {} years.".format(premium,plan,amount,number)
	print(state)
	print(plan)
	print(premium)
	print(amount)
	print(disease)
	return{
	"fulfillmentText": state,
	"fulfillmentMessages": [
		
		{
			"payload": {
				"buttons":{
						
						}
			}
		}
	]
}
	   
	
if __name__ == '__main__':
	app.run(debug=True, port=5001, host='0.0.0.0')

