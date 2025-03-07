// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/navigation'

// ** Types
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constant/constant'
import Cookies from 'js-cookie'
import { UserType } from '@/types/userTypes'
import { AuthValuesType } from '@/types/authTypes'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setLoading(true)
      const user = localStorage?.getItem('userData')
      if (user) {
        const userStringfy = JSON.stringify(user)
        const userDataJSON = JSON.parse(userStringfy)
        setUser(userDataJSON)
        setLoading(false)
      } else {
        localStorage.removeItem('userData')
        Cookies.remove(ACCESS_TOKEN_KEY)
        Cookies.remove(REFRESH_TOKEN_KEY)
        setUser(null)
        setLoading(false)
      }
    }

    // initAuth()

    const initMock = () => {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          uid: 'test-user-id',
          email: 'mock@user.com',
          emailVerified: true,
          role: 'super_admin'
        })
      )
      localStorage.setItem('auth-warning-alert', 'true')
      localStorage.setItem('isWeb3Auth', 'true')
      localStorage.setItem('country', 'true')
      localStorage.setItem('isWeb3AuthFlow', 'true')
      Cookies.set('session', 'mock-session')
      initAuth()
    }
    initMock()
  }, [])

  const handleLogout = async () => {
    setUser(null)
    Cookies.remove(ACCESS_TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
    window.localStorage.removeItem('userData')
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
