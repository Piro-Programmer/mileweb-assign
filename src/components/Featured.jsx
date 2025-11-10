export default function Featured({ current }) {
  const texts = [
    "Creative Elements",
    "Inner Stillness",
    "Deep Knowing",
    "True Expression",
    "Now Moment",
    "Deep Attention",
    "Open Exploration",
    "Calm Waiting",
    "Let Go Control",
    "Pure Essence",
  ];

  return (
    <div className="w-[20%] flex justify-center items-center text-center text-[1.5vw] relative h-[10vh] overflow-hidden">
      {texts.map((t, i) => (
        <div
          key={i}
          className={`absolute inset-0 flex justify-center items-center transition-opacity duration-500 ${current === i ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
          <h3 className="text-textLight">{t}</h3>
        </div>
      ))}
    </div>
  );
}
