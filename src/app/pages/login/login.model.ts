export interface LoginModelRequest {
  token: string,
  userName: string,
  userPassword : string
}

export interface LoginModelResponse {
  userName: string,
  userPassword : string
}
