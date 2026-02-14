import React from 'react';


// Inline the utility for convenience if not strictly separated
function cn(...inputs: (string | undefined | null | false)[]) {
    return inputs.filter(Boolean).join(" ");
}

// 1. Card Component - High End
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn(
            "bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300",
            className
        )}>
            {children}
        </div>
    );
}

// 2. Button Component - Minimalist
export function Button({
    children,
    variant = 'primary',
    onClick,
    className = "",
    size = "default"
}: {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    onClick?: () => void;
    className?: string;
}) {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    const variants = {
        primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900",
        ghost: "hover:bg-slate-100 text-slate-700 hover:text-slate-900",
        danger: "bg-red-50 text-red-600 hover:bg-red-100"
    };

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
    };

    return (
        <button onClick={onClick} className={cn(baseStyles, variants[variant], sizes[size], className)}>
            {children}
        </button>
    );
}

// 3. Input Component - Clean
export function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    className = ""
}: {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</label>}
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
                    className
                )}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
