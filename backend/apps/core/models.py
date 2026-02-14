from django.db import models

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Client(TimeStampedModel):
    name = models.CharField(max_length=255)
    tax_id = models.CharField(max_length=32, blank=True, default="")
    phone = models.CharField(max_length=64, blank=True, default="")
    email = models.EmailField(blank=True, default="")
    address = models.CharField(max_length=255, blank=True, default="")

    def __str__(self) -> str:
        return self.name

class Project(TimeStampedModel):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        ACTIVE = "active", "Active"
        PAUSED = "paused", "Paused"
        CLOSED = "closed", "Closed"

    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name="projects")
    name = models.CharField(max_length=255)
    start_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.DRAFT)
    notes = models.TextField(blank=True, default="")

    def __str__(self) -> str:
        return f"{self.client.name} - {self.name}"

class BudgetCategory(TimeStampedModel):
    name = models.CharField(max_length=120, unique=True)
    active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.name

class Concept(TimeStampedModel):
    class Type(models.TextChoices):
        INCOME = "income", "Income"
        EXPENSE = "expense", "Expense"

    name = models.CharField(max_length=120, unique=True)
    type = models.CharField(max_length=16, choices=Type.choices)
    active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.name} ({self.type})"
