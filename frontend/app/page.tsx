"use client";

import React, { useState } from 'react';
import { 
  Building2, Wallet, TrendingUp, Plus, ArrowRight, LayoutDashboard,
  Hammer, FileText, PieChart, ChevronRight, X, Trash2, Users, Truck,
  ArrowUpCircle, ArrowDownCircle, Search, CheckCircle2, AlertCircle,
  Settings, Moon, Sun, BarChart3, Image as ImageIcon, History, Upload,
  Calendar, Clock, AlertTriangle, Pencil, LineChart
} from 'lucide-react';

// --- 1. DATOS MAESTROS ---
const RUBROS_MASTER = [
  { id: 1, nombre: "Demolición/Desmontaje" },
  { id: 2, nombre: "Plomería" },
  { id: 3, nombre: "Electricidad" },
  { id: 4, nombre: "Aire Acondicionado" },
  { id: 5, nombre: "Durlock y Steel Frame" },
  { id: 6, nombre: "Pisos" },
  { id: 7, nombre: "Herrería" },
  { id: 8, nombre: "Carpintería" },
  { id: 9, nombre: "Marmolería" },
  { id: 10, nombre: "Artefactos y Griferías" },
  { id: 11, nombre: "Aberturas" },
  { id: 12, nombre: "Pintura" },
  { id: 13, nombre: "Microcemento" },
  { id: 14, nombre: "Vidrio" },
  { id: 15, nombre: "Contenedores" },
  { id: 16, nombre: "Iluminación" },
  { id: 17, nombre: "Gráfica y Cartelería" },
  { id: 18, nombre: "TV y Comunicación" },
  { id: 19, nombre: "Mobiliario" },
  { id: 20, nombre: "Tapicería" },
  { id: 21, nombre: "Macetas y Plantas" },
  { id: 22, nombre: "Seguros" },
  { id: 23, nombre: "Redes / Sonido" },
  { id: 24, nombre: "Fletes" },
  { id: 25, nombre: "Limpieza de Obra" },
  { id: 26, nombre: "Otros" },
];

const APP_VERSION = "8.3 (Full Enterprise)";

// --- 2. DATOS INICIALES ---
const DB_INICIAL = {
  config: {
    empresa: "BKT Arquitectura",
    logoUrl: "", 
    tema: "light" as "light" | "dark"
  },
  clientes: [
    { id: 1, nombre: "Familia Perez", email: "perez@gmail.com", telefono: "11-5555-4444" },
    { id: 2, nombre: "Tech Solutions SA", email: "admin@tech.com", telefono: "11-9999-8888" },
    { id: 3, nombre: "Grupo Gastronómico", email: "compras@resto.com", telefono: "11-1111-2222" },
  ],
  proveedores: [
    { id: 1, nombre: "Easy Materiales", rubro: "General" },
    { id: 2, nombre: "Corralón Norte", rubro: "Materiales Gruesos" },
    { id: 3, nombre: "Electricidad Total", rubro: "Iluminación" },
    { id: 4, nombre: "Pinturerías Rex", rubro: "Pintura" },
  ],
  obras: [
    { id: 1, nombre: "Casa Lagos", clienteId: 1, direccion: "Av. Lagos 450", estado: "En Curso", fechaInicio: "2026-01-01", fechaFin: "2026-06-30" },
    { id: 2, nombre: "Oficinas Centro", clienteId: 2, direccion: "San Martin 1200", estado: "Terminado", fechaInicio: "2025-06-01", fechaFin: "2025-12-01" },
    { id: 3, nombre: "Resto Palermo", clienteId: 3, direccion: "Honduras 5500", estado: "En Curso", fechaInicio: "2025-01-01", fechaFin: "2025-12-30" }, 
  ],
  presupuesto: [
    { id: 1, obraId: 1, rubroId: 1, mo: 255000, mat: 50000 }, 
    { id: 2, obraId: 1, rubroId: 3, mo: 3200000, mat: 1000000 },
    { id: 3, obraId: 1, rubroId: 6, mo: 1200000, mat: 3428704 }, 
    { id: 4, obraId: 3, rubroId: 12, mo: 100000, mat: 100000 }, 
  ],
  movimientos: [
    { id: 1, obraId: 1, fecha: "2026-02-05", entidadId: 1, entidadTipo: 'CLIENTE', total: 60483128, tipo: "INGRESO", detalles: [] },
    { id: 2, obraId: 1, fecha: "2026-02-06", entidadId: 2, entidadTipo: 'PROVEEDOR', total: 220000, tipo: "EGRESO", detalles: [{ rubroId: 1, tipo: "MO", monto: 220000 }] },
    { id: 3, obraId: 3, fecha: "2026-02-01", entidadId: 4, entidadTipo: 'PROVEEDOR', total: 500000, tipo: "EGRESO", detalles: [{ rubroId: 12, tipo: "MAT", monto: 500000 }] },
  ]
};

