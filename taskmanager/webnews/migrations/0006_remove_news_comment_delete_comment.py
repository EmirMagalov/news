# Generated by Django 4.2.6 on 2023-11-05 14:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webnews', '0005_comment_news_comment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='news',
            name='comment',
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
    ]
