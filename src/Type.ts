export type Task = {
  id: number;
  text: string;
  edit: boolean;
}

export type propsTask = {
  uid: string | number;
  todos: Task[];
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}
