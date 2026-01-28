"use client";

import React, { useState } from "react";
import TaskForm, { Task } from "../components/TaskForm";
import TaskList from "../components/TaskList";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>TODO アプリ</h1>

      <section style={{ marginTop: 16 }}>
        <h2>タスク追加</h2>
        <TaskForm onAdd={handleAdd} />
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>タスク一覧</h2>
        <TaskList tasks={tasks} />
      </section>
    </main>
  );
};

export default HomePage;
