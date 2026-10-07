import { useState } from "react";
import "./Chat.css";

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "flowly",
      text: "Sveiki! Kuo galiu padėti?",
    },
  ]);

  function handleSubmit(event) {
    event.preventDefault();

    const text = message.trim();
    if (!text) return;

    const userMessage = {
      id: Date.now(),
      author: "user",
      text,
    };

    const reply = {
      id: Date.now() + 1,
      author: "flowly",
      text: "Ačiū, žinutę gavau.",
    };

    setMessages((currentMessages) => [...currentMessages, userMessage, reply]);
    setMessage("");
  }

  return (
    <div className={`chat${isOpen ? " chat--open" : ""}`}>
      {isOpen && (
        <section className="chat__panel" aria-label="Pokalbis">
          <header className="chat__header">
            <div>
              <h2>Pokalbis</h2>
              <p>Parašykite žinutę</p>
            </div>

            <button
              type="button"
              className="chat__close"
              onClick={() => setIsOpen(false)}
              aria-label="Uždaryti"
            >
              ×
            </button>
          </header>

          <div className="chat__messages">
            {messages.map((item) => (
              <p
                key={item.id}
                className={`chat__message chat__message--${item.author}`}
              >
                {item.text}
              </p>
            ))}
          </div>

          <form className="chat__form" onSubmit={handleSubmit}>
            <label className="chat__field">
              <span className="chat__label">Žinutė</span>
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Jūsų žinutė..."
                required
              />
            </label>

            <button type="submit" className="chat__send">
              Siųsti
            </button>
          </form>
        </section>
      )}

      {!isOpen && (
        <button
          type="button"
          className="chat__toggle"
          aria-expanded={false}
          onClick={() => setIsOpen(true)}
        >
          Pokalbis
        </button>
      )}
    </div>
  );
}

export default Chat;
