import { Outlet } from 'react-router-dom';

import { Header } from './layout/Header';

function App() {
  return (
    <div className="flex h-screen flex-col overflow-y-auto bg-theme-background">
      <Header />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App
