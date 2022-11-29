from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
import urllib.request,json

def home(request):
    
    return render(request,'home.html')

def result(request):
    inp = str(request.GET['searchInput'])
    inp =inp.replace(' ','')
    #print(type(inp),inp)
    url= "https://apis.ccbp.in/wiki-search?search=" +inp
    if inp != "":
        with urllib.request.urlopen(url) as response:
            #print(response)
            the_page = json.loads(response.read())
            
            empty=len((the_page['search_results']))
            if empty == 0:
                empty= False
            else:
                empty =True
            print(empty)
            out= list(the_page.values())
            #print(list(out))
            items=out[0]
            t=[]
            l=[]
            des=[]
            for i in range(len(items)):
                item= items[i]
                t.append(item['title'])
                l.append(item['link'])
                des.append(item['description'])
            
                
            res=zip(t,l,des)
            print((res))
            return render(request,'home.html',{"res":res,"mt":empty})
    else:
        return render(request,'home.html',{"inp":inp})
    
