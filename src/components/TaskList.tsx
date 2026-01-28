"use client";

import React from "react";
import type { Task } from "./TaskForm";

type Props = {
  tasks: Task[];
};

const TaskList: React.FC<Props> = ({ tasks }) => {
  if (tasks.length === 0) return <p>タスクがありません</p>;

  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: 8, padding: 0, listStyle: "none" }}>
      {tasks.map((t) => (
        <li
          key={t.id}
          style={{
            padding: 12,
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 600 }}>{t.text}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>優先度: {t.priority}</div>
          </div>
          <div style={{ fontSize: 13, color: "#374151" }}>期限: {t.dueDate ?? "未設定"}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {t.tags.map((tag, i) => (
              <span
                key={tag + i}
                style={{ background: "#eef2ff", padding: "4px 8px", borderRadius: 12, fontSize: 12 }}
              >
                {tag}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
