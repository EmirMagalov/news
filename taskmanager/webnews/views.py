from django.contrib.auth import logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.views import LoginView
from django.core.paginator import Paginator
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import CreateView
from .serializers import NewsSerializers
from .models import *
from .forms import Regreg

from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.views import Response

# Create your views here.
def base(request):
    like=Like.objects.filter(user=request.user)
    print(like)
    n = []
    for i in like:
        n.append(str(i.post))
    return n
def open(request):
    news=News.objects.all()

    paginator = Paginator(news, 3)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    comments=Comment.objects.all()
    respcomm=RespComm.objects.all()


    data={"news": page_obj,"len":len(news),"like":base(request),"comments":comments}
    return render(request, "webnews/news.html", data)

def tags(request,slug):
    tags=News.objects.filter(tags__slug=slug)
    return render(request,"webnews/tags.html",{"tags":tags,"like":base(request)})



class UserRegisterView(CreateView):
    form_class = Regreg
    template_name = 'webnews/regist.html'
    success_url = reverse_lazy('login')

class UserAuthorView(LoginView):
    form_class = AuthenticationForm
    template_name = 'webnews/login.html'
    def get_success_url(self):
        return reverse_lazy('open')



def like(request):
    if request.method == 'POST':
        post = News.objects.get(pk=request.POST.get("like"))
        like, created = Like.objects.get_or_create(user=request.user, post=post.id)
        post.likes.add(like)

        if not created:
          like.delete()
        return redirect(request.META.get('HTTP_REFERER'))



def logout_user(request):
    logout(request)
    return redirect("open")


class NewsApi(viewsets.ModelViewSet):
    queryset=News.objects.all()
    serializer_class = NewsSerializers


def comments(request):
    if request.method =="POST":
        news=News.objects.get(pk=request.POST.get("comment"))
        comments= Comment.objects.create(user=request.user,post=news.id,text=request.POST.get("commenttext"))
        news.comment.add(comments)

        return redirect(request.META.get('HTTP_REFERER'))

def respcomm(request):
    if request.method =="POST":
        comm=Comment.objects.get(pk=request.POST.get("comment"))
        respcomm,create= RespComm.objects.get_or_create(user=request.user,post=comm.id,text=request.POST.get("commenttext"))
        comm.resp.add(respcomm)
        return redirect(request.META.get('HTTP_REFERER'))