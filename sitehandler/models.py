from ast import mod
from wsgiref.validate import validator
from django.db import models

# Create your models here.
class Sites(models.Model):
    sid = models.AutoField(primary_key=True)
    site_url =  models.CharField(max_length=50, unique=True)
    created_on = models.DateTimeField(editable=False)
    last_updated = models.DateTimeField()
    validator = models.TextField(null=True,blank=True)
    # def __str__(self):
    #     return "%d" % (self.sid)

class Page(models.Model):
    data = models.TextField()
    site = models.ForeignKey(Sites , on_delete=models.CASCADE , null=True,blank=True)
    def __str__(self):
        return "%s" % (self.data)