from django.shortcuts import render

from django.http import HttpResponseRedirect


def home(request):
	# if not request.user.is_authenticated():
	# 	return HttpResponseRedirect('/login/')
	# else:
	# 	return HttpResponseRedirect('/meals/')
	return render(request, template_name='index.html')
