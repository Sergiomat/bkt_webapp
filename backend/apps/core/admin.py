from django.contrib import admin
from .models import Client, Project, BudgetCategory, Concept

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "tax_id", "phone", "email", "created_at")
    search_fields = ("name", "tax_id", "email")

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "client", "status", "start_date", "created_at")
    list_filter = ("status",)
    search_fields = ("name", "client__name")

@admin.register(BudgetCategory)
class BudgetCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "active", "created_at")
    list_filter = ("active",)
    search_fields = ("name",)

@admin.register(Concept)
class ConceptAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "type", "active", "created_at")
    list_filter = ("type", "active")
    search_fields = ("name",)
