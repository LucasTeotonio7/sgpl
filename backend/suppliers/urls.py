from django.conf.urls import url
from suppliers import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[

    url(r'^supplier/$',views.supplierApi),
    url(r'^supplier/([0-9]+)$',views.supplierApi)
]