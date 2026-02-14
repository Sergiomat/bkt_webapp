FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# deps mínimos
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# instalar uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:${PATH}"

# copiar metadata primero (cache)
COPY pyproject.toml /app/pyproject.toml
# si ya existe uv.lock en tu repo, copialo también
COPY uv.lock /app/uv.lock

# instalar deps
RUN uv sync --frozen

# copiar el resto
COPY . /app

EXPOSE 8000

CMD ["bash", "-lc", "uv run python manage.py migrate && uv run python manage.py runserver 0.0.0.0:8000"]
