export interface ITodoList {
  id: number;
  title: string;
  done: boolean;
}

export interface ITabContentList {
  id: number;
  title: string;
  active: boolean;
  content: JSX.Element | null;
}
