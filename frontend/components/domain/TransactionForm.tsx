"use client";

import React, { useState } from 'react';
import { Button, Input, Card } from '../ui/primitives';
import { Camera, Plus, Trash2, ChevronRight } from 'lucide-react'; // Assuming lucide-react

export function TransactionForm() {
    const [amount, setAmount] = useState<string>('');
    const [payee, setPayee] = useState('');
    const [note, setNote] = useState('');
    const [splits, setSplits] = useState<{ categoryId: number; amount: number }[]>([]);

    return (
        <Card className="max-w-md mx-auto overflow-hidden border-slate-200 shadow-xl shadow-slate-200/50">
            {/* Header */}
            <div className="bg-slate-900 p-6 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <h2 className="text-lg font-medium tracking-wide">Registrar Gasto</h2>
                <p className="text-slate-400 text-xs mt-1">Nuevo movimiento de caja</p>
            </div>

            <div className="p-6 space-y-6">
                {/* Main Amount Input */}
                <div className="text-center">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Monto Total</label>
                    <div className="relative inline-block w-full max-w-[200px]">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl font-light text-slate-300">$</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full pl-6 pr-0 py-2 text-4xl font-bold text-slate-900 border-b border-slate-200 focus:border-slate-900 outline-none bg-transparent text-center transition-colors placeholder:text-slate-200"
                            placeholder="0.00"
                            autoFocus
                        />
                    </div>
                </div>

                {/* Inputs Group */}
                <div className="space-y-4">
                    <Input
                        label="Comprobante / Destinatario"
                        placeholder="Ej: Corralón Norte"
                        value={payee}
                        onChange={(e) => setPayee(e.target.value)}
                    />

                    {/* Split / Categorisation Section */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Imputación</label>
                            <button className="text-xs flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                <Plus className="w-3 h-3" /> Agregar Rubro
                            </button>
                        </div>

                        {splits.length === 0 ? (
                            <div className="text-center py-4 border-2 border-dashed border-slate-200 rounded-lg">
                                <p className="text-sm text-slate-400">Gasto General</p>
                                <p className="text-xs text-slate-300 mt-1">Sin categorizar</p>
                            </div>
                        ) : (
                            // Logic to list splits would go here
                            <div>Splits List</div>
                        )}
                    </div>

                    <Input
                        label="Notas Adicionales"
                        placeholder="Detalle (Opcional)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />

                    {/* Receipt Upload Button */}
                    <button className="w-full py-3 px-4 rounded-lg border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-600 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                        <Camera className="w-4 h-4" />
                        Adjuntar Foto del Comprobante
                    </button>
                </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 bg-slate-50 border-t border-slate-100">
                <Button className="w-full py-6 text-base shadow-xl shadow-slate-900/10" variant="primary">
                    Confirmar Gasto
                </Button>
            </div>
        </Card>
    );
}
