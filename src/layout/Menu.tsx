import { Link } from "react-router-dom";

export function Menu() {
  return (
    <nav className="flex items-center gap-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/activity">Activity</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  )
}
