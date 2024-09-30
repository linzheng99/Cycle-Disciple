import { Outlet } from "react-router-dom"

function Home() {
  return (
    <div>
      <div>Sphinx of black quartz, judge my vow.</div>
      <Outlet />
    </div>
  )
}

export default Home 
