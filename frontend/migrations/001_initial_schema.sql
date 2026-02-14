-- Database Schema for BKT Architecture Studio WebApp
-- Target Database: PostgreSQL (Cloud SQL)

-- Enable UUID extension for secure ID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
-- Stores system users (Admins, Architects, Partners)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'architect', 'partner')),
    name VARCHAR(100) NOT NULL,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROJECTS TABLE
-- Stores architectural projects
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'finished', 'paused')),
    start_date DATE NOT NULL,
    end_date DATE,
    currency_rate DECIMAL(10, 2) DEFAULT 1.00, -- Exchange rate (e.g., ARS to USD)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CATEGORIES TABLE (Ref: REFs.csv)
-- Hierarchical structure for budget items (Rubros)
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY, -- Integer ID often easier for "Rubro Codes" (1, 2, 3...)
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('MO', 'MAT', 'General')), -- MO: Mano de Obra, MAT: Materiales
    description TEXT
);

-- 4. BUDGET ITEMS TABLE (Ref: PRESUPUESTO.csv)
-- Estimated costs per project and category
CREATE TABLE IF NOT EXISTS budget_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    description TEXT,
    estimated_quantity DECIMAL(10, 2) DEFAULT 0,
    unit_price DECIMAL(12, 2) DEFAULT 0,
    -- total_estimated DECIMAL(12, 2) GENERATED ALWAYS AS (estimated_quantity * unit_price) STORED, -- Note: Generated columns support depends on Postgres version, keeping simple for now
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEX for fast retrieval of project budgets
CREATE INDEX IF NOT EXISTS idx_budget_items_project ON budget_items(project_id);

-- 5. TRANSACTIONS TABLE (Ref: Caja / Registro de Pagos)
-- Represents the actual movement of money (THE HEAD)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id), -- Who recorded this?
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    payee VARCHAR(255), -- "Concepto" / Who got paid or paid us
    total_amount DECIMAL(12, 2) NOT NULL, -- Total amount of the receipt/invoice
    currency VARCHAR(3) DEFAULT 'ARS', -- Multi-currency support at transaction level
    exchange_rate_snapshot DECIMAL(10, 2), -- Snapshot of rate at time of transaction
    receipt_url TEXT, -- Photo of the invoice/ticket
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. TRANSACTION DETAILS TABLE (Ref: Imputaciones)
-- Critical: Handles split payments (The "Matrix" replacement)
-- One Transaction Head ($1000) -> Many Details ($500 Paint, $500 Labor)
CREATE TABLE IF NOT EXISTS transaction_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id), -- Nullable if general expense
    amount DECIMAL(12, 2) NOT NULL,
    notes TEXT
);
