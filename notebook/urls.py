from django.conf.urls import patterns, include, url
from notes import views, data 
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', views.home),
    url(r'^about$', views.about),
    url(r'^contact$', views.contact),
    url(r'^view/$', views.viewBooks),
    url(r'^load/(\d+)/$', views.loadBook),
    url(r'^signin/$', views.signin),
    url(r'^signup/$', views.signup),
    url(r'^create/$', views.createBook),

    #AJAX
    url(r'^getbook/(\d+)/$', data.getBook),
    # Examples:
    # url(r'^$', 'notebook.views.home', name='home'),
    # url(r'^notebook/', include('notebook.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
