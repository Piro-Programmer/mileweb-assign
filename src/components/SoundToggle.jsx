export default function SoundToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-5 right-5 w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${enabled
          ? "bg-white/10 border-white/20 hover:scale-105"
          : "bg-white/5 border-white/10 opacity-60"
        }`}
    >
      <div className="relative w-1 h-1">
        {[0, 1, 2, 3].map((n) => (
          <span
            key={n}
            className={`absolute inset-0 bg-white rounded-full ${enabled ? "animate-ping" : ""
              }`}
            style={{ animationDelay: `${n * 0.5}s` }}
          ></span>
        ))}
      </div>
    </button>
  );
}
