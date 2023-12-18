from django.db import models
from django.utils import timezone

class BLOGMODEL(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=1000)
    published_date = models.DateTimeField(default=timezone.now, editable=False)
    
    class Meta:
        db_table="tblblog"





