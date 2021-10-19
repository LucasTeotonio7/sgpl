from django.conf.urls import url
from products.views import views, views_purchase

urlpatterns=[

    url(r'^product/$',views.productApi),
    url(r'^product/([0-9]+)$',views.productApi),
    url(r'^product/choices/$',views.product_choices),
    url(r'^purchase/$',views_purchase.purchaseApi),
    url(r'^last-purchase/([0-9]+)$',views_purchase.get_last_purchase),
    url(r'^purchase/([0-9]+)$',views_purchase.purchaseApi)
]
