
from .models import (
    Client,
    Invoice,
    Item,
    Profile
)
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status, permissions
from django.shortcuts import render
from .serializers import (
             UserInfoSerializer,
            UserSerializerWithToken,
            UserSerializer,
            InvoiceSettingsSerializer,
            ProfileSerializer,
            UserClientsSerializer,
            InvoiceSerializer,
            ClientSerializer,
            ItemSerializer
                        )

def ReactApp(request):
   
    return render(request, "build/index.html")



@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET', 'PUT'])
def UserInfo(request, *args, **kwargs):
    qs = User.objects.all()
    username = request.user
    if(username != None):
        qs = qs.filter(username = request.user)  
        qs = qs.first() 
    if request.method =='GET':
        serializer = UserInfoSerializer(qs)
        return Response(serializer.data, status = 200)
    elif request.method  =='PUT':
        serializer = UserInfoSerializer(qs, data=request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data, status =201)
   


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """
    permission_classes = (permissions.AllowAny,)   

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames) 
    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
  
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST','PUT'])
def UserProfile(request, *args, **kwargs):
    qs = Profile.objects.all()
    username = request.user
    if(username != None):
        qs = qs.filter(user__username__iexact = request.user)
        qs = qs.first()
    if request.method =='GET':
        serializer = ProfileSerializer(qs)
        return Response(serializer.data, status = 200)
    elif request.method == 'PUT':
        serializer = ProfileSerializer(qs, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status =201)
    elif request.method == 'POST':
        serializer = ProfileSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status =201)
        else:
            return Response(serializer.errors, status = 400)



@api_view(['GET', 'POST']) 
def UserClientsView(request,  *args, **kwargs):
    if request.method == 'GET':
        qs = Client.objects.all()
        username = request.user
        if(username != None):
            qs = qs.filter(user__username__iexact = request.user)   
        serializer = UserClientsSerializer(qs, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':  
        username = request.user.id
        data = request.data
        data["user"] = str(username)
        serializer = UserClientsSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status = 201)
        else:
            return Response(serializer.errors, status = 400)
    





@api_view(['GET','PUT', 'DELETE'])
def ClientDetailView(request, client_id, *args,**kwargs):
    qs = Client.objects.all()
    username = request.user
    if(username != None):
        qs = qs.filter(user__username__iexact = request.user)
    qs = qs.filter(id = client_id)
    qs = qs.first()
    if request.method == 'GET':
        serializer = ClientSerializer(qs)
        return Response(serializer.data, status =200 )
    elif request.method == 'PUT':
        serializer = ClientSerializer(qs, data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            return Response(serializer.data, status =201)
    elif request.method == 'DELETE':
        qs.delete()
        return Response({"MASSAGE:": "account is deleted"}, status = 204)



#INVOICE VIEWS

@api_view(['GET']) #HTTP METHOD 
def ClientInvociesView(request, client_id, *args, **kwargs):
    qs = Invoice.objects.filter(client__id = client_id)
    username = request.user
    if(username != None):
        qs = qs.filter(user__username__iexact = request.user)
        serializer = InvoiceSerializer(qs, many=True)
    if request.method =='GET':
         return Response(serializer.data, status =200)
   
    

@api_view(['GET', 'POST'])
def UserInvoicesView(request, *args,**kwargs):
    qs = Invoice.objects.all()
    if request.method =='GET':
        username = request.user
        if(username != None):
             qs = qs.filter(user__username__iexact = request.user)
        serializer = InvoiceSerializer(qs, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        username = request.user.id
        data = request.data
        data["user"] = str(username)
        serializer = InvoiceSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status = 201)


@api_view(['DELETE'])
def DeleteInvoiceView(request,invoice_id, *args,**kwargs):
     qs = Invoice.objects.filter(id = invoice_id)
     qs = qs.first()
     print(qs)
     if request.method == 'DELETE':
         qs.delete()
         return Response({"MASSAGE:": "account is deleted"}, status = 204)





## geting informations about one invoice
@api_view(['GET'])
def InvoiceInfo(request, invoice_id, *args, **kwargs):
    user = Profile.objects.filter(user__username__iexact = request.user)
    user = user.first()
    invoice = Invoice.objects.filter(id = invoice_id)
    invoice = invoice.first()
    if request.method == 'GET':
        qs = Item.objects.filter(invoice = invoice_id)
        sum = 0
        sum_with_tax = 0
        for i in qs:
            sum += float(i.quantity) * float(i.price)
            sum_with_tax += float(i.quantity) * float(i.price) * ((float(user.tax)/100) +1)
        tax_value = sum_with_tax- sum
      
        sum = round(sum,2)
        sum_with_tax = round(sum_with_tax,2)
        tax_value = round(tax_value,2)
        tax_value ='{:,.2f}'.format(tax_value) 
        sum ='{:,.2f}'.format(sum) 
        sum_with_tax ='{:,.2f}'.format(sum_with_tax) 
        info = {"total" : sum,
                "total_with_tax": sum_with_tax, 
                "tax" : user.tax ,
                "currency" : user.currency, 
                "tax_value": tax_value,
                "company_name" : invoice.client.company_name,
                "clientID": invoice.client.id,
                'quantity': user.quantity,
                }
       
        return Response(info,status = 200)





# CLINET INVOICES SUM 

@api_view(['GET'])
def ClientInvoicesSum(request, client_id, *args, **kwargs):
    user = Profile.objects.filter(user__username__iexact = request.user)
    user = user.first()
    if request.method  == 'GET':
        qs = Invoice.objects.filter(client = client_id)
        el = []
        finalEl = []
        for i in qs: 
            el.append(Item.objects.filter(invoice = i))
        for i in el:
            for j in i:
                finalEl.append(j)
        sum = 0
        for x in finalEl:
            sum += float(x.price) * float(x.quantity) * ((float(user.tax)/100) +1)
        sum = round(sum,2)
        sum = '{:,.2f}'.format(sum)
        data ={"sum" : sum, "currency" : user.currency}
        return Response(data, status = 200)


#ITEM VIEWS



@api_view(['GET'])
def InvoiceItems(request, invoice_id, *args, **kwargs):
    qs = Item.objects.filter(invoice = invoice_id)
    if request.method ==  'GET':
        serializer = ItemSerializer(qs, many = True)
        return Response(serializer.data, status =200)



@api_view([ 'DELETE', 'PUT']) #HTTP METHOD 
def ItemDetailView(request, item_id, *args, **kwargs):
    qs = Item.objects.filter(id = item_id)
    qs = qs.first()
    if request.method =='DELETE': 
        qs.delete()
        return Response({"MASSAGE:": "account is deleted"}, status = 204)
    elif request.method == 'PUT':
        serializer = ItemSerializer(qs, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status =201)


@api_view(['POST']) #HTTP METHOD 
def CreateItemView(request, *args, **kwargs):
   
    if request.method =='POST':
        serializer = ItemSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status = 201)
        return Response(serializer.errors, status = 400)
    


# Invoice Settings



@api_view(['GET','PUT'])
def InvoiceSettingsView(request, *args, **kwargs):
    qs = Profile.objects.all()
    username = request.user
    if(username != None):
        qs = qs.filter(user__username__iexact = request.user)
        qs = qs.first()
    if request.method =='GET':
        serializer = InvoiceSettingsSerializer(qs)
        return Response(serializer.data, status = 200)
    elif request.method == 'PUT':
        serializer = InvoiceSettingsSerializer(qs, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status =201)
