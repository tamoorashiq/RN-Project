from django.contrib import admin

from home.models import Feedback, Flag

# Register your models here.

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'email_address', 'subject', 'message', 'reply')

@admin.register(Flag)
class FlagAdmin(admin.ModelAdmin):
    list_display = ('content_type', 'object_id', 'reason', 'comment')