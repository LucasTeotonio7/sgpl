from django.conf.urls import url
from weeklycontrol.views.views_week import get_week
from weeklycontrol.views.views_weekly_collection \
    import weekly_collection_form, weekly_collection_list

from weeklycontrol.views.views_weekly_control import weekly_collection

urlpatterns=[
    url(r'^week/([0-9]+)$',get_week),
    url(r'^weekly-collection-form/$',weekly_collection_form),
    url(r'^weekly-collection-list/(?P<date_start>[\w\-]+)/(?P<date_end>[\w\-]+)/(?P<id>[0-9]+)$', weekly_collection_list),
    url(r'^weekly-collection/(?P<date_start>[\w\-]+)/(?P<date_end>[\w\-]+)/$', weekly_collection)
    # url(r'^weekly-collection-supplier/(?P<date_start>[\w\-]+)/(?P<date_end>[\w\-]+)/(?P<id>[0-9]+)$', weekly_collection_supplier)
]