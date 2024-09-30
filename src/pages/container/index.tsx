import { useEffect } from 'react';

import { useSetTheme, useThemeAtomValue } from '~/hooks/useTheme'

function Container() {
  const setTheme = useSetTheme();
  const currentTheme = useThemeAtomValue();

  useEffect(() => {
  }, [currentTheme]);

  const changeTheme = () => {
    // 切换主题为 'light' 或 'dark'
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <div>当前主题: {currentTheme}</div>
      <button onClick={changeTheme}>切换主题</button>
    </div>
  );
}

export default Container 
