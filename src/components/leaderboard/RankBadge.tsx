export const RankBadge = ({ rank }: { rank: number }) => (
  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-stake-bg font-mono font-bold text-stake-textPrimary">
    #{rank}
  </div>
);
