from django.urls import path
from . import views
urlpatterns = [
    path("",views.open,name="open"),
    path("tags/<slug:slug>",views.tags,name="tags"),
    path("registr/",views.UserRegisterView.as_view(),name="regist"),
    path("login/", views.UserAuthorView.as_view(), name="login"),
    path("logout",views.logout_user,name="logout"),
    path("like",views.like,name="like"),
    path("comment",views.comments,name="comments"),
    path("respcomm",views.respcomm,name="respcomm")

]