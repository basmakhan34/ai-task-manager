const BASE_URL = "https://ai-expert-basma-backend-app.hf.space";

export const postChatMessage = async (message: string) => {
  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) {
    throw new Error("AI Agent se rabta nahi ho saka");
  }
  return response.json();
};

export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}/api/todos`);
  if (!response.ok) {
    throw new Error("Tasks load nahi ho sakay");
  }
  return response.json();
};

export const createTodo = async (title: string) => {
  const response = await fetch(`${BASE_URL}/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!response.ok) {
    throw new Error("Task create nahi ho saka");
  }
  return response.json();
};

export const toggleTodo = async (id: number, completed: boolean) => {
  const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });
  if (!response.ok) {
    throw new Error("Task update nahi ho saka");
  }
  return response.json();
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Task delete nahi ho saka");
  }
  return response.json();
};