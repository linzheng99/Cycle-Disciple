import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="h-screen overflow-y-auto bg-theme-background">
      <div>other</div>
      <Outlet />
    </div>
  )
}

export default App
