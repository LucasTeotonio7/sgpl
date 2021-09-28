from django.conf.urls import url
from products.views import views
from products.views.views_weekly_collection import weekly_collection_api

urlpatterns=[

    url(r'^product/$',views.productApi),
    url(r'^product/([0-9]+)$',views.productApi),
    url(r'^product/choices/$',views.product_choices),
    url(r'^weekly-collection/(?P<date>[\w\-]+)/$', weekly_collection_api)
]
