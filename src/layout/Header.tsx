import { ThemeSwitch } from "~/components/ThemeSwitch";

import { Menu } from "./Menu";
import { User } from "./User";

export function Header() {
  return (
    <header className="flex h-16 items-center border-b px-4">
      <Menu />
      <div className="ml-auto flex items-center space-x-4">
        <ThemeSwitch />
        <User />
      </div>
    </header>
  )
}
