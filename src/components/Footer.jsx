export default function Footer({ current }) {
  return (
    <div className="text-center text-textLight pb-[5vh]">
      <div className="text-[10vw] leading-[0.8]">Beyond</div>
      <div className="text-[10vw] leading-[0.8]">Thinking</div>
      <div className="relative w-40 h-[1px] bg-white/30 mx-auto mt-4">
        <div
          className="absolute top-0 left-0 h-full bg-textLight transition-all duration-300"
          style={{ width: `${(current / 9) * 100}%` }}
        />
        <div className="absolute -top-2 left-0 right-0 flex justify-between text-xs text-textLight font-primary">
          <span>{(current + 1).toString().padStart(2, "0")}</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
}
