from django.conf.urls import url
from products import views

urlpatterns=[

    url(r'^product/$',views.productApi),
    url(r'^product/([0-9]+)$',views.productApi)
]
