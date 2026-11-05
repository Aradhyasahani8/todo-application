
"use client";

import { Donegal_One } from "next/font/google";
import { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
};
type Filter = "All" | "Active" | "Completed";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
 const [isLoaded, setIsLoaded] = useState(false);
 const [dueDate, setDueDate] = useState("");

useEffect(() => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    try {
      setTasks(JSON.parse(savedTasks));
    } catch {
      console.error("Unable to load saved tasks.");
    }
  }

  setIsLoaded(true);
}, []);

useEffect(() => {
  if (isLoaded) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}, [tasks, isLoaded]);

  const [filter, setFilter] = useState<Filter>("All");

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (task.trim() === "") {
      return;
    }

    const newTask: Task = {
  id: Date.now(),
  title: task.trim(),
  completed: false,
  dueDate: dueDate || undefined,
};

        setTasks([...tasks, newTask]);
    setTask("");
    setDueDate("");
  }

  function updateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (task.trim() === "") {
      return;
    }

    setTasks(
      tasks.map((item) =>
        item.id === editingId
          ? {
    ...item,
    title: task.trim(),
    dueDate: dueDate || undefined,
  }
          : item
      )
    );

    setTask("");
    setDueDate("");
    setEditingId(null);
  }

  const filteredTasks = tasks.filter((item) => {
  if (filter === "Active") {
    return !item.completed;
  }

  if (filter === "Completed") {
    return item.completed;
  }

  return true;
});

const totalTasks = tasks.length;

const activeTasks = tasks.filter(
  (item) => !item.completed
).length;

const completedTasks = tasks.filter(
  (item) => item.completed
).length;

const today = new Date();

const localToday = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          My Todo Application
        </h1>

        <p className="mb-6 text-gray-500">
          Manage your daily tasks easily.
        </p>

        {/* Task Counter Dashboard */}
<div className="mb-6 grid grid-cols-3 gap-3">

  {/* Total Tasks */}
  <div className="rounded-lg bg-blue-50 p-4 text-center">
    <h2 className="text-2xl font-bold text-blue-600">
      {totalTasks}
    </h2>
    <p className="text-sm text-gray-600">
      Total Tasks
    </p>
  </div>

  {/* Active Tasks */}
  <div className="rounded-lg bg-yellow-50 p-4 text-center">
    <h2 className="text-2xl font-bold text-yellow-600">
      {activeTasks}
    </h2>
    <p className="text-sm text-gray-600">
      Active
    </p>
  </div>

  {/* Completed Tasks */}
  <div className="rounded-lg bg-green-50 p-4 text-center">
    <h2 className="text-2xl font-bold text-green-600">
      {completedTasks}
    </h2>
    <p className="text-sm text-gray-600">
      Completed
    </p>
  </div>

</div>

        <form
  onSubmit={editingId !== null ? updateTask : addTask}
  className="flex gap-2"
>
          <div className="flex flex-1 gap-2">
  <input
    type="text"
    placeholder="Enter your task..."
    value={task}
    onChange={(event) => setTask(event.target.value)}
    className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-blue-500"
  />

  <input
    type="date"
    value={dueDate}
    onChange={(event) => setDueDate(event.target.value)}
    className="rounded-lg border border-gray-300 px-3 py-3 text-gray-700"
  />
</div>

          <button
  type="submit"
  className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
>
  {editingId !== null ? "Update Task" : "Add Task"}
</button>
        </form>

{/* Task Filter Buttons */}
<div className="mt-6 flex gap-2">
  {(["All", "Active", "Completed"] as Filter[]).map((option) => (
    <button
      key={option}
      type="button"
      onClick={() => setFilter(option)}
      className={`rounded-lg px-4 py-2 ${
        filter === option
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {option}
    </button>
  ))}
</div>

<div className="mt-6">
  <h2 className="mb-3 text-lg font-semibold text-gray-700">
    My Tasks ({tasks.length})
  </h2>

          {tasks.length === 0 ? (
            <p className="text-gray-400">
              No tasks yet. Add your first task!
            </p>
          ) : (
            <ul className="space-y-3">
              {filteredTasks.map((item) => (
               <li
  key={item.id}
  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 text-gray-700"
>
  <div className="flex items-center gap-3">
    <input
      type="checkbox"
      checked={item.completed}
      onChange={() =>
        setTasks(
          tasks.map((task) =>
            task.id === item.id
              ? { ...task, completed: !task.completed }
              : task
          )
        )
      }
    />

    <span className={item.completed ? "line-through text-gray-400" : ""}>
      {item.title}
    </span>
    {item.dueDate && (
  <span
    className={
      !item.completed && item.dueDate < localToday
        ? "text-xs font-medium text-red-600"
        : "text-xs text-gray-500"
    }
  >
    Due: {item.dueDate}
    {!item.completed && item.dueDate < localToday && " (Overdue)"}
  </span>
)}
  </div>

  <div className="flex gap-3">
  <button
    onClick={() => {
       setTask(item.title);
       setDueDate(item.dueDate ?? "");
       setEditingId(item.id);
    }}
    className="text-blue-500 hover:text-blue-700"
  >
    Edit
  </button>

  <button
    onClick={() =>
      setTasks(tasks.filter((task) => task.id !== item.id))
    }
    className="text-red-500 hover:text-red-700"
  >
    Delete
  </button>
</div>
</li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </main>
  );
}
