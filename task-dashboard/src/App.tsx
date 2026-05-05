import React, { useState, useMemo } from "react";
import { Task } from "./types";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./styles.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "alphabetical">("newest");

  // Add task
  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Delete task
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Toggle task status
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter + Sort
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) =>
      task.text.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortBy) {
      case "newest":
        return filtered.sort((a, b) => b.createdAt - a.createdAt);
      case "oldest":
        return filtered.sort((a, b) => a.createdAt - b.createdAt);
      case "alphabetical":
        return filtered.sort((a, b) => a.text.localeCompare(b.text));
      default:
        return filtered;
    }
  }, [tasks, search, sortBy]);

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <TaskInput onAdd={addTask} />

      <div className="controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alphabetical">A-Z</option>
        </select>
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </div>
  );
};

export default App;