from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Client, Project, BudgetCategory, Concept
from .serializers import ClientSerializer, ProjectSerializer, BudgetCategorySerializer, ConceptSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all().order_by("-created_at")
    serializer_class = ClientSerializer
    permission_classes = (IsAuthenticated,)
    search_fields = ("name", "tax_id", "email")
    ordering_fields = ("created_at", "name")

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.select_related("client").all().order_by("-created_at")
    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated,)
    filterset_fields = ("status", "client")
    search_fields = ("name", "client__name")
    ordering_fields = ("created_at", "start_date", "name")

class BudgetCategoryViewSet(viewsets.ModelViewSet):
    queryset = BudgetCategory.objects.all().order_by("name")
    serializer_class = BudgetCategorySerializer
    permission_classes = (IsAuthenticated,)
    filterset_fields = ("active",)
    search_fields = ("name",)
    ordering_fields = ("name", "created_at")

class ConceptViewSet(viewsets.ModelViewSet):
    queryset = Concept.objects.all().order_by("name")
    serializer_class = ConceptSerializer
    permission_classes = (IsAuthenticated,)
    filterset_fields = ("type", "active")
    search_fields = ("name",)
    ordering_fields = ("name", "created_at")
