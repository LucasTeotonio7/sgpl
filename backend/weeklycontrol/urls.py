from django.conf.urls import url
from weeklycontrol.views.views_week import weektApi, get_week_purchase, \
    get_last_week, get_weeks_to_product
from weeklycontrol.views.views_weekly_collection \
    import weekly_collection_form, weekly_collection_list

from weeklycontrol.views.views_weekly_control import weekly_collection

urlpatterns=[
    url(r'^week/$', weektApi),
    url(r'^week/(?P<id>[0-9]+)/$', weektApi),
    url(r'^week-purchase/([0-9]+)$', get_week_purchase),
    url(r'^last-week/$',get_last_week),
    url(r'^weeks/([0-9]+)$', get_weeks_to_product),
    url(r'^weekly-collection-form/$',weekly_collection_form),
    url(r'^weekly-collection-list/(?P<date_start>[\w\-]+)/(?P<date_end>[\w\-]+)/(?P<id>[0-9]+)$', weekly_collection_list),
    url(r'^weekly-collection/(?P<date_start>[\w\-]+)/(?P<date_end>[\w\-]+)/$', weekly_collection)
]