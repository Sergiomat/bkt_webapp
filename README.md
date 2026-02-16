# BKT WebApp (Demo)

Suite MVP para gestión de obras (reemplazo de Excel).

- **Backend:** Django + DRF (Docker + Postgres)
- **Frontend:** Next.js (dev server local)
- **Auth:** JWT (SimpleJWT)
- **DB:** Postgres con volumen (persistente)

---

## Requisitos

- Git
- Docker + Docker Compose
- Node.js 20+
- (Opcional para desarrollo backend local) Python 3.12+ y `uv`

---

## Setup rápido (Demo)

### 1) Clonar el repo

```bash
git clone git@github.com:Sergiomat/bkt_webapp.git
cd bkt_webapp
```

### 2) Backend + DB (Docker)

Crear el env del backend (DEV):

```bash
cp backend/.env.example backend/.env
```

Levantar servicios:

```bash
docker compose -f docker/docker-compose.dev.yml up -d --build
```

> **Importante:** si cambiás variables en `backend/.env`, recreá el contenedor del backend para que tome el env nuevo:

```bash
docker compose -f docker/docker-compose.dev.yml up -d --force-recreate backend
```

### 3) Migraciones + usuario admin

```bash
docker compose -f docker/docker-compose.dev.yml exec backend uv run python manage.py migrate
docker compose -f docker/docker-compose.dev.yml exec backend uv run python manage.py createsuperuser
```

> Si ya existe `admin` y querés resetear password:

```bash
docker compose -f docker/docker-compose.dev.yml exec backend uv run python manage.py changepassword admin
```

### 4) Frontend (Next.js)

Crear env del frontend:

```bash
cp frontend/.env.local.example frontend/.env.local
```

Levantar el frontend:

```bash
cd frontend
npm install
npm run dev
```

Abrir en el navegador:

- **Frontend:** http://localhost:3000  (si está ocupado, Next usa 3001)
- **Swagger:** http://localhost:8005/api/docs/
- **Admin Django:** http://localhost:8005/admin/

---

## Variables de entorno (Backend)

### backend/.env.example (DEV)

> **No** versionar `backend/.env` (contiene secretos).  
> Sí versionar `backend/.env.example`.

```env
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=1
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

POSTGRES_DB=construction
POSTGRES_USER=construction
POSTGRES_PASSWORD=construction
POSTGRES_HOST=db
POSTGRES_PORT=5432

DJANGO_ADMIN_USERNAME=admin
DJANGO_ADMIN_PASSWORD=C3v3l.26
DJANGO_ADMIN_EMAIL=admin@local.dev

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### frontend/.env.local.example

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8005/api
```

---

## Endpoints principales

- Auth JWT:
  - `POST /api/auth/token/`
  - `POST /api/auth/token/refresh/`
- Dashboard:
  - `GET /api/dashboard/summary/`
- CRUD (según implementación):
  - `GET/POST /api/clients/`
  - `GET/POST /api/projects/`

---

## Troubleshooting

### Next levanta en 3001 y el login falla por CORS

1) Confirmar que el backend permite 3001:

`backend/.env`:
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

2) Re-crear backend para que tome el env:

```bash
docker compose -f docker/docker-compose.dev.yml up -d --force-recreate backend
```

3) Verificar el env dentro del contenedor:

```bash
docker compose -f docker/docker-compose.dev.yml exec backend env | grep CORS
```

### “No active account found with the given credentials”

- El usuario no existe o la password no coincide. Crear/resetear:

```bash
docker compose -f docker/docker-compose.dev.yml exec backend uv run python manage.py createsuperuser
docker compose -f docker/docker-compose.dev.yml exec backend uv run python manage.py changepassword admin
```

### Borrar la base por accidente

- Evitá `docker compose down -v` en DEV (eso borra el volumen de Postgres).
- Usá `down` o `stop`:

```bash
docker compose -f docker/docker-compose.dev.yml down
# o
docker compose -f docker/docker-compose.dev.yml stop
```
