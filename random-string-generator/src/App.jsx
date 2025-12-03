import { useState, useCallback, useEffect } from "react";

const CHAR_SETS = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+[]{}|;:,.<>?/~`-=",
};

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [randomString, setRandomString] = useState("");
  const [copied, setCopied] = useState(false);

  // useCallback: memoized function to generate the random string
  const generateString = useCallback(() => {
    let chars = CHAR_SETS.letters;

    if (includeNumbers) chars += CHAR_SETS.numbers;
    if (includeSymbols) chars += CHAR_SETS.symbols;

    if (!chars) return;

    let result = "";
    for (let i = 0; i < Number(length); i++) {
      const index = Math.floor(Math.random() * chars.length);
      result += chars[index];
    }

    setRandomString(result);
    setCopied(false);
  }, [length, includeNumbers, includeSymbols]);

  // useEffect: generate a string whenever options/length change (and on first load)
  useEffect(() => {
    generateString();
  }, [generateString]);

  const handleCopy = async () => {
    if (!randomString) return;
    try {
      await navigator.clipboard.writeText(randomString);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopied(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#020617",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          border: "1px solid #1e293b",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "8px", fontWeight: 600 }}>
          Random String Generator
        </h1>
        <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "16px" }}>
          Generate secure random strings with different options.
        </p>

        {/* Generated string box */}
        <div
          style={{
            background: "#020617",
            borderRadius: "12px",
            padding: "12px 14px",
            border: "1px solid #1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              wordBreak: "break-all",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
          >
            {randomString || "Click Generate to create a string"}
          </span>
          <button
            onClick={handleCopy}
            style={{
              padding: "6px 10px",
              borderRadius: "999px",
              border: "none",
              fontSize: "12px",
              cursor: "pointer",
              background: copied ? "#16a34a" : "#2563eb",
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Length input */}
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              marginBottom: "4px",
            }}
          >
            <span>Length</span>
            <span style={{ color: "#93c5fd" }}>{length}</span>
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        {/* Checkbox options */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Include numbers (0–9)
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Include symbols (!@#$%)
          </label>
        </div>

        {/* Generate button */}
        <button
          onClick={generateString}
          style={{
            width: "100%",
            padding: "10px 0",
            borderRadius: "999px",
            border: "none",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            background:
              "linear-gradient(90deg, #2563eb, #7c3aed, #ec4899, #f97316)",
            backgroundSize: "200% 200%",
            color: "white",
          }}
        >
          Generate New String
        </button>
      </div>
    </div>
  );
}

export default App;
