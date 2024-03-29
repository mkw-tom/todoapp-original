export type Task = {
  id: number;
  text: string;
  edit: boolean;
}

export type propsTask = {
  todos: Task[];
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}