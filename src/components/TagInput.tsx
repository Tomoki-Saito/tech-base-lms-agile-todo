"use client";

import React, { useState, KeyboardEvent } from "react";

type Props = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

const TagInput: React.FC<Props> = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const addTag = (value: string) => {
    const tag = value.trim();
    if (!tag) return;
    if (tags.includes(tag)) return;
    setTags([...tags, tag]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
      setInput("");
    } else if (e.key === "Backspace" && input === "") {
      setTags(tags.slice(0, -1));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {tags.map((t, i) => (
          <span
            key={t + i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 8px",
              background: "#e5e7eb",
              borderRadius: 16,
              fontSize: 12,
            }}
          >
            {t}
            <button
              type="button"
              onClick={() => setTags(tags.filter((x) => x !== t))}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="タグを入力して Enter で追加"
        aria-label="tags"
        style={{ padding: 8, borderRadius: 6, border: "1px solid #d1d5db" }}
      />
    </div>
  );
};

export default TagInput;
