import type { Match, Team } from '../../types';

const TeamAvatar = ({ team }: { team: Team }) => (
  <div
    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 font-semibold text-white"
    style={{ backgroundColor: team.color }}
  >
    {team.shortName}
  </div>
);

export const LiveScore = ({ match }: { match: Match }) => {
  if (match.sport === 'football') {
    return (
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <TeamAvatar team={match.homeTeam} />
        <div className="text-center">
          <div className="font-mono text-3xl font-bold text-stake-textPrimary">
            {match.homeTeam.score ?? 0} - {match.awayTeam.score ?? 0}
          </div>
          <p className="mt-1 text-xs text-stake-textMuted">{match.venue}</p>
        </div>
        <div className="justify-self-end">
          <TeamAvatar team={match.awayTeam} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {[match.homeTeam, match.awayTeam].map((team) => (
        <div key={team.shortName} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TeamAvatar team={team} />
            <div>
              <p className="font-semibold text-stake-textPrimary">{team.name}</p>
              <p className="text-xs text-stake-textMuted">{team.scoreDetail ?? 'Awaiting update'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-xl font-bold text-stake-textPrimary">
              {team.score ?? '--'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
