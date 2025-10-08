type DashboardSummaryProps = {
  totalValue: number;
  totalEarnValue: number;
  totalFrozenValue: number;
  totalAvailableValue: number;
};

export default function DashboardSummary({
  totalValue,
  totalEarnValue,
  totalFrozenValue,
  totalAvailableValue,
}: DashboardSummaryProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col gap-0 items-end">
        <span className="md:text-sm text-xs text-text-secondary">
          Valeur totale des actifs
        </span>
        <div className="flex flex-row items-center gap-1">
          <span className="md:text-4xl text-xl font-bold text-right w-full">
            {totalValue.toFixed(0)}
          </span>
          <span className="text-xs md:text-sm">USDT</span>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        <span className="md:text-sm text-xs text-text-secondary text-right w-full">
          Actifs épargnés
        </span>
        <div className="flex flex-row items-center gap-1">
          <span className="md:text-4xl text-xl font-bold text-right w-full">
            {totalEarnValue.toFixed(0)}
          </span>
          <span className="text-xs md:text-sm">USDT</span>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        <span className="md:text-sm text-xs text-text-secondary text-right w-full">
          Actifs bloqués
        </span>
        <div className="flex flex-row items-center gap-1">
          <span className="md:text-4xl text-xl font-bold text-right w-full">
            {totalFrozenValue.toFixed(0)}
          </span>
          <span className="text-xs md:text-sm">USDT</span>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        <span className="md:text-sm text-xs text-text-secondary text-right w-full">
          Actifs disponibles
        </span>
        <div className="flex flex-row items-center gap-1">
          <span className="md:text-4xl text-xl font-bold text-right w-full">
            {totalAvailableValue.toFixed(0)}
          </span>
          <span className="text-xs md:text-sm">USDT</span>
        </div>
      </div>
    </div>
  );
}
