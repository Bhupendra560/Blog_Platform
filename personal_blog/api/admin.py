from django.contrib import admin
from .models import BLOGMODEL
from django.utils import timezone

class BlogAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'published_date']
    list_filter = ['title']
    search_fields = ['title', 'description']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description')
        }),
    )

    def save_model(self, request, obj, form, change):
        if not change:  # If it's a new entry
            obj.published_date = timezone.now()
        obj.save()


admin.site.register(BLOGMODEL, BlogAdmin)

