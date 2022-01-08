export interface ITodoList {
  id: string;
  title: string;
  done: boolean;
}

export interface ITabContentList {
  id: number;
  title: string;
  active: boolean;
  content: JSX.Element | null;
}

export interface IAuth {
  message: string;
  token: string;
  user: string;
}

export interface IResponsesAuth {
  config: object;
  data: IAuth;
  header: object;
  request: object;
  status: number;
  statusText: string;
}
