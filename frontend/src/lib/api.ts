const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Ye line aapke Codespace ke URL ko automatically detect kar legi
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    // Agar frontend 3000 par hai, toh ye usay 8000 (backend) mein badal dega
    const backendHostname = hostname.replace("-3000", "-8000");
    return `${protocol}//${backendHostname}`;
  }
  return "http://localhost:8000";
};

const BASE_URL = getBaseUrl();

export const postChatMessage = async (message: string) => {
  const response = await fetch(`https://solid-eureka-4jq6j59p56753qj7p-8000.app.github.dev/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error("AI Agent se rabta nahi ho saka");
  return response.json(); 
};

export const getTodos = async () => {
  const response = await fetch(`https://solid-eureka-4jq6j59p56753qj7p-8000.app.github.dev/api/todos`);
  if (!response.ok) throw new Error("Tasks load nahi ho sakay");
  return response.json();
};