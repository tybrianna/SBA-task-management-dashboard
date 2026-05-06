export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type Theme = "light" | "dark";