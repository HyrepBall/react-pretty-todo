"use client";

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ top: "10%", left: "5%" }}
      />
      <div
        className="absolute w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse delay-700"
        style={{ bottom: "15%", right: "15%" }}
      />
    </div>
  );
}
