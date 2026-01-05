export function ChatBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="size-10 rounded-full bg-black text-white grid place-items-center font-semibold">
        ogga
      </div>
      <div className="max-w-[85%] rounded-2xl bg-white shadow p-3 text-sm leading-6">
        {text}
      </div>
    </div>
  );
}
