import { storage } from './localStorage'
import { User } from './types'

class UserService {
  getUser = () => {
    return storage.getUser()
  }
  saveUser = (user: User) => {
    return storage.saveUser(user)
  }
}

const userService = new UserService()

export default userService
