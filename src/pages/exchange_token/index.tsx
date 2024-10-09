import { ofetch } from "ofetch";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { setLocalStorage } from "~/lib/local";
import { buildUserInfo , useUserStore } from "~/store";

export function ExchangeToken() {
  const [search] = useSearchParams();
  const store = useUserStore()
  const navigate = useNavigate()
  const code = search.get('code')

  const getToken = async () => {
    const { access_token, refresh_token, athlete } = await ofetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      body: {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      }
    })
    store.setUser(buildUserInfo(athlete))

    setLocalStorage('access_token', access_token)
    setLocalStorage('refresh_token', refresh_token)
    return { access_token, refresh_token }
  }

  useEffect(() => {
    if (code) {
      getToken()
      navigate('/dashboard')
    }
  }, [code]);

  return (
    <div>
      <h1>Exchange Token: {code}</h1>
    </div>
  )
}
