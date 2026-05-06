import React, { useState, useMemo } from "react";
import type { Task, Theme } from "./types";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./styles.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "alphabetical">("newest");
  const [theme, setTheme] = useState<Theme>("light");

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

  // Toggle status
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Reorder tasks (drag & drop)
  const reorderTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter((task) =>
      task.text.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortBy) {
      case "newest":
        return [...filtered].sort((a, b) => b.createdAt - a.createdAt);
      case "oldest":
        return [...filtered].sort((a, b) => a.createdAt - b.createdAt);
      case "alphabetical":
        return [...filtered].sort((a, b) => a.text.localeCompare(b.text));
      default:
        return filtered;
    }
  }, [tasks, search, sortBy]);

  return (
    <div className={`container ${theme}`}>
      <h1>Task Manager</h1>

      {/* Theme Toggle */}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <TaskInput onAdd={addTask} theme={theme} />

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
        onReorder={reorderTasks}
        theme={theme}
      />
    </div>
  );
};

export default App;