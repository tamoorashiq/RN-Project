from django.db import models
from home.models import City, Region

from steep_thunder_40040.models import TimeStampedModel
from users.models import User

class Category(TimeStampedModel):
    name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"{self.name}"
    

class Product(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    address = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    zip_code = models.CharField(max_length=20)
    state = models.ForeignKey(Region, on_delete=models.CASCADE, null=True, blank=True)
    estimated_amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    def __str__(self):
        return f"{self.name}"
    
class ProductMedia(TimeStampedModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    image = models.FileField(upload_to ='products/')

    def __str__(self):
        return f"{self.product.name}"
    