export default function BKTApp() {
  // --- ESTADOS ---
  const [vista, setVista] = useState<'DASHBOARD' | 'METRICAS' | 'OBRAS_LISTA' | 'CLIENTES' | 'PROVEEDORES' | 'DETALLE_OBRA' | 'CONFIG'>('DASHBOARD');
  const [config, setConfig] = useState(DB_INICIAL.config);
  
  // Datos
  const [obras, setObras] = useState(DB_INICIAL.obras);
  const [clientes, setClientes] = useState(DB_INICIAL.clientes);
  const [proveedores, setProveedores] = useState(DB_INICIAL.proveedores);
  const [movimientos, setMovimientos] = useState(DB_INICIAL.movimientos);
  const [presupuesto, setPresupuesto] = useState(DB_INICIAL.presupuesto);
  
  const [obraActual, setObraActual] = useState<any>(null);
  const [tabObra, setTabObra] = useState<'RESUMEN' | 'PRESUPUESTO' | 'CAJA'>('RESUMEN');

  // Modales
  const [modalMovimientoOpen, setModalMovimientoOpen] = useState(false);
  const [modalObraOpen, setModalObraOpen] = useState(false);
  const [modalEntidadOpen, setModalEntidadOpen] = useState(false);
  const [modalEditarObraOpen, setModalEditarObraOpen] = useState(false);

  // Forms
  const [nuevoMovimiento, setNuevoMovimiento] = useState({
    fecha: new Date().toISOString().split('T')[0],
    entidadId: 0, 
    tipo: 'EGRESO' as 'INGRESO' | 'EGRESO', 
    total: 0,
    detalles: [{ rubroId: 1, tipo: 'MAT', monto: 0 }]
  });
  const [nuevaEntidad, setNuevaEntidad] = useState({ nombre: '', tipo: 'CLIENTE' }); 
  const [nuevaObra, setNuevaObra] = useState({ 
    id: 0, nombre: '', clienteId: 0, direccion: '', estado: 'En Curso', fechaInicio: '', fechaFin: '' 
  });

  // --- LÓGICA DE NEGOCIO ---

  const irAObra = (obra: any) => {
    setObraActual(obra);
    setTabObra('RESUMEN');
    setVista('DETALLE_OBRA');
  };

  const calcularSaldo = (obraId: number) => {
    const movs = movimientos.filter(m => m.obraId === obraId);
    const ing = movs.filter(m => m.tipo === 'INGRESO').reduce((acc, m) => acc + m.total, 0);
    const egr = movs.filter(m => m.tipo === 'EGRESO').reduce((acc, m) => acc + m.total, 0);
    return ing - egr;
  };

  const calcularGastadoTotal = (obraId: number) => {
    return movimientos
        .filter(m => m.obraId === obraId && m.tipo === 'EGRESO')
        .reduce((acc, m) => acc + m.total, 0);
  };

  const calcularPresupuestoTotal = (obraId: number) => {
    return presupuesto.filter(p => p.obraId === obraId).reduce((acc, p) => acc + p.mo + p.mat, 0);
  };

  const getAlertasObra = (obra: any) => {
    const alertas = [];
    const hoy = new Date().toISOString().split('T')[0];
    
    if (obra.estado === 'En Curso' && obra.fechaFin && obra.fechaFin < hoy) {
        alertas.push({ tipo: 'TIEMPO', mensaje: 'Plazo Vencido' });
    }
    const gastado = calcularGastadoTotal(obra.id);
    const presupuestado = calcularPresupuestoTotal(obra.id);
    if (presupuestado > 0 && gastado > presupuestado) {
        alertas.push({ tipo: 'PRESUPUESTO', mensaje: 'Presupuesto Excedido' });
    }
    return alertas;
  };

  const getStatusColor = (estado: string, alertas: any[]) => {
      if (alertas.length > 0) return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
      if (estado === 'Terminado') return { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' };
      if (estado === 'En Curso') return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' };
      return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' };
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setConfig({ ...config, logoUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  // --- ACTIONS ---

  const guardarMovimiento = () => {
    const suma = nuevoMovimiento.detalles.reduce((acc, d) => acc + d.monto, 0);
    if (Math.abs(suma - nuevoMovimiento.total) > 1 && nuevoMovimiento.tipo === 'EGRESO') return; 
    if (nuevoMovimiento.entidadId === 0) return alert("Seleccione entidad");

    const nuevoMov = {
      id: Date.now(),
      obraId: obraActual.id,
      fecha: nuevoMovimiento.fecha,
      entidadId: nuevoMovimiento.entidadId,
      entidadTipo: nuevoMovimiento.tipo === 'INGRESO' ? 'CLIENTE' : 'PROVEEDOR',
      total: nuevoMovimiento.total,
      tipo: nuevoMovimiento.tipo,
      detalles: nuevoMovimiento.detalles
    };

    setMovimientos([nuevoMov, ...movimientos]);
    setModalMovimientoOpen(false);
    setNuevoMovimiento({ fecha: new Date().toISOString().split('T')[0], entidadId: 0, tipo: 'EGRESO', total: 0, detalles: [{ rubroId: 1, tipo: 'MAT', monto: 0 }] });
  };

  const guardarEntidadRapida = () => {
    if (!nuevaEntidad.nombre) return;
    const id = Date.now();
    if (nuevaEntidad.tipo === 'CLIENTE') setClientes([...clientes, { id, nombre: nuevaEntidad.nombre, email: '', telefono: '' }]);
    else setProveedores([...proveedores, { id, nombre: nuevaEntidad.nombre, rubro: 'General' }]);
    if (modalMovimientoOpen) setNuevoMovimiento({ ...nuevoMovimiento, entidadId: id });
    setModalEntidadOpen(false);
  };

  const crearObra = () => {
      setObras([...obras, { ...nuevaObra, id: Date.now(), fechaInicio: new Date().toISOString().split('T')[0] }]);
      setModalObraOpen(false);
  };

  const actualizarObra = () => {
      const obrasActualizadas = obras.map(o => o.id === nuevaObra.id ? nuevaObra : o);
      setObras(obrasActualizadas as any);
      setObraActual(nuevaObra); 
      setModalEditarObraOpen(false);
  };

  const abrirEditarObra = () => {
      setNuevaObra({ ...obraActual }); 
      setModalEditarObraOpen(true);
  };

  // --- VARIABLES DE ESTILO ---
  const isDark = config.tema === 'dark';
  const bgMain = isDark ? 'bg-slate-950' : 'bg-slate-50';
  const bgCard = isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200';
  const textMain = isDark ? 'text-white' : 'text-slate-900';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';

  // --- COMPONENTES UI ---
  const Sidebar = () => (
    <aside className={`fixed left-0 top-0 h-full w-64 p-6 hidden md:flex flex-col z-50 shadow-xl transition-colors duration-300 ${isDark ? 'bg-slate-900 text-white border-r border-slate-800' : 'bg-slate-900 text-white'}`}>
      <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => setVista('DASHBOARD')}>
        {config.logoUrl ? (
            <div className="w-10 h-10 rounded-lg bg-white p-0.5 overflow-hidden flex items-center justify-center">
                <img src={config.logoUrl} alt="Logo" className="w-full h-full object-contain" />
            </div>
        ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shrink-0">BKT</div>
        )}
        <h1 className="text-lg font-bold tracking-tight leading-tight">{config.empresa}</h1>
      </div>
      
      <nav className="space-y-2 flex-1">
        <div className="text-xs uppercase text-slate-500 font-bold mb-2 mt-4 px-4">Operativo</div>
        <BotonNav icon={<LayoutDashboard size={18} />} label="Dashboard" activo={vista === 'DASHBOARD'} onClick={() => setVista('DASHBOARD')} />
        <BotonNav icon={<Building2 size={18} />} label="Obras Activas" activo={vista === 'OBRAS_LISTA'} onClick={() => setVista('OBRAS_LISTA')} />
        <BotonNav icon={<Users size={18} />} label="Clientes" activo={vista === 'CLIENTES'} onClick={() => setVista('CLIENTES')} />
        <BotonNav icon={<Truck size={18} />} label="Proveedores" activo={vista === 'PROVEEDORES'} onClick={() => setVista('PROVEEDORES')} />
        
        <div className="text-xs uppercase text-slate-500 font-bold mb-2 mt-6 px-4">Ejecutivo</div>
        <BotonNav icon={<LineChart size={18} />} label="KPIs & Métricas" activo={vista === 'METRICAS'} onClick={() => setVista('METRICAS')} />
        
        <div className="text-xs uppercase text-slate-500 font-bold mb-2 mt-6 px-4">Sistema</div>
        <BotonNav icon={<Settings size={18} />} label="Configuración" activo={vista === 'CONFIG'} onClick={() => setVista('CONFIG')} />
      </nav>

      <div className={`mt-auto pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-800'}`}>
        <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Versión {APP_VERSION}</span>
            <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-500' : 'bg-emerald-400'} animate-pulse`}></div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${bgMain} ${textMain}`}>
      <Sidebar />

      <main className="md:ml-64 p-4 md:p-8 pb-20 overflow-x-hidden relative z-0">
        
        {/* --- DASHBOARD --- */}
        {vista === 'DASHBOARD' && (
          <div className="animate-in fade-in duration-500">
            <Header titulo="Panel de Control" subtitulo="Resumen general" isDark={isDark} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <KpiCard isDark={isDark} title="Caja Total" value={`$ ${obras.reduce((acc, o) => acc + calcularSaldo(o.id), 0).toLocaleString()}`} icon={<Wallet className="text-blue-600"/>} trend="+ Global" />
              <KpiCard isDark={isDark} title="Obras Activas" value={obras.length} icon={<Building2 className="text-emerald-600"/>} />
              <KpiCard isDark={isDark} title="Clientes" value={clientes.length} icon={<Users className="text-purple-600"/>} />
              <KpiCard isDark={isDark} title="Proveedores" value={proveedores.length} icon={<Truck className="text-orange-600"/>} />
            </div>

            <div className={`rounded-xl shadow-sm border overflow-hidden ${bgCard}`}>
               <div className={`p-6 border-b flex justify-between items-center ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                 <h3 className="font-bold">Obras Recientes</h3>
                 <button onClick={() => setVista('OBRAS_LISTA')} className="text-sm text-blue-600 hover:underline">Ver todas</button>
               </div>
               <div className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                 {obras.slice(0, 3).map(obra => (
                   <div key={obra.id} onClick={(e) => { e.stopPropagation(); irAObra(obra); }} className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-4 pointer-events-none">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}><Building2 size={20}/></div>
                        <div>
                            <p className="font-bold text-sm">{obra.nombre}</p>
                            <p className={`text-xs ${textMuted}`}>{clientes.find(c => c.id === obra.clienteId)?.nombre || 'Sin Cliente'}</p>
                        </div>
                      </div>
                      <span className={`font-mono font-bold text-sm pointer-events-none ${calcularSaldo(obra.id) < 0 ? 'text-red-500' : 'text-emerald-500'}`}>$ {calcularSaldo(obra.id).toLocaleString()}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* --- KPI AVANZADOS --- */}
        {vista === 'METRICAS' && (
            <div className="animate-in fade-in duration-500">
                <Header titulo="Tablero de Mando" subtitulo="Análisis financiero y operativo" isDark={isDark} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Tarjeta de Flujo Global */}
                    <div className={`p-6 rounded-xl border shadow-sm col-span-1 md:col-span-2 lg:col-span-1 ${bgCard}`}>
                        <h3 className="font-bold mb-6 flex items-center gap-2"><BarChart3 className="text-indigo-500"/> Flujo Global</h3>
                        <div className="flex items-end gap-4 h-40 pt-4">
                            <div className="w-full h-full relative flex items-end">
                                <div className="w-full bg-emerald-500 rounded-t-lg relative group transition-all hover:opacity-90" style={{ height: '80%' }}>
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-600">Ingresos</span>
                                </div>
                            </div>
                            <div className="w-full h-full relative flex items-end">
                                <div className="w-full bg-red-500 rounded-t-lg relative group transition-all hover:opacity-90" style={{ height: '45%' }}>
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-600">Gastos</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ranking Obras x Volumen */}
                    <div className={`p-6 rounded-xl border shadow-sm ${bgCard}`}>
                        <h3 className="font-bold mb-4 flex items-center gap-2"><Building2 className="text-blue-500"/> Top Obras (Volumen $)</h3>
                        <div className="space-y-4">
                            {obras.map(o => ({...o, vol: calcularGastadoTotal(o.id)})).sort((a,b) => b.vol - a.vol).slice(0,4).map((o, i) => (
                                <div key={o.id} className="flex justify-between items-center text-sm">
                                    <div className="flex gap-2 items-center">
                                        <span className="font-bold text-slate-400 w-4">{i+1}</span>
                                        <span className="truncate max-w-[120px]">{o.nombre}</span>
                                    </div>
                                    <span className="font-mono font-bold">$ {o.vol.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* WATCHLIST (Alertas) */}
                    <div className={`p-6 rounded-xl border shadow-sm ${bgCard}`}>
                        <h3 className="font-bold mb-4 flex items-center gap-2"><AlertTriangle className="text-red-500"/> Alertas Críticas</h3>
                        <div className="space-y-3">
                            {obras.filter(o => getAlertasObra(o).length > 0).length === 0 ? (
                                <div className="text-center py-8 opacity-50"><CheckCircle2 className="mx-auto mb-2"/>Todo en orden</div>
                            ) : (
                                obras.filter(o => getAlertasObra(o).length > 0).map(o => (
                                    <div key={o.id} className="bg-red-50 border border-red-100 p-3 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-red-900 text-sm">{o.nombre}</p>
                                            <p className="text-xs text-red-600">{getAlertasObra(o).map(a => a.mensaje).join(', ')}</p>
                                        </div>
                                        <button onClick={() => irAObra(o)} className="text-xs bg-white text-red-600 px-2 py-1 rounded border border-red-200">Ver</button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Clientes */}
                    <div className={`p-6 rounded-xl border shadow-sm ${bgCard}`}>
                        <h3 className="font-bold mb-4">Mejores Clientes</h3>
                        <div className="space-y-3">
                            {clientes.map(c => ({
                                ...c, total: movimientos.filter(m => m.entidadTipo === 'CLIENTE' && m.entidadId === c.id && m.tipo === 'INGRESO').reduce((acc, m) => acc + m.total, 0)
                            })).sort((a,b)=>b.total-a.total).slice(0,5).map((c, i) => (
                                <div key={c.id} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${i===0 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'}`}>{i+1}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium">{c.nombre}</span>
                                            <span className="font-bold">$ {c.total.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full"><div className="h-1.5 bg-blue-500 rounded-full" style={{width: '60%'}}></div></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Proveedores */}
                    <div className={`p-6 rounded-xl border shadow-sm ${bgCard}`}>
                        <h3 className="font-bold mb-4">Principales Proveedores</h3>
                        <div className="space-y-3">
                            {proveedores.map(p => ({
                                ...p, total: movimientos.filter(m => m.entidadTipo === 'PROVEEDOR' && m.entidadId === p.id && m.tipo === 'EGRESO').reduce((acc, m) => acc + m.total, 0)
                            })).sort((a,b)=>b.total-a.total).slice(0,5).map((p, i) => (
                                <div key={p.id} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${i===0 ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>{i+1}</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium">{p.nombre}</span>
                                            <span className="font-bold">$ {p.total.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full"><div className="h-1.5 bg-orange-500 rounded-full" style={{width: '60%'}}></div></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- CONFIGURACIÓN --- */}
        {vista === 'CONFIG' && (
            <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
                <Header titulo="Configuración" subtitulo="Preferencias del sistema" isDark={isDark} />
                <div className={`p-6 rounded-xl border shadow-sm mb-6 ${bgCard}`}>
                    <h3 className="font-bold mb-4">Apariencia</h3>
                    <div className="flex gap-4">
                        <button onClick={() => setConfig({...config, tema: 'light'})} className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${config.tema === 'light' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500'}`}><Sun size={24}/> Modo Claro</button>
                        <button onClick={() => setConfig({...config, tema: 'dark'})} className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${config.tema === 'dark' ? 'border-blue-500 bg-slate-800 text-blue-400' : 'border-slate-200 text-slate-500'}`}><Moon size={24}/> Modo Oscuro</button>
                    </div>
                </div>
                <div className={`p-6 rounded-xl border shadow-sm mb-6 ${bgCard}`}>
                    <h3 className="font-bold mb-4">Logo & Empresa</h3>
                    <div className="space-y-4">
                        <input type="text" value={config.empresa} onChange={(e) => setConfig({...config, empresa: e.target.value})} className={`w-full p-3 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-white'}`} placeholder="Nombre Empresa"/>
                        <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded border flex items-center justify-center bg-white overflow-hidden`}>{config.logoUrl ? <img src={config.logoUrl} className="w-full h-full object-contain"/> : <ImageIcon className="text-slate-300"/>}</div>
                            <label className="bg-slate-900 text-white px-4 py-2 rounded cursor-pointer text-sm font-bold"><input type="file" className="hidden" onChange={handleLogoUpload}/>Subir Logo</label>
                        </div>
                    </div>
                </div>
                <div className={`p-6 rounded-xl border shadow-sm ${bgCard}`}>
                    <h3 className="font-bold mb-4 flex items-center gap-2"><History size={18}/> Historial de Versiones</h3>
                    <ul className={`space-y-3 text-sm ${textMuted}`}>
                        <li className="flex gap-3"><span className="font-mono font-bold bg-blue-100 text-blue-700 px-1 rounded text-xs h-fit">v8.3</span> <span>Enterprise Release: Fix botones, Sidebar layers, Full Features.</span></li>
                        <li className="flex gap-3"><span className="font-mono font-bold bg-slate-100 text-slate-700 px-1 rounded text-xs h-fit">v8.1</span> <span>Fix Visual: Solapamiento de tablas Clientes/Proveedores.</span></li>
                        <li className="flex gap-3"><span className="font-mono font-bold bg-slate-100 text-slate-700 px-1 rounded text-xs h-fit">v8.0</span> <span>Edición de Obras (Fechas/Estado), KPIs Avanzados.</span></li>
                    </ul>
                </div>
            </div>
        )}

        {/* --- OBRAS LISTA --- */}
        {vista === 'OBRAS_LISTA' && (
           <div className="animate-in fade-in">
              <div className="flex justify-between items-center mb-6">
                 <Header titulo="Obras Activas" subtitulo="Gestión de proyectos" isDark={isDark} />
                 <button onClick={() => { setNuevaObra({id:0, nombre:'', clienteId:0, direccion:'', estado:'En Curso', fechaInicio:'', fechaFin:''}); setModalObraOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:bg-blue-700 flex items-center gap-2"><Plus size={18}/> Nueva Obra</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {obras.map(obra => {
                    const alertas = getAlertasObra(obra);
                    const colors = getStatusColor(obra.estado, alertas);
                    return (
                        <div key={obra.id} onClick={(e) => { e.stopPropagation(); irAObra(obra); }} className={`p-6 rounded-xl border shadow-sm cursor-pointer hover:shadow-md transition-all ${bgCard}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}><Building2 size={20}/></div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className={`${colors.bg} ${colors.text} ${colors.border} text-xs px-2 py-1 rounded-full font-bold border`}>{obra.estado}</span>
                                    {alertas.map((a, idx) => <span key={idx} className="bg-red-100 text-red-700 border border-red-200 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><AlertTriangle size={10}/> {a.mensaje}</span>)}
                                </div>
                            </div>
                            <h3 className="font-bold text-lg">{obra.nombre}</h3>
                            <p className={`text-sm mb-4 ${textMuted}`}>{clientes.find(c => c.id === obra.clienteId)?.nombre || 'Sin Asignar'}</p>
                            <div className="flex gap-4 text-xs mb-4 text-slate-500"><div className="flex items-center gap-1"><Calendar size={12}/> Fin: {obra.fechaFin || 'N/A'}</div></div>
                            <div className={`pt-4 border-t flex justify-between font-bold ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                                <span className={`text-xs mt-1 ${textMuted}`}>SALDO</span>
                                <span className={`${calcularSaldo(obra.id) < 0 ? 'text-red-500' : 'text-emerald-500'}`}>$ {calcularSaldo(obra.id).toLocaleString()}</span>
                            </div>
                        </div>
                    );
                 })}
              </div>
           </div>
        )}

        {/* --- CLIENTES & PROVEEDORES (FIXED V8.1) --- */}
        {(vista === 'CLIENTES' || vista === 'PROVEEDORES') && (
            <div className="animate-in fade-in w-full max-w-full">
                <div className="flex justify-between items-center mb-6">
                    <Header titulo={vista === 'CLIENTES' ? "Cartera de Clientes" : "Proveedores"} subtitulo={vista === 'CLIENTES' ? "Gestión de comitentes" : "Gestión de compras"} isDark={isDark} />
                    <button onClick={() => { setNuevaEntidad({nombre:'', tipo: vista === 'CLIENTES' ? 'CLIENTE' : 'PROVEEDOR'}); setModalEntidadOpen(true); }} className="bg-slate-900 dark:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2"><Plus size={18}/> Nuevo {vista === 'CLIENTES' ? 'Cliente' : 'Proveedor'}</button>
                </div>
                <div className={`rounded-xl border shadow-sm overflow-hidden w-full ${bgCard}`}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm min-w-[600px]">
                            <thead className={`${isDark ? 'bg-slate-950 text-slate-400' : 'bg-slate-50 text-slate-500'} uppercase font-bold text-xs`}>
                                <tr><th className="px-6 py-4 text-left">Nombre</th><th className="px-6 py-4 text-left">{vista === 'CLIENTES' ? 'Contacto' : 'Rubro'}</th><th className="px-6 py-4 text-left">Historial</th></tr>
                            </thead>
                            <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                                {(vista === 'CLIENTES' ? clientes : proveedores).map((item: any) => (
                                    <tr key={item.id} className={`transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
                                        <td className="px-6 py-4 font-bold">{item.nombre}</td>
                                        <td className={`px-6 py-4 ${textMuted}`}>{item.email || item.rubro}</td>
                                        <td className="px-6 py-4"><span className="bg-blue-500/10 text-blue-600 px-2 py-1 rounded-full text-xs font-bold">Ver ficha</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {/* --- DETALLE OBRA --- */}
        {vista === 'DETALLE_OBRA' && obraActual && (
          <div className="animate-in slide-in-from-right duration-300">
             <div className={`sticky top-0 z-40 mb-6 py-4 border-b flex justify-between items-center ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-4">
                   <button onClick={() => setVista('OBRAS_LISTA')} className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}><ArrowRight size={20} className="rotate-180"/></button>
                   <div>
                      <div className="flex items-center gap-2">
                          <h1 className="text-xl font-bold">{obraActual.nombre}</h1>
                          <button onClick={abrirEditarObra} className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-500 transition-colors"><Pencil size={14}/></button>
                      </div>
                      <div className="flex items-center gap-2">
                          <p className={`text-xs ${textMuted}`}>{clientes.find(c => c.id === obraActual.clienteId)?.nombre}</p>
                          {getAlertasObra(obraActual).map((a, i) => <span key={i} className="bg-red-100 text-red-600 px-1.5 rounded text-[10px] font-bold border border-red-200">{a.mensaje}</span>)}
                      </div>
                   </div>
                </div>
                <div className="flex gap-2 md:gap-4">
                   <TabButton label="Resumen" active={tabObra === 'RESUMEN'} onClick={() => setTabObra('RESUMEN')} isDark={isDark} />
                   <TabButton label="Presupuesto" active={tabObra === 'PRESUPUESTO'} onClick={() => setTabObra('PRESUPUESTO')} isDark={isDark} />
                   <TabButton label="Caja" active={tabObra === 'CAJA'} onClick={() => setTabObra('CAJA')} isDark={isDark} />
                   <button onClick={() => setModalMovimientoOpen(true)} className="bg-slate-900 dark:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-2 shadow-lg ml-2">
                      <Plus size={16} /> Gasto
                   </button>
                </div>
             </div>

             {tabObra === 'RESUMEN' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <KpiCard title="Saldo Actual Obra" value={`$ ${calcularSaldo(obraActual.id).toLocaleString()}`} icon={<Wallet className="text-blue-600"/>} isDark={isDark} />
                   <div className={`p-6 rounded-xl border shadow-sm ${bgCard}`}>
                      <h3 className={`font-bold mb-4 ${textMuted}`}>Plazos y Fechas</h3>
                      <div className="space-y-3">
                          <div className="flex justify-between items-center"><span className="text-sm">Inicio</span><span className="font-mono font-bold">{obraActual.fechaInicio || '--/--/----'}</span></div>
                          <div className="flex justify-between items-center"><span className="text-sm">Fin Estimado</span><span className="font-mono font-bold">{obraActual.fechaFin || '--/--/----'}</span></div>
                          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                             {getAlertasObra(obraActual).find(a => a.tipo === 'TIEMPO') ? (
                                 <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-100"><AlertCircle size={16}/> <b>Atención:</b> Plazo vencido.</div>
                             ) : (
                                 <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-sm flex items-center gap-2 border border-emerald-100"><CheckCircle2 size={16}/> <b>En Plazo:</b> Dentro del cronograma.</div>
                             )}
                          </div>
                      </div>
                   </div>
                </div>
             )}

             {tabObra === 'PRESUPUESTO' && (
                <div className={`rounded-xl border shadow-sm overflow-hidden ${bgCard}`}>
                   <table className="w-full text-sm">
                      <thead className={`${isDark ? 'bg-slate-950 text-slate-400' : 'bg-slate-50 text-slate-500'} uppercase font-bold text-xs`}>
                         <tr><th className="px-6 py-4 text-left">Rubro</th><th className="px-6 py-4 text-right">Presupuesto</th><th className={`px-6 py-4 text-right border-l ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>Gastado Real</th><th className="px-6 py-4 text-center">Desvío</th></tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                         {presupuesto.filter(p => p.obraId === obraActual.id).map(item => {
                            const gastado = movimientos.filter(m => m.obraId === obraActual.id && m.tipo === 'EGRESO').flatMap(m => m.detalles).filter(d => d.rubroId === item.rubroId).reduce((acc, d) => acc + d.monto, 0);
                            const totalEst = item.mo + item.mat;
                            const pct = (gastado / totalEst) * 100;
                            return (
                               <tr key={item.id} className={`transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
                                  <td className="px-6 py-4 font-medium">{RUBROS_MASTER.find(r => r.id === item.rubroId)?.nombre}</td>
                                  <td className={`px-6 py-4 text-right ${textMuted}`}>$ {totalEst.toLocaleString()}</td>
                                  <td className={`px-6 py-4 text-right border-l font-bold ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>$ {gastado.toLocaleString()}</td>
                                  <td className="px-6 py-4"><div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${pct > 100 ? 'bg-red-500' : 'bg-blue-500'}`} style={{width: `${Math.min(pct, 100)}%`}}></div></div></td>
                               </tr>
                            )
                         })}
                      </tbody>
                   </table>
                </div>
             )}

             {tabObra === 'CAJA' && (
                <div className="space-y-4">
                   {movimientos.filter(m => m.obraId === obraActual.id).sort((a,b) => b.id - a.id).map(mov => (
                      <div key={mov.id} className={`p-4 rounded-xl border shadow-sm flex justify-between items-center ${bgCard}`}>
                         <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${mov.tipo === 'INGRESO' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'}`}>
                               {mov.tipo === 'INGRESO' ? <ArrowDownCircle size={20}/> : <ArrowUpCircle size={20}/>}
                            </div>
                            <div>
                               <p className="font-bold">{mov.entidadTipo === 'CLIENTE' ? clientes.find(c=>c.id === mov.entidadId)?.nombre : proveedores.find(p=>p.id === mov.entidadId)?.nombre}</p>
                               <p className={`text-xs ${textMuted}`}>{mov.fecha} • {mov.tipo}</p>
                            </div>
                         </div>
                         <span className={`font-mono font-bold text-lg ${mov.tipo === 'INGRESO' ? 'text-emerald-500' : 'text-red-500'}`}>
                            {mov.tipo === 'INGRESO' ? '+' : '-'} $ {mov.total.toLocaleString()}
                         </span>
                      </div>
                   ))}
                </div>
             )}
          </div>
        )}

      </main>

      {/* --- MODALES --- */}
      
      {/* MODAL CREAR OBRA */}
      {modalObraOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className={`rounded-2xl w-full max-w-md shadow-2xl p-6 ${bgCard}`}>
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-xl">Nueva Obra</h3>
                 <button onClick={() => setModalObraOpen(false)}><X className="text-slate-400 hover:text-red-500"/></button>
              </div>
              <div className="space-y-4">
                 <input type="text" className={`w-full border p-3 rounded-lg ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50'}`} placeholder="Nombre del Proyecto" 
                    value={nuevaObra.nombre} onChange={e => setNuevaObra({...nuevaObra, nombre: e.target.value})}/>
                 <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-slate-500">ESTADO</label><select className={`w-full border p-3 rounded-lg ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50'}`} value={nuevaObra.estado} onChange={e => setNuevaObra({...nuevaObra, estado: e.target.value})}><option value="Planificación">Planificación</option><option value="En Curso">En Curso</option><option value="Terminado">Terminado</option></select></div>
                    <div><label className="text-xs font-bold text-slate-500">FIN ESTIMADO</label><input type="date" className={`w-full border p-3 rounded-lg ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50'}`} value={nuevaObra.fechaFin} onChange={e => setNuevaObra({...nuevaObra, fechaFin: e.target.value})}/></div>
                 </div>
                 <div className="flex gap-2"><select className={`w-full border p-3 rounded-lg ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50'}`} value={nuevaObra.clienteId} onChange={e => setNuevaObra({...nuevaObra, clienteId: parseInt(e.target.value)})}>{clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}</select></div>
                 <input type="text" className={`w-full border p-3 rounded-lg ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50'}`} placeholder="Dirección" value={nuevaObra.direccion} onChange={e => setNuevaObra({...nuevaObra, direccion: e.target.value})}/>
                 <button onClick={crearObra} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 mt-4">Crear Proyecto</button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL EDITAR OBRA (NUEVO V8) */}
      {modalEditarObraOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className={`rounded-2xl w-full max-w-md shadow-2xl p-6 ${bgCard}`}>
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-xl">Editar Obra</h3>
                 <button onClick={() => setModalEditarObraOpen(false)}><X className="text-slate-400 hover:text-red-500"/></button>
              </div>
              <div className="space-y-4">
                 <label className="text-xs font-bold text-slate-500">NOMBRE</label>
                 <input type="text" className={`w-full border p-3 rounded-lg ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50'}`} 
                    value={nuevaObra.nombre} onChange={e => setNuevaObra({...nuevaObra, nombre: e.target.value})}/>
                 <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-slate-500">ESTADO</label><select className={`w-full border p-3 rounded-lg ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50'}`} value={nuevaObra.estado} onChange={e => setNuevaObra({...nuevaObra, estado: e.target.value})}><option value="Planificación">Planificación</option><option value="En Curso">En Curso</option><option value="Terminado">Terminado</option></select></div>
                    <div><label className="text-xs font-bold text-slate-500">FIN ESTIMADO</label><input type="date" className={`w-full border p-3 rounded-lg ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50'}`} value={nuevaObra.fechaFin} onChange={e => setNuevaObra({...nuevaObra, fechaFin: e.target.value})}/></div>
                 </div>
                 <div><label className="text-xs font-bold text-slate-500">DIRECCIÓN</label><input type="text" className={`w-full border p-3 rounded-lg ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50'}`} value={nuevaObra.direccion} onChange={e => setNuevaObra({...nuevaObra, direccion: e.target.value})}/></div>
                 <button onClick={actualizarObra} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 mt-4">Guardar Cambios</button>
              </div>
           </div>
        </div>
      )}

      {/* OTROS MODALES (ENTIDAD / MOVIMIENTO) */}
      {modalEntidadOpen && (
         <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className={`rounded-xl w-full max-w-sm p-6 shadow-2xl ${bgCard}`}>
                <h3 className="font-bold mb-4">Nuevo Entidad</h3>
                <input autoFocus type="text" className={`w-full border p-3 rounded-lg mb-4 font-lg ${isDark ? 'bg-slate-950 border-slate-700' : ''}`} placeholder="Nombre"
                    value={nuevaEntidad.nombre} onChange={e => setNuevaEntidad({...nuevaEntidad, nombre: e.target.value})}/>
                <button onClick={guardarEntidadRapida} className={`w-full text-white py-2 rounded-lg font-bold ${isDark ? 'bg-blue-600' : 'bg-slate-900'}`}>Guardar</button>
                <button onClick={() => setModalEntidadOpen(false)} className="w-full mt-2 text-slate-500 py-2">Cancelar</button>
            </div>
         </div>
      )}

      {modalMovimientoOpen && (
         <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className={`rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${bgCard}`}>
               <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className={`flex p-1 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                      <button onClick={() => setNuevoMovimiento({...nuevoMovimiento, tipo: 'EGRESO', entidadId: 0})} className={`px-4 py-1.5 rounded-md text-xs font-bold ${nuevoMovimiento.tipo === 'EGRESO' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}>EGRESO</button>
                      <button onClick={() => setNuevoMovimiento({...nuevoMovimiento, tipo: 'INGRESO', entidadId: 0})} className={`px-4 py-1.5 rounded-md text-xs font-bold ${nuevoMovimiento.tipo === 'INGRESO' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}>INGRESO</button>
                  </div>
                  <button onClick={() => setModalMovimientoOpen(false)}><X className="text-slate-400 hover:text-red-500"/></button>
               </div>
               <div className="p-6 overflow-y-auto flex-1 space-y-5">
                  <div>
                     <label className="text-xs font-bold text-slate-500 uppercase mb-1">{nuevoMovimiento.tipo === 'INGRESO' ? 'Cliente' : 'Proveedor'}</label>
                     <div className="flex gap-2">
                        <select className={`w-full border rounded-lg p-3 text-sm ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-white'}`} value={nuevoMovimiento.entidadId} onChange={e => setNuevoMovimiento({...nuevoMovimiento, entidadId: parseInt(e.target.value)})}>
                            <option value={0}>Seleccionar...</option>
                            {(nuevoMovimiento.tipo === 'INGRESO' ? clientes : proveedores).map(x => <option key={x.id} value={x.id}>{x.nombre}</option>)}
                        </select>
                        <button onClick={() => { setNuevaEntidad({ nombre: '', tipo: nuevoMovimiento.tipo === 'INGRESO' ? 'CLIENTE' : 'PROVEEDOR' }); setModalEntidadOpen(true); }} className={`p-3 rounded-lg border hover:opacity-80 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'}`}><Plus size={18}/></button>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div><label className="text-xs font-bold text-slate-500 uppercase">Fecha</label><input type="date" className={`w-full border rounded-lg p-2.5 ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-white'}`} value={nuevoMovimiento.fecha} onChange={e => setNuevoMovimiento({...nuevoMovimiento, fecha: e.target.value})} /></div>
                     <div><label className="text-xs font-bold text-slate-500 uppercase">Monto Total</label><input type="number" className={`w-full border rounded-lg p-2.5 font-bold text-lg ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-white'}`} placeholder="$ 0" value={nuevoMovimiento.total || ''} onChange={e => setNuevoMovimiento({...nuevoMovimiento, total: parseFloat(e.target.value) || 0})} /></div>
                  </div>
                  {/* SPLIT */}
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase">Imputación</span>
                        {Math.abs(nuevoMovimiento.total - nuevoMovimiento.detalles.reduce((a,b)=>a+b.monto,0)) < 1 ? <span className="text-xs bg-emerald-500/10 text-emerald-600 px-2 py-1 rounded font-bold flex gap-1"><CheckCircle2 size={12}/> OK</span> : <span className="text-xs bg-red-500/10 text-red-600 px-2 py-1 rounded font-bold flex gap-1"><AlertCircle size={12}/> Resta: $ {(nuevoMovimiento.total - nuevoMovimiento.detalles.reduce((a,b)=>a+b.monto,0)).toLocaleString()}</span>}
                     </div>
                     <div className="space-y-2">
                        {nuevoMovimiento.detalles.map((detalle, idx) => (
                           <div key={idx} className="flex gap-2 items-center">
                              <select className={`flex-1 text-xs border rounded-lg p-2 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white'}`} value={detalle.rubroId} onChange={e => { const n = [...nuevoMovimiento.detalles]; n[idx].rubroId = parseInt(e.target.value); setNuevoMovimiento({...nuevoMovimiento, detalles: n}); }}>{RUBROS_MASTER.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}</select>
                              <select className={`w-20 text-xs border rounded-lg p-2 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white'}`} value={detalle.tipo} onChange={e => { const n = [...nuevoMovimiento.detalles]; n[idx].tipo = e.target.value; setNuevoMovimiento({...nuevoMovimiento, detalles: n}); }}><option value="MAT">MAT</option><option value="MO">MO</option></select>
                              <input type="number" className={`w-24 text-xs border rounded-lg p-2 ${isDark ? 'bg-slate-900 border-slate-700' : ''}`} placeholder="$" value={detalle.monto || ''} onChange={e => { const n = [...nuevoMovimiento.detalles]; n[idx].monto = parseFloat(e.target.value) || 0; setNuevoMovimiento({...nuevoMovimiento, detalles: n}); }} />
                              <button onClick={() => { const n = nuevoMovimiento.detalles.filter((_, i) => i !== idx); setNuevoMovimiento({...nuevoMovimiento, detalles: n}); }} className="text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                           </div>
                        ))}
                     </div>
                     <button onClick={() => setNuevoMovimiento({...nuevoMovimiento, detalles: [...nuevoMovimiento.detalles, {rubroId: 1, tipo: 'MAT', monto: 0}]})} className="mt-3 text-xs text-blue-500 font-bold flex items-center gap-1 hover:underline"><Plus size={14}/> Agregar imputación</button>
                  </div>
               </div>
               <div className={`p-4 border-t flex justify-end gap-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
                  <button onClick={() => setModalMovimientoOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">Cancelar</button>
                  <button onClick={guardarMovimiento} className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg ${nuevoMovimiento.tipo === 'INGRESO' ? 'bg-emerald-600' : 'bg-red-600'}`}>Confirmar</button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
}

// --- UI HELPERS ---

function Header({titulo, subtitulo, isDark}: any) {
   return (
      <div className="mb-8">
         <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{titulo}</h2>
         <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{subtitulo}</p>
      </div>
   )
}

function KpiCard({ title, value, icon, trend, isDark }: any) {
  return (
    <div className={`p-6 rounded-xl border shadow-sm ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>{icon}</div>
        {trend && <span className="text-[10px] uppercase font-bold bg-blue-500/10 text-blue-600 px-2 py-1 rounded-full">{trend}</span>}
      </div>
      <p className={`text-xs uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
      <p className={`text-2xl font-bold tracking-tight mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    </div>
  );
}

function BotonNav({ icon, label, activo, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activo ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30 translate-x-1' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      {icon} {label}
    </button>
  );
}

function TabButton({ label, active, onClick, isDark }: any) {
    return (
        <button onClick={onClick} className={`pb-3 text-sm font-medium border-b-2 transition-colors ${active ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-400'}`}>
            {label}
        </button>
    )
}