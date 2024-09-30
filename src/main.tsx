import "./styles/index.css"

import { Provider } from "jotai"
import * as React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { jotaiStore } from "./lib/jotai"
import { SettingSync } from "./providers/setting-sync"
import { router } from './router'


const $container = document.querySelector("#root") as HTMLElement

ReactDOM.createRoot($container).render(
  <React.StrictMode>
    <Provider store={jotaiStore}>
      <SettingSync />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
