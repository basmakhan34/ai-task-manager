"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";

export default function TodoList() {
  const [todos, setTodos] = useState<any[]>([]);
  // ZAROORI: Apna lamba URL yahan aik hi baar set karein
  const BASE_URL = "https://solid-eureka-4jq6j59p56753qj7p-8000.app.github.dev";

  const fetchTasks = async () => {
    try {
      // Backend route /todos hai, /api/todos nahi
      const res = await fetch(`${BASE_URL}/todos`);
      const data = await res.json();
      // Safety Check: Sirf tab set karein agar data array ho
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setTodos([]); // Error par khali list set karein taake crash na ho
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
    return <div className="text-gray-500 text-center mt-20">No tasks found.</div>;
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