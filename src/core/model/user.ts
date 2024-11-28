import { plainToInstance } from 'class-transformer'
import { Model } from './model'

export class PermissonUserClass {
  _shop: Shop
  _functions: Function[]
  _tasks: Task[]

  get shop(): Shop {
    return this._shop
  }

  set shop(shop: Shop) {
    this._shop = plainToInstance(Shop, shop)
  }

  get functions(): Function[] {
    return this._functions
  }

  set functions(functions: Function[]) {
    this._functions = plainToInstance(Function, functions)
  }

  get tasks(): Task[] {
    return this._tasks
  }

  set tasks(tasks: Task[]) {
    this._tasks = plainToInstance(Task, tasks)
  }
}

export class Shop extends Model {
  _name: string
  description: string
  _groups: Group[]
  _users: User[]

  get groups(): Group[] {
    return this._groups
  }

  set groups(groups: Group[]) {
    this._groups = plainToInstance(Group, groups)
  }

  get users(): User[] {
    return this._users
  }

  set users(users: User[]) {
    this._users = plainToInstance(User, users)
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
}

// Group class definition
export class Group extends Model {
  _name: string
  _groupFunctions: GroupFunction[]
  _groupTasks: GroupTask[]

  get groupFunctions(): GroupFunction[] {
    return this._groupFunctions
  }

  set groupFunctions(groupFunctions: GroupFunction[]) {
    this._groupFunctions = plainToInstance(GroupFunction, groupFunctions)
  }

  get groupTasks(): GroupTask[] {
    return this._groupTasks
  }

  set groupTasks(groupTasks: GroupTask[]) {
    this._groupTasks = plainToInstance(GroupTask, groupTasks)
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
}

// User class definition
export class User extends Model {
  role: string
  shopsId: string
  username: string
  picture: string | null
  email: string
  isSuperAdmin: boolean
  isRegistered: boolean
}

// GroupFunction class definition
export class GroupFunction extends Model {
  _name: string
  functionId: string
  groupId: string
  create: boolean
  view: boolean
  update: boolean

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
}

// GroupTask class definition
export class GroupTask extends Model {
  _name: string
  groupId: string
  taskId: string
  shopsId: string

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
}

// Function class definition
export class Function extends Model {
  _name: string

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
}

// Task class definition
export class Task extends Model {
  _name: string
  functionId: string
  description: string

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
}
