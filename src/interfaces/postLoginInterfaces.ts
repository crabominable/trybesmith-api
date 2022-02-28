export interface LoginInterface {
  id: number;
  username: string,
}

export interface Login extends LoginInterface {
  password: string,
}