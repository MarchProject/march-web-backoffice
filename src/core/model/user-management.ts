// import { Role } from 'src/types/uam'

import { Model } from './model'

// ชื่อ	Email	เบอร์โทร	ตำแหน่ง
// วันที่อัปเดต
// วันที่สร้าง
// Action
export class Profile {
  firstName: string
  lastName: string
  phone: string
}
export class backofficeUsers {
  groupId: string
  backofficeGroup: {
    name: string
  }
}

export class UserManangement extends Model {
  firstName: string
  username: string
  phone: string
  active: boolean
  role?: string
  profiles: Profile
  backofficeUsers: backofficeUsers[]
}
