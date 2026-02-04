"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import AiAssistant from "../../components/AiAssistant";
import TodoList from "../../components/TodoList";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Auth check
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // Ye function tab chale ga jab AI koi naya task banaye ga
  const handleTaskCreated = useCallback(() => {
    console.log("AI Task detected! Updating UI...");
    // RefreshKey change hone se TodoList component dobara 'fetch' kare ga
    setRefreshKey(prev => prev + 1);
  }, []);

  if (loading) return (
    <div className="h-screen bg-black text-white flex items-center justify-center font-mono animate-pulse">
      INITIALIZING WORKSPACE...
    </div>
  );

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
        {/* Top Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white/90">WORKSPACE</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Phase V - AI Task Manager</p>
          </div>
          <div className="text-xs text-gray-400 bg-white/5 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            System: <span className="text-white font-medium">Online</span>
          </div>
        </header>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Todo List - Left Side */}
          <div className="flex-[2] bg-[#0A0A0A] rounded-[2rem] border border-white/5 overflow-y-auto p-6 relative">
            <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Current Tasks</h2>
            {/* Key change hone par TodoList refresh hogi */}
            <TodoList key={refreshKey} />
          </div>

          {/* AI Assistant - Right Side */}
          <div className="flex-[1.2] bg-[#0A0A0A] rounded-[2rem] border border-white/5 relative flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-white/5">
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest text-center">AI Agent Active</h2>
            </div>
            <AiAssistant onTaskCreated={handleTaskCreated} />
          </div>
        </div>
      </main>
    </div>
  );
}