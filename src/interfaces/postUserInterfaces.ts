export interface UserInterface {
  username: string,
  classe: string,
  level: number,
  password: string,
}

export interface User extends UserInterface {
  id: number
}