
import { useSetTheme, useThemeAtomValue } from "~/hooks/useTheme";

export function ThemeSwitch() {
  const setTheme = useSetTheme();
  const currentTheme = useThemeAtomValue();

  const changeTheme = () => {
    // 切换主题为 'light' 或 'dark'
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <button onClick={changeTheme}>
        {currentTheme === 'light' ? <i className='i-mingcute-sun-fill size-4' /> : <i className='i-mingcute-moon-fill size-4' />}
      </button>
    </>
  );

}
