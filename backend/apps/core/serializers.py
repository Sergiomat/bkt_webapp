from rest_framework import serializers
from .models import Client, Project, BudgetCategory, Concept

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ("id", "name", "tax_id", "phone", "email", "address", "created_at", "updated_at")

class ProjectSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source="client.name", read_only=True)

    class Meta:
        model = Project
        fields = ("id", "client", "client_name", "name", "start_date", "status", "notes", "created_at", "updated_at")

class BudgetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetCategory
        fields = ("id", "name", "active", "created_at", "updated_at")

class ConceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concept
        fields = ("id", "name", "type", "active", "created_at", "updated_at")
