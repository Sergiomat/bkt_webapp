import { BudgetMonitor } from "@/components/domain/BudgetMonitor";
import { TransactionForm } from "@/components/domain/TransactionForm";
import { Button } from "@/components/ui/primitives";

export default function ProjectBudgetPage() {
    // Mock Data
    const budgetItems = [
        { categoryName: "1. Albañilería (MO)", estimated: 1200000, spent: 800000 },
        { categoryName: "2. Materiales Gruesos", estimated: 3500000, spent: 3650000 }, // Over budget
        { categoryName: "3. Instalación Eléctrica", estimated: 850000, spent: 200000 },
        { categoryName: "4. Pintura", estimated: 1200000, spent: 0 },
    ];

    return (
        <main className="min-h-screen p-8 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Casa Golf</h1>
                <p className="text-gray-500">Detalle de Presupuesto</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <BudgetMonitor items={budgetItems} />

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-bold text-yellow-800 mb-1">Honorarios (15%)</h4>
                        <div className="flex justify-between text-sm text-yellow-900">
                            <span>Base de Cálculo (Gastos Directos):</span>
                            <span>$4,650,000</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg text-yellow-900 mt-2">
                            <span>A Cobrar:</span>
                            <span>$697,500</span>
                        </div>
                    </div>
                </div>

                <div>
                    <TransactionForm />
                </div>
            </div>
        </main>
    );
}
