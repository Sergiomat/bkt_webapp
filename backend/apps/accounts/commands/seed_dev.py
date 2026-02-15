from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os


class Command(BaseCommand):
    help = "Seed dev data (creates/updates admin user)."

    def handle(self, *args, **options):
        User = get_user_model()

        username = os.getenv("DJANGO_ADMIN_USERNAME", "admin")
        password = os.getenv("DJANGO_ADMIN_PASSWORD", "C3v3l.26")
        email = os.getenv("DJANGO_ADMIN_EMAIL", "admin@local.dev")

        user, created = User.objects.get_or_create(username=username, defaults={"email": email})
        if not created and email and user.email != email:
            user.email = email

        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()

        self.stdout.write(self.style.SUCCESS(f"Admin ready: {username} / {password}"))
