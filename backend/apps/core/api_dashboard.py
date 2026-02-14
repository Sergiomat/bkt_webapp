from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.core.models import Client, Project


class DashboardSummaryView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        active_projects = Project.objects.filter(status=Project.Status.ACTIVE).count()
        clients = Client.objects.count()

        recent = (
            Project.objects.select_related("client")
            .order_by("-created_at")[:3]
        )

        recent_projects = [
            {
                "project_id": p.id,
                "project_name": p.name,
                "client_name": p.client.name,
                "net": 0,  # placeholder hasta tener movimientos
            }
            for p in recent
        ]

        return Response(
            {
                "cash_total": 0,        # placeholder hasta tener movimientos
                "active_projects": active_projects,
                "clients": clients,
                "suppliers": 0,         # placeholder hasta tener Supplier
                "recent_projects": recent_projects,
            }
        )
