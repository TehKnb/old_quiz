type ImpactItem = {
  week: number;
  impactScore: number;
  reason: string;
};

export function ImpactChart({
  data,
  maxWeek,
}: {
  data: ImpactItem[];
  maxWeek: number;
}) {
  return (
    <div className="flex items-end gap-4 h-48">
      {data.map((item) => {
        const isMax = item.week === maxWeek;

        return (
          <div key={item.week} className="flex flex-col items-center">
            <div
              title={item.reason}
              className={`w-10 rounded-t-lg ${
                isMax ? 'bg-green-500' : 'bg-yellow-400'
              }`}
              style={{ height: `${item.impactScore}%` }}
            />
            <span className="mt-2 text-xs">{item.week}</span>
          </div>
        );
      })}
    </div>
  );
}
