export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface INote {
  id: string;
  title: string;
  todos: ITodo[];
}