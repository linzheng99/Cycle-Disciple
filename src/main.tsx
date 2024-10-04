import "./styles/index.css"

import { Provider } from "jotai"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { jotaiStore } from "./lib/jotai"
import { SettingSync } from "./providers/setting-sync"
import { router } from './routes'


const $container = document.querySelector("#root") as HTMLElement

ReactDOM.createRoot($container).render(
  <Provider store={jotaiStore}>
    <SettingSync />
    <RouterProvider router={router} />
  </Provider>
)
