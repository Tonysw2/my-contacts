import { CategoryDTO } from './CategoryDTO'

export type ContactDTO = {
  id: string
  name: string
  email: string
  phone: string
  category: CategoryDTO
}
