export interface IResponse<T> {
  message: string;
  data: T;
}

export interface IErrorResponse {
  title: string;
  message: string;
  stack?: string;
}
