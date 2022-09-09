from datetime import datetime
import json
from django.shortcuts import render , redirect
from django.http import HttpResponse , HttpResponseRedirect, JsonResponse
from .models import Sites , Page

# Create your views here.
def open_page(request,site_url):
    sites = Sites.objects.filter(site_url= f"/{site_url}/")
    # print(sites['Sites'])
    
    if(len(sites)== 0):

        availablity = {"available" : "true"}
    else:   
        textboxes = Page.objects.filter(site__in=Sites.objects.filter(site_url= f"/{site_url}/"))
        print(sites)
        validator = sites[0].validator
        print(textboxes)
        availablity = {"available" : "false",
                        "textboxes" : textboxes,
                        "validator" : validator}

    return render(request ,"mytext.html", context=availablity)

# def open_page_ajax(request):
#     site_url = request.GET['data']
#     print(f" site url is {site_url}")
#     sites = Sites.objects.filter(site_url=site_url)
#     if(len(sites)== 0):
#         # open_page(request , site_url) 
#         return JsonResponse({"site_available": "true"
#             ,"site": site_url}, status=200)

#     else:
#         return JsonResponse({"site_available": "false"}, status=200)


def savetext(request):
    text = request.POST.getlist('data[]')
    validator = request.POST['validator']
    site_url = request.POST['url']
    sites = Sites.objects.filter(site_url= site_url)
    print(f"{len(sites) == 0}")

    if(len(sites)== 0):
        created_on = datetime.now()
        last_updated = datetime.now()
        savetext = Sites(site_url=site_url,created_on=created_on,last_updated=last_updated,validator=validator);
        # print(f" thissss {savetext}")
        savetext.save()
        for t in text:
            temp = Page(data = t , site = savetext )
            temp.save()

    else:
        print("inside")
        text = request.POST.getlist('data[]')
        textboxes = Page.objects.filter(site__in=Sites.objects.filter(site_url= site_url))
        textboxes.delete()
        last_updated = datetime.now()
        for t in text:
            temp = Page(data = t , site = sites[0] )
            temp.save()

    return JsonResponse({"Got": "Got"}, status=200)





# def get_pass(request):



        # return redirect(site_url)
      
