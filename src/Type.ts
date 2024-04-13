export type Task = {
  id: number | string;
  text: string;
  edit: boolean;
  locked: boolean;
  disabled: boolean;
  bgColor: string;
}

export type profiles = {
  displayName: string | null | undefined;
  photoURL: any;
}

export type propsTask = {
  uid: string | null | undefined ;
  todos: Task[];
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}

export type start = {
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}
