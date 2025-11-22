



export function getUserSession() {
  const token = localStorage.getItem("session_token");
  if (!token) return null;

  try {
    const session = JSON.parse(token);
    if ( !session.name || !session.email || !session.role) return null;
    return session;
  } catch {
    return null;
  }
}
