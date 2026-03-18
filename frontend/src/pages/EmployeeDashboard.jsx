import React, { useState, useEffect } from 'react';
import { getMyTasks, updateTaskStatus } from '../api';
import DashboardLayout from '../layouts/DashboardLayout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';
import { 
  Target, 
  CheckCircle2, 
  Clock, 
  PlayCircle, 
  AlertCircle,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

const EmployeeDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTasks = async () => {
        try {
            const { data } = await getMyTasks();
            setTasks(data);
        } catch (err) {
            setError('Intelligence feed disconnected. Re-authenticating...');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleUpdateStatus = async (id, status) => {
        try {
            await updateTaskStatus(id, status);
            fetchTasks();
        } catch (err) {
            setError('Status synchronization failed. Retry deployment.');
        }
    };

    if (loading) return <Loader fullScreen />;

    const pendingTasks = tasks.filter(t => t.status === 'pending');
    const activeTasks = tasks.filter(t => t.status === 'in-progress');
    const completedTasks = tasks.filter(t => t.status === 'completed');

    return (
        <DashboardLayout role="employee">
            <div className="space-y-10">
                {/* Hero Header */}
                <div className="relative rounded-3xl overflow-hidden bg-secondary p-8 md:p-12 text-white shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            <Zap size={14} className="fill-primary" />
                            Active Deployment
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Field Operations</h2>
                        <p className="text-gray-400 max-w-xl text-lg font-medium leading-relaxed">
                            Your current active objectives and mission parameters. Execute with precision and report status updates in real-time.
                        </p>
                    </div>
                </div>

                {/* Status Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Assigned', count: pendingTasks.length, color: 'text-gray-400', bg: 'bg-gray-400/10' },
                        { label: 'In Progress', count: activeTasks.length, color: 'text-primary', bg: 'bg-primary/10' },
                        { label: 'Completed', count: completedTasks.length, color: 'text-accent', bg: 'bg-accent/10' },
                    ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-border shadow-soft">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">{s.label}</p>
                                <p className="text-3xl font-black text-text-primary">{s.count}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
                                <ShieldCheck size={24} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mission Grid */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-text-primary tracking-tight">Mission Briefings</h3>
                        <div className="flex gap-2">
                            <div className="px-3 py-1 bg-white border border-border rounded-lg text-xs font-bold text-text-secondary">
                                Sorted by Priority
                            </div>
                        </div>
                    </div>

                    {tasks.length === 0 ? (
                        <Card variant="ghost" className="border-dashed border-2 py-24 text-center">
                            <Target size={48} className="mx-auto text-border mb-4 opacity-50" />
                            <p className="text-text-secondary font-bold text-xl">No missions assigned.</p>
                            <p className="text-sm text-text-secondary mt-1">Stand by for upcoming mission parameters.</p>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {tasks.map((task) => (
                                <Card key={task._id} className="flex flex-col h-full group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-0 overflow-hidden border-none bg-white shadow-card">
                                    {/* Card Header Status Line */}
                                    <div className={`h-1.5 w-full ${
                                        task.status === 'completed' ? 'bg-accent' : 
                                        task.status === 'in-progress' ? 'bg-primary' : 'bg-gray-300'
                                    }`} />
                                    
                                    <div className="p-7 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-primary/10 transition-colors">
                                                <Target size={20} className="text-text-secondary group-hover:text-primary transition-colors" />
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                                                task.status === 'completed' ? 'bg-accent/10 text-accent border-accent/20' : 
                                                task.status === 'in-progress' ? 'bg-primary/10 text-primary border-primary/20' : 
                                                'bg-gray-100 text-gray-500 border-gray-200'
                                            }`}>
                                                {task.status}
                                            </span>
                                        </div>

                                        <h4 className="text-xl font-black text-text-primary mb-3 leading-tight tracking-tight group-hover:text-primary transition-colors">
                                            {task.title}
                                        </h4>
                                        <p className="text-text-secondary text-sm leading-relaxed flex-grow mb-6 line-clamp-4 font-medium">
                                            {task.description}
                                        </p>

                                        <div className="space-y-6 mt-auto">
                                            <div className="flex items-center justify-between pt-6 border-t border-border">
                                                <div className="flex items-center gap-2 text-text-secondary">
                                                    <Calendar size={14} className="text-primary" />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Deadline'}
                                                    </span>
                                                </div>
                                                {task.status === 'in-progress' && (
                                                    <div className="flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Live</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-3">
                                                {task.status !== 'in-progress' && task.status !== 'completed' && (
                                                    <Button 
                                                        onClick={() => handleUpdateStatus(task._id, 'in-progress')}
                                                        className="flex-1 gap-2 font-bold py-3 text-xs uppercase tracking-widest shadow-lg shadow-primary/20"
                                                    >
                                                        <PlayCircle size={16} /> Engage
                                                    </Button>
                                                )}
                                                {task.status !== 'completed' && (
                                                    <Button 
                                                        variant={task.status === 'in-progress' ? 'primary' : 'outline'}
                                                        onClick={() => handleUpdateStatus(task._id, 'completed')}
                                                        className="flex-1 gap-2 font-bold py-3 text-xs uppercase tracking-widest active:scale-95"
                                                    >
                                                        <CheckCircle2 size={16} /> Finalize
                                                        <ArrowRight size={14} className="ml-auto opacity-50" />
                                                    </Button>
                                                )}
                                                {task.status === 'completed' && (
                                                    <div className="w-full py-3 bg-accent/10 border border-accent/20 text-accent rounded-xl text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                                        <ShieldCheck size={16} />
                                                        Mission Accomplished
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EmployeeDashboard;
