
from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null = True, blank = True)
    address = models.CharField(max_length=50, blank=True, null=True)
    OIB = models.CharField(max_length=50, blank=True, null=True)
    company_name = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=100, blank=True, null=True)
    currency = models.CharField(max_length=20, default='EUR')
    tax = models.CharField(max_length=20, default=0)
    quantity = models.CharField(max_length=20, default='Kg')


class Client(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    company_name = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=50, blank=True, null=True)
    OIB = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=100, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name

    class Meta:
        ordering = ['-id']


class Invoice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
 
    def __str__(self):
        id = str(self.id)
        return id

    class Meta:
        ordering = ['-id']


class Item(models.Model):

    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=50, blank=True, null=True)
    quantity = models.CharField(max_length=30, blank=True, null=True)
    price = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return self.product_name

    class Meta:
        ordering = ['-id']



