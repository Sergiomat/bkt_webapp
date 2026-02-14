import React from 'react';

interface BudgetRowProps {
    categoryName: string;
    estimated: number;
    spent: number;
}

// Helper for formatting currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
};

export function BudgetRow({ categoryName, estimated, spent }: BudgetRowProps) {
    const percentage = Math.min(100, (spent / estimated) * 100);
    const isOverBudget = spent > estimated;

    return (
        <div className="group py-4 px-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 relative">
            {/* Mobile Layout: Card-like */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className="font-medium text-sm text-slate-900">{categoryName}</span>

                <div className="flex items-baseline gap-1 sm:text-right">
                    <span className={`text-sm font-bold tabular-nums ${isOverBudget ? 'text-rose-600' : 'text-slate-900'}`}>
                        {formatCurrency(spent)}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                        / {formatCurrency(estimated)}
                    </span>
                </div>
            </div>

            {/* Progress Bar with Indicator */}
            <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${isOverBudget ? 'bg-rose-500' : 'bg-slate-900'}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Over Budget Warning Badge */}
            {isOverBudget && (
                <span className="absolute top-4 right-4 sm:static sm:ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                    EXCEDIDO
                </span>
            )}
        </div>
    );
}

export function BudgetMonitor({ items }: { items: BudgetRowProps[] }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Presupuesto Ejecutado</h3>
                <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full">Actualizado hoy</span>
            </div>
            <div className="divide-y divide-slate-100">
                {items.map((item, idx) => (
                    <BudgetRow key={idx} {...item} />
                ))}
            </div>
        </div>
    );
}
