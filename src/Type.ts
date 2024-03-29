export type Task = {
  id: number;
  text: string;
  edit: boolean;
}

export type propsAddForm = {
  todos: Task[];
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}