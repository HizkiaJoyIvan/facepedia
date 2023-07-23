import { createContext, useState } from 'react'

interface AuthContextValue {
    userId: string
    setUserId: React.Dispatch<React.SetStateAction<string>>
}
  
export const AuthContext = createContext<AuthContextValue>({
    userId: '1',
    setUserId: () => {},
})


interface AuthContextProps {
    children: React.ReactElement
}

export const AuthContextProvider:React.FC<AuthContextProps> = ({ children }) => {
  const [userId, setUserId] = useState<string>('')


  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  )
}
