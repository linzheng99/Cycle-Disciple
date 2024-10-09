import { Link } from "react-router-dom";

export function Menu() {
  const params = {
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    response_type: import.meta.env.VITE_RESPONSE_TYPE,
    approval_prompt: import.meta.env.VITE_APPROVAL_PROMPT,
    scope: import.meta.env.VITE_SCOPE,
  }
  const authStrava = () => {
    const url = `https://www.strava.com/oauth/authorize?${new URLSearchParams(params).toString()}`
    window.location.href = url
  }
  return (
    <nav className="flex items-center gap-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/activity">Activity</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={authStrava}>connect strava</button>
    </nav>
  )
}
