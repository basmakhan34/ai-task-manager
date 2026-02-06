"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";

export default function TodoList() {
  const [todos, setTodos] = useState<any[]>([]);

  // FIXED: Ab ye URL Vercel ki environment variables se uthaye ga
  // Agar variable nahi mila, toh ye Hugging Face ka direct link use kare ga
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://basmakhan34-ai-expert-backend.hf.space";

  const fetchTasks = async () => {
    try {
      console.log("Fetching tasks from:", BASE_URL);
      const res = await fetch(`${BASE_URL}/todos`);
      
      if (!res.ok) throw new Error("Network response was not ok");
      
      const data = await res.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setTodos([]); 
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTodos(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleToggle = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus }),
      });
      
      if (res.ok) {
        setTodos(prev => prev.map(t => 
          t.id === id ? { ...t, completed: !currentStatus } : t
        ));
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  if (!Array.isArray(todos) || todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 space-y-2">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm font-mono">CONNECTING TO DATABASE...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {todos.map((todo) => (
        <div 
          key={todo.id} 
          className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl group transition-all hover:bg-white/[0.08]"
        >
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleToggle(todo.id, todo.completed)}>
            {todo.completed ? (
              <CheckCircle2 className="text-green-500 animate-in zoom-in duration-300" size={24} />
            ) : (
              <Circle className="text-gray-600 group-hover:text-gray-400" size={24} />
            )}
            <span className={`text-lg transition-all ${todo.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
              {todo.task}
            </span>
          </div>

          <button 
            onClick={() => handleDelete(todo.id)}
            className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}