from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from suppliers.models import Supplier
from suppliers.api.serializers import SupplierSerializer


@api_view(['GET', 'POST'])
def supplier_api_view(request):

    # list
    if request.method == 'GET':

        # queryset
        suppliers = Supplier.objects.all().order_by('pk')
        suppliers_serializer = SupplierSerializer(suppliers, many=True)
        return Response(suppliers_serializer.data, status=status.HTTP_200_OK)

    # create
    elif request.method == 'POST':
        suppliers_serializer = SupplierSerializer(data = request.data)

        # validation
        if suppliers_serializer.is_valid():
            suppliers_serializer.save()
            return Response(
                {'message:':'Fornecedor cadastrado corretamente!'},
                status = status.HTTP_201_CREATED)

        return Response(
            suppliers_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def supplier_detail_api_view(request, pk=None):
    # queryset
    supplier = Supplier.objects.filter(id=pk).first()

    # validation
    if supplier:

        # retrieve
        if request.method == 'GET':
            supplier_serializer = SupplierSerializer(supplier)
            return Response(supplier_serializer.data, status=status.HTTP_200_OK)

        # update
        if request.method == 'PUT':
            supplier_serializer = SupplierSerializer(supplier, data=request.data)
            if supplier_serializer.is_valid():
                supplier_serializer.save()
                return Response(
                    supplier_serializer.data, status=status.HTTP_200_OK)
            return Response(
                supplier_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # delete
        elif request.method == 'DELETE':
            supplier.delete()
            return Response(
                {'message:':'Fornecedor excluído corretamente!'},
                status=status.HTTP_200_OK)

    return Response(
        {'message:':'Não foi encontrado um fornecedor com esses dados'},
        status=status.HTTP_400_BAD_REQUEST)
