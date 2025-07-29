export default function AmountBar({
  amount,
  max,
  themeColor,
}: {
  amount: number;
  max: number;
  themeColor: string;
}) {
  const widthPercent = Math.min(Math.round((amount / max) * 100), 100);

  return (
    <div className="grid h-8 rounded-sm bg-amber-50 p-1">
      <div
        className="inline rounded-sm"
        style={{
          backgroundColor: themeColor,
          width: `${widthPercent}%`,
        }}
      />
    </div>
  );
}
