from django.conf.urls import url
from products.views import views
# from products.views.views_weekly_collection \
#     import (weekly_collection_api,purchase_api, weekly_collection,
#     weekly_collection_supplier, purchase_week, create_weekly_collection)

urlpatterns=[

    url(r'^product/$',views.productApi),
    # url(r'^create-weekly-collection/$',create_weekly_collection),
    url(r'^product/([0-9]+)$',views.productApi),
    # url(r'^week/([0-9]+)$',purchase_week),
    url(r'^product/choices/$',views.product_choices),
    # url(r'^weekly-collection/(?P<date>[\w\-]+)/$', weekly_collection_api),
    # url(r'^weekly-collection-supplier/(?P<date_start>[\w\-]+)/(?P<date_end>[\w\-]+)/(?P<id>[0-9]+)$', weekly_collection_supplier),
    # url(r'^purchase/(?P<date_start>[\w\-]+)/(?P<date_end>[\w\-]+)/$', purchase_api),
    # url(r'^purchase/(?P<date_start>[\w\-]+)/(?P<date_end>[\w\-]+)/(?P<id>[0-9]+)$', purchase_api),
    # url(r'^weekly-collection/(?P<date_start>[\w\-]+)/(?P<date_end>[\w\-]+)/$', weekly_collection),
    # url(r'^weekly-collection/(?P<date_start>[\w\-]+)/(?P<date_end>[\w\-]+)/(?P<id>[0-9]+)$', weekly_collection_supplier),
]
