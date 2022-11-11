import React, { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { User } from '../services/types'
import { noop } from '../utils'
import userService from '../services/UserService'

interface Props {
  user: User | null
  login: (user: User) => void
}

const defaultValue: Props = {
  user: null,
  login: noop,
}

export const UserContext = createContext<Props>(defaultValue)

const UserProvider = (props: PropsWithChildren) => {
  const initialUser = useMemo(() => userService.getUser(), [])
  const [user, setUser] = useState<User | null>(initialUser)

  const login = useCallback((loginUser: User) => {
    setUser(loginUser)
    userService.saveUser(loginUser)
  }, [])

  const value = useMemo(() => {
    return {
      login,
      user,
    }
  }, [login, user])

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}

export default UserProvider
