
"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
};

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (task.trim() === "") {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: task.trim(),
    };

    setTasks([...tasks, newTask]);
    setTask("");
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

        <form onSubmit={addTask} className="flex gap-2">
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
            Add Task
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
                  className="rounded-lg border border-gray-200 p-4 text-gray-700"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </main>
  );
}
