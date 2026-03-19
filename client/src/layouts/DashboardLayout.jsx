import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  Users, 
  CheckCircle2, 
  Clock, 
  Target,
  User as UserIcon,
  Bell
} from 'lucide-react';
import Button from '../components/ui/Button';

const DashboardLayout = ({ children, role }) => {
  const { logout, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = role === 'admin' ? [
    { name: 'Overview', icon: LayoutDashboard, href: '/admin' },
    { name: 'Team Management', icon: Users, href: '/admin' },
    { name: 'Live Operations', icon: Target, href: '/admin' },
  ] : [
    { name: 'My Missions', icon: Target, href: '/employee' },
    { name: 'Accomplishments', icon: CheckCircle2, href: '/employee' },
    { name: 'Deadlines', icon: Clock, href: '/employee' },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 bottom-0 w-64 bg-secondary text-white z-50 
          transform transition-transform duration-300 lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          border-r border-white/5 flex flex-col shadow-2xl
        `}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Target className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">Mission Hub</span>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-white/5 hover:text-white text-gray-400 active:scale-[0.98]"
            >
              <item.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
              {item.name}
            </a>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center text-primary font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{role}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-gray-400 hover:text-red-400 hover:bg-red-400/10 justify-start gap-3"
            onClick={logout}
          >
            <LogOut size={18} />
            <span className="text-sm font-semibold">Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border p-4 md:px-8 flex items-center justify-between">
          <button 
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex-1 px-4 hidden sm:block">
            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="Search missions..." 
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl hover:bg-gray-100 text-text-secondary relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
            </button>
            <div className="h-8 w-[1px] bg-border mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-text-primary">{user?.name}</p>
                <p className="text-[10px] font-black uppercase text-text-secondary tracking-widest">{role} Node</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 text-red-600 hover:bg-red-50 border-red-100"
                onClick={logout}
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Log out</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
