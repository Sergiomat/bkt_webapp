# Construction Suite (Backend)

Backend MVP en **Django + DRF** para reemplazar el Excel (presupuesto, rubros, caja/pagos), listo para conectarse a un frontend (Next.js PWA) y escalar a IA.

## Requisitos
- Docker + Docker Compose

## Levantar local con Docker
```bash
cd backend
cp .env.example .env
docker compose up --build
```

## Accesos
- API: http://localhost:8000/api/
- Swagger UI: http://localhost:8000/api/docs/
- OpenAPI schema: http://localhost:8000/api/schema/
- Admin Django: http://localhost:8000/admin/

## Crear usuario admin
En otra terminal:
```bash
docker compose exec web python manage.py createsuperuser
```

## Endpoints principales (MVP Core)
- Auth JWT:
  - `POST /api/auth/token/`  (username/password)
  - `POST /api/auth/token/refresh/`
- Clients:
  - `GET/POST /api/clients/`
  - `GET/PATCH/DELETE /api/clients/{id}/`
- Projects (Obras):
  - `GET/POST /api/projects/`
  - `GET/PATCH/DELETE /api/projects/{id}/`
- Rubros (Budget Categories):
  - `GET/POST /api/budget-categories/`
- Conceptos (income/expense):
  - `GET/POST /api/concepts/`

> Nota: Esto es el esqueleto inicial. Las apps budgeting/finance/profits/attachments están creadas para continuar el MVP.
