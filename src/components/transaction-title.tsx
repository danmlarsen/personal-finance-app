import Image from "next/image";

export default function TransactionTitle({
  title,
  avatarUrl,
}: React.ComponentProps<"div"> & { title: string; avatarUrl: string }) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={avatarUrl}
        alt={title}
        width={40}
        height={40}
        className="rounded-full"
      />
      <span>{title}</span>
    </div>
  );
}
