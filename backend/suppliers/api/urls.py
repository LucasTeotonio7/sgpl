from django.urls import path

from suppliers.api.supplier_views import supplier_api_view, supplier_detail_api_view

urlpatterns = [
    path('supplier/', supplier_api_view, name='supplier_api'),
    path('supplier/<int:pk>', supplier_detail_api_view, name='supplier_detail_api_view'),
]