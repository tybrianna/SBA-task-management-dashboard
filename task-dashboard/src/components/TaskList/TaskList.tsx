import React from "react";
import { Task } from "../../types";
import TaskItem from "../TaskItem";

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onDelete, onToggle }) => {
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};

export default TaskList;