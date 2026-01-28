"use client";

import React, { useState } from "react";
import TagInput from "./TagInput";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string; // YYYY-MM-DD
  priority: number; // 1-5
  tags: string[];
};

type Props = {
  onAdd: (task: Task) => void;
};

const TaskForm: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<number>(3);
  const [tags, setTags] = useState<string[]>([]);

  const reset = () => {
    setText("");
    setDueDate("");
    setPriority(3);
    setTags([]);
  };

  const uid = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;

    const task: Task = {
      id: uid(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate || undefined,
      priority,
      tags,
    };

    onAdd(task);
    reset();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="タスクを入力"
        aria-label="task text"
        style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
      />

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          期限:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{ padding: 6, borderRadius: 6, border: "1px solid #d1d5db" }}
          />
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          優先度:
          <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>

      <TagInput tags={tags} setTags={setTags} />

      <div>
        <button type="submit" style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}>
          追加
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
