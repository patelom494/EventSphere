import React, { useState } from 'react';
import { login, register } from '../api';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, User, Briefcase, ChevronRight, Target } from 'lucide-react';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import Card from '../components/ui/Card';
import hero from '../assets/hero.png';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { loginUser } = useAuth();

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            if (isLogin) {
                const { data } = await login(email, password);
                loginUser(data);
            } else {
                const { data } = await register({ name, email, password, role });
                loginUser(data);
            }
        } catch (err) {
            setError(err.response?.data?.message || `An error occurred during ${isLogin ? 'login' : 'registration'}.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-background font-sans">
            {/* Left Panel: Feature Highlight */}
            <div className="hidden lg:flex w-7/12 items-center justify-center bg-secondary p-12 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary rounded-full blur-[120px]" />
                    <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-primary rounded-full blur-[150px]" />
                </div>

                <div className="w-full max-w-2xl text-center z-10 animate-in fade-in zoom-in duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-8">
                        <Target size={16} />
                        Next-Gen Task Management
                    </div>
                    <img src={hero} alt="Task Management" className="w-full h-auto drop-shadow-[0_20px_50px_rgba(37,99,235,0.2)] mb-12 transform hover:scale-[1.02] transition-transform duration-500" />
                    <h1 className="text-5xl font-black text-white leading-tight mb-6">
                        Execute missions with <span className="text-primary underline decoration-primary/30 underline-offset-8">surgical precision.</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
                        The ultimate command center for modern teams to strategize, deploy, and conquer complex objectives.
                    </p>
                </div>
            </div>

            {/* Right Panel: Auth Form */}
            <div className="w-full lg:w-5/12 flex items-center justify-center p-6 md:p-12 animate-in fade-in slide-in-from-right-4 duration-700">
                <Card className="max-w-md w-full p-8 md:p-10 border-none shadow-card hover:shadow-2xl transition-all duration-500">
                    <div className="flex justify-center mb-10">
                        <div className="w-16 h-16 bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center justify-center">
                            <Target className="text-primary w-full h-full" />
                        </div>
                    </div>

                    <div className="space-y-2 mb-10 text-center">
                        <h2 className="text-3xl font-black text-text-primary tracking-tight">
                            {isLogin ? 'Access Hub' : 'Join Mission Hub'}
                        </h2>
                        <p className="text-text-secondary font-medium">
                            {isLogin ? 'Welcome back, operative. Please authenticate.' : 'Initialize your field profile to get started.'}
                        </p>
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-8 text-sm font-semibold flex items-center gap-3 animate-in shake duration-500">
                            <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-xs">!</span>
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <InputField 
                                label="Full Name" 
                                icon={User} 
                                placeholder="Operative Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        )}
                        <InputField 
                            label="Email Terminal" 
                            type="email" 
                            icon={Mail} 
                            placeholder="operative@missionhub.io" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <InputField 
                            label="Security Key" 
                            type="password" 
                            icon={Lock} 
                            placeholder="••••••••" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-text-primary ml-1 flex items-center gap-2">
                                    <Briefcase size={16} className="text-primary" />
                                    Deployment Role
                                </label>
                                <select 
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 appearance-none font-medium cursor-pointer"
                                    value={role} 
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="employee">Field Operative (Employee)</option>
                                    <option value="admin">Command Center (Admin)</option>
                                </select>
                            </div>
                        )}
                        
                        <Button 
                            type="submit" 
                            className="w-full py-4 text-base font-bold shadow-lg shadow-primary/20 active:scale-[0.98]"
                            isLoading={isLoading}
                        >
                            {isLogin ? 'Initiate Access' : 'Register Profile'}
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-border">
                        <p className="text-center text-sm font-medium text-text-secondary">
                            {isLogin ? "New operative?" : "Existing operative?"}
                            <button 
                                onClick={() => setIsLogin(!isLogin)} 
                                className="ml-2 text-primary font-bold hover:underline underline-offset-4 decoration-2 transition-all"
                            >
                                {isLogin ? 'Request Profile' : 'Access Hub'}
                            </button>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AuthPage;
