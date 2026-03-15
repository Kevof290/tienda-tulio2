import { createContext, useState, useContext, useEffect, children} from 'react'

const AuthContext = createContext()
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect (() => {
        const savedToken = sessionStorage.getItem('token')
        const savedUser = sessionStorage.getItem('user')

        if (savedToken && savedUser) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
        }
    }, [])

    const login = (userData, jwt) => {
        setUser(userData)
        setToken(jwt)
        sessionStorage.setItem('token', jwt)
        sessionStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
    }

    return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)