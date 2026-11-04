
"use client";

import { Donegal_One } from "next/font/google";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (task.trim() === "") {
      return;
    }

    const newTask: Task = {
  id: Date.now(),
  title: task.trim(),
  completed: false,
};

        setTasks([...tasks, newTask]);
    setTask("");
  }

  function updateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (task.trim() === "") {
      return;
    }

    setTasks(
      tasks.map((item) =>
        item.id === editingId
          ? { ...item, title: task.trim() }
          : item
      )
    );

    setTask("");
    setEditingId(null);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          My Todo Application
        </h1>

        <p className="mb-6 text-gray-500">
          Manage your daily tasks easily.
        </p>

        <form
  onSubmit={editingId !== null ? updateTask : addTask}
  className="flex gap-2"
>
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(event) => setTask(event.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-blue-500"
          />

          <button
  type="submit"
  className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
>
  {editingId !== null ? "Update Task" : "Add Task"}
</button>
        </form>

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
              {tasks.map((item) => (
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
  </div>

  <div className="flex gap-3">
  <button
    onClick={() => {
      setTask(item.title);
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
