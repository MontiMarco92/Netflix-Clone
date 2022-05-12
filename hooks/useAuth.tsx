import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { auth } from '../firebase'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //logged in
        setUser(user)
        setLoading(false)
        router.push('/')
      } else {
        //not logged in
        setUser(null)
        setLoading(false)
        router.push('/login')
      }
      setInitialLoading(false)
    })
  }, [auth])

  const signUp = async (email: string, password: string) => {
    setLoading(true)

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(newUser.user)
      router.push('/')
      setLoading(false)
    } catch (err) {
      console.log(err)
      setError('This email has already been registered. Please sign in.')
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then((loggedUser) => {
        setUser(loggedUser.user)
        router.push('/')
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.message)

        if (err.message.includes('user-not-found')) {
          setError(
            "Sorry, we can't find an account with this email address. Please try again or create new account"
          )
        } else if (err.message.includes('wrong-password')) {
          setError(
            'Incorrect password. Please try again or you can reset your password'
          )
        }
        setLoading(false)
      })
      .finally(() => setLoading(false))
  }

  const logOut = async () => {
    setLoading(true)
    await signOut(auth)
      .then(() => {
        setUser(null)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  const memoizedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      logOut,
      loading,
      error,
    }),
    [user, loading]
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
