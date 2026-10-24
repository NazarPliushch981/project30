import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function StudyReminder() {
  const [text, setText] = useState("");
  const [seconds, setSeconds] = useState("");
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const timeInMs = Number(seconds) * 1000;

    if (!text || isNaN(timeInMs) || timeInMs <= 0) {
      toast.error("Введіть текст час!");
      return;
    }

    toast.success(`Таймер встановлено ${seconds}`);

    timerRef.current = window.setTimeout(() => {
      toast(text, { icon: '⏰', duration: 5000 });
    }, timeInMs);
  };

  const cancelTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      toast("Таймер скасовано!", { icon: '❌' });
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "300px" }}>
      <Toaster position="top-right" />
      <h3>Нагадування про навчання</h3>
      
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Текст нагадування"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Секунди"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <button onClick={startTimer} style={{ marginRight: "5px", padding: "5px 10px" }}>
        Встановити таймер
      </button>

      <button onClick={cancelTimer} style={{ padding: "5px 10px", background: "#ff4d4d", color: "white", border: "none" }}>
        Скасувати
      </button>
    </div>
  );
}
