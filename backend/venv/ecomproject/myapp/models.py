from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Products(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    Productname = models.CharField(max_length=150)
    image = models.ImageField(null=True,blank=True)
    productbrand = models.CharField(max_length=150,null=True,blank=True)
    productcategory = models.CharField(max_length=150,null=True,blank=True)
    productinfo = models.TextField(blank=True,null=True)
    rating = models.DecimalField(max_digits=5,decimal_places=2,null=True,blank=True)
    numReviews=models.IntegerField(null=True,blank=True,default=0)
    price =  models.DecimalField(max_digits=5,decimal_places=2,null=True,blank=True)
    stock = models.IntegerField(null=True,blank=True,default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.Productname