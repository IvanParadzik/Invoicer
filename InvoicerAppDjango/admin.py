from django.contrib import admin

from .models import Client, Invoice, Item, Profile

admin.site.register(Client)
admin.site.register(Invoice)
admin.site.register(Item)
admin.site.register(Profile)
