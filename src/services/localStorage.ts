import { ColumnEntity, DashboardEntity, CardEntity, User } from './types'

const USER = 'USER'
const DASHBOARD = 'DASHBOARD'

const toInvestigate: CardEntity[] = [
  {
    id: 0,
    columnId: 0,
    text: 'Example of card',
    description: 'Example of description',
    comments: [
      {
        userId: 0,
        text: 'Example of comment',
      },
    ],
  },
]

const columns: ColumnEntity[] = [
  {
    id: 0,
    name: 'Todo',
    cards: toInvestigate,
  },
  {
    id: 1,
    name: 'In Progress',
    cards: [],
  },
  {
    id: 2,
    name: 'Testing',
    cards: [],
  },
  {
    id: 3,
    name: 'Done',
    cards: [],
  },
]

const initialState = {
  name: 'Dashboard',
  columns,
}

type Storage = () => {
  getUser: () => User | null
  saveUser: (user: User) => void
  getDashboard: () => DashboardEntity
  saveDashboard: (dashboard: DashboardEntity) => void
}

const initLocalStorage: Storage = () => {
  const getUser = (): User | null => {
    try {
      if (localStorage && localStorage.getItem) {
        const savedData = localStorage.getItem(USER)
        if (savedData) {
          return JSON.parse(savedData) as User
        }
      }
    } catch (e) {
      return null
    }
    return null
  }

  const saveUser = (user: User) => {
    if (localStorage && localStorage.setItem) {
      try {
        localStorage.setItem(USER, JSON.stringify(user))
      } catch (e) {
        console.warn(e)
      }
    }
  }

  const getDashboard = (): DashboardEntity => {
    try {
      if (localStorage && localStorage.getItem) {
        const savedData = localStorage.getItem(DASHBOARD)
        if (savedData) {
          return JSON.parse(savedData) || []
        }
      }
    } catch (e) {
      return {
        name: '',
        columns: [],
      }
    }
    return initialState
  }

  const saveDashboard = (dashboard: DashboardEntity) => {
    if (localStorage && localStorage.setItem) {
      try {
        localStorage.setItem(DASHBOARD, JSON.stringify(dashboard))
      } catch (e) {
        console.warn(e)
      }
    }
  }

  return {
    getUser,
    saveUser,
    getDashboard,
    saveDashboard,
  }
}

export const storage = initLocalStorage()
