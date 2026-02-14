export type UserRole = 'admin' | 'architect' | 'partner';
export type ProjectStatus = 'active' | 'finished' | 'paused';
export type CategoryType = 'MO' | 'MAT' | 'General';
export type TransactionType = 'income' | 'expense';

export interface User {
    id: string; // UUID
    email: string;
    role: UserRole;
    name: string;
    photo_url?: string;
    created_at: Date;
    updated_at: Date;
}

export interface Project {
    id: string; // UUID
    client_name: string;
    address: string;
    status: ProjectStatus;
    start_date: string; // Date string or Date object
    end_date?: string;
    currency_rate: number;
    created_at: Date;
    updated_at: Date;
}

export interface Category {
    id: number;
    name: string;
    type: CategoryType;
    description?: string;
}

export interface BudgetItem {
    id: string; // UUID
    project_id: string;
    category_id: number;
    description?: string;
    estimated_quantity: number;
    unit_price: number;
    total_estimated?: number; // Calculated
    created_at: Date;
}

export interface Transaction {
    id: string; // UUID
    project_id: string;
    user_id?: string;
    date: string;
    type: TransactionType;
    payee?: string;
    total_amount: number;
    currency?: string;
    exchange_rate_snapshot?: number;
    receipt_url?: string;
    notes?: string;
    created_at: Date;
}

export interface TransactionDetail {
    id: string; // UUID
    transaction_id: string;
    category_id?: number;
    amount: number;
    notes?: string;
}
