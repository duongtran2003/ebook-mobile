import { useState, useCallback, useEffect } from 'react'
import { getAccessToken, removeAccessToken, setAccessToken } from 'src/utils/storage'

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const checkToken = async () => {
      const token = await getAccessToken();
      setIsLoggedIn(!!token)
    }

    checkToken()
  }, [])

  const login = useCallback(async (token: string) => {
    await setAccessToken(token)
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(async () => {
    await removeAccessToken()
    setIsLoggedIn(false)
  }, [])

  return {
    isLoggedIn,
    login,
    logout
  }
}
