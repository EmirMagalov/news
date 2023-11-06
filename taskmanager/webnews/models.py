from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class News(models.Model):
    title=models.CharField(max_length=255)
    text=models.TextField(max_length=1000)
    slug=models.SlugField(unique=True,db_index=True)
    photo=models.ImageField(upload_to="images/")
    tags=models.ManyToManyField("Tag",blank=True,related_name="posts")
    likes=models.ManyToManyField("Like",blank=True,related_name="postslike")
    comment=models.ManyToManyField("Comment",blank=True,related_name="comment")
    def __str__(self):
        return "{}".format(self.title)


class Like(models.Model):
    user = models.CharField(max_length=150)
    post = models.IntegerField()

    def __str__(self):
        return "{}".format(self.user)

class Tag(models.Model):
    title=models.CharField(max_length=255)
    slug = models.SlugField(unique=True, db_index=True)

    def __str__(self):
        return "{}".format(self.title)

class Comment(models.Model):
    user = models.CharField(max_length=150)
    post=models.IntegerField()
    text=models.TextField(max_length=800)
    resp=models.ManyToManyField("RespComm",blank=True,related_name="comment")

class RespComm(models.Model):
    user = models.CharField(max_length=150)
    post = models.IntegerField()
    text = models.TextField(max_length=800)
