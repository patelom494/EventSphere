import React, { useState, useEffect } from 'react';
import { getTasks, getEmployees, createTask } from '../api';
import DashboardLayout from '../layouts/DashboardLayout';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';
import { 
  Plus, 
  Users, 
  Target, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Calendar,
  MoreVertical,
  ArrowUpRight,
  UserPlus
} from 'lucide-react';

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: '',
    });

    const fetchData = async () => {
        try {
            const [tasksData, employeesData] = await Promise.all([getTasks(), getEmployees()]);
            setTasks(tasksData.data);
            setEmployees(employeesData.data);
        } catch (err) {
            setError('Strategic data retrieval failed. System offline.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await createTask(newTask);
            setNewTask({ title: '', description: '', assignedTo: '', dueDate: '' });
            fetchData();
        } catch (err) {
            setError('Mission deployment failed. Verify parameters.');
        }
    };

    if (loading) return <Loader fullScreen />;

    const stats = [
        { label: 'Total Operations', value: tasks.length, icon: Target, color: 'bg-primary' },
        { label: 'Active Personnel', value: employees.length, icon: Users, color: 'bg-secondary' },
        { label: 'Successful Missions', value: tasks.filter(t => t.status === 'completed').length, icon: CheckCircle2, color: 'bg-accent' },
    ];

    return (
        <DashboardLayout role="admin">
            <div className="space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-4xl font-black text-text-primary tracking-tight mb-2">Command Center</h2>
                        <p className="text-text-secondary font-medium">Strategic overview of all global operations and personnel.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <Card key={i} className="group hover:border-primary/30 transition-all duration-300">
                            <div className="flex items-start justify-between">
                                <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg shadow-current/10`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-accent text-xs font-bold flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-full">
                                    <ArrowUpRight size={12} />
                                    12%
                                </span>
                            </div>
                            <div className="mt-6">
                                <p className="text-text-secondary text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                                <p className="text-4xl font-black text-text-primary mt-1 tracking-tight">{stat.value}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create Task Form */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 border-none shadow-card">
                            <h3 className="text-xl font-black text-text-primary mb-6 flex items-center gap-2">
                                <Target className="text-primary" />
                                Deploy Mission
                            </h3>
                            <form onSubmit={handleCreateTask} className="space-y-5">
                                <InputField 
                                    label="Mission Title" 
                                    placeholder="Operation Phoenix..."
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    required
                                />
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-text-primary ml-1">Assign Operative</label>
                                    <select 
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 appearance-none font-medium"
                                        value={newTask.assignedTo}
                                        onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Personnel</option>
                                        {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-text-primary ml-1">Mission Briefing</label>
                                    <textarea 
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 min-h-[120px] resize-none"
                                        placeholder="Outline mission objectives..."
                                        value={newTask.description}
                                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <InputField 
                                    label="Deadline" 
                                    type="date"
                                    icon={Calendar}
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                    required
                                />
                                <Button type="submit" className="w-full py-4 font-bold shadow-lg shadow-primary/20">
                                    Confirm Deployment
                                </Button>
                            </form>
                        </Card>
                    </div>

                    {/* Mission List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-text-primary tracking-tight">Active Missions</h3>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Real-time Feed</span>
                            </div>
                        </div>

                        {tasks.length === 0 ? (
                            <Card variant="ghost" className="border-dashed border-2 py-20 text-center">
                                <AlertCircle size={48} className="mx-auto text-border mb-4" />
                                <p className="text-text-secondary font-bold text-lg">No active missions detected.</p>
                                <p className="text-sm text-text-secondary">Initiate a deployment to begin operations.</p>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {tasks.map((task) => (
                                    <Card key={task._id} className="group hover:border-primary/20 transition-all duration-300 p-5">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                                                    task.status === 'completed' ? 'bg-accent shadow-accent/20' : 
                                                    task.status === 'in-progress' ? 'bg-primary shadow-primary/20' : 'bg-gray-400'
                                                }`}>
                                                    <Target size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors">{task.title}</h4>
                                                    <p className="text-xs text-text-secondary font-semibold uppercase tracking-widest mt-1">
                                                        Operative: <span className="text-text-primary">{task.assignedTo?.name}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end gap-6">
                                                <div className="text-right">
                                                    <div className="flex items-center gap-1.5 text-text-secondary mb-1">
                                                        <Clock size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-wider">
                                                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Deadline'}
                                                        </span>
                                                    </div>
                                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                        task.status === 'completed' ? 'bg-accent/10 text-accent border-accent/20' : 
                                                        task.status === 'in-progress' ? 'bg-primary/10 text-primary border-primary/20' : 
                                                        'bg-gray-100 text-gray-500 border-gray-200'
                                                    }`}>
                                                        {task.status}
                                                    </span>
                                                </div>
                                                <button className="p-2 hover:bg-background rounded-xl transition-colors">
                                                    <MoreVertical size={20} className="text-text-secondary" />
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
