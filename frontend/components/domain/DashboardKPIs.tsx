import React from 'react';
import { Card } from '../ui/primitives';
import { ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Building2 } from 'lucide-react'; // Assuming lucide-react is available

interface KPICardProps {
    label: string;
    value: string;
    subtext?: string;
    icon: React.ElementType;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
}

export function KPICard({ label, value, subtext, icon: Icon, trend, trendValue }: KPICardProps) {
    return (
        <Card className="p-6 flex flex-col justify-between h-full bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border-slate-100/50">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <Icon className="w-5 h-5 text-slate-700" />
                </div>
                {trend && (
                    <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-50 text-emerald-700' :
                            trend === 'down' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                        {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                        {trendValue}
                    </div>
                )}
            </div>
            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
                {subtext && <p className="text-sm text-slate-500 mt-1">{subtext}</p>}
            </div>
        </Card>
    );
}

export function DashboardKPIs() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <KPICard
                label="Caja Actual"
                value="$1,240,500"
                subtext="Disponible en todas las cuentas"
                icon={Wallet}
                trend="up"
                trendValue="+2.5%"
            />
            <KPICard
                label="Gastos del Mes"
                value="$850,000"
                subtext="Acumulado periodo actual"
                icon={CreditCard}
                trend="down"
                trendValue="-12%"
            />
            <KPICard
                label="Proyectos Activos"
                value="3"
                subtext="1 en etapa de finalización"
                icon={Building2}
            />
        </div>
    );
}
