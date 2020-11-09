/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface Register{
  success: boolean;
  message: string;
  data: RegisterData;
}

export interface RegisterData{
  name: string;
}
