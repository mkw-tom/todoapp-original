export type Task = {
  id: number | string;
  text: string;
  edit: boolean;
}

export type propsTask = {
  uid: string | number;
  todos: Task[];
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}
