
from django.urls import path
from .views import (
    current_user,
    UserList,
    UserInfo,
    UserProfile,
    UserClientsView,
    ClientInvociesView,
    ClientDetailView,
    UserInvoicesView,
    InvoiceInfo,
    ClientInvoicesSum,
    DeleteInvoiceView,
    InvoiceItems,
    ItemDetailView,CreateItemView,
    InvoiceSettingsView,

    )

# /api/
urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('user-info/', UserInfo),
    path('user-profile/', UserProfile),
    path('user-clients/',UserClientsView),   
    path('client-invoices/<int:client_id>', ClientInvociesView),
    path('client-detail/<int:client_id>',ClientDetailView),
    path('user-invoices/', UserInvoicesView),
    path('delete-invoice/<int:invoice_id>',DeleteInvoiceView),
    path('invoice-sum-client/<int:invoice_id>',InvoiceInfo),
    path('client-invoices-sum/<int:client_id>', ClientInvoicesSum),
    path('invoice-items/<int:invoice_id>', InvoiceItems),
    path('item-detail/<int:item_id>',ItemDetailView),
    path('create-item/',CreateItemView),
    path('invoice-settings/', InvoiceSettingsView)

    
]

