import { useFetchNightVotes } from "./api-hooks";

type RankedGame = {
  id: string;
  thumbnail: string;
  name: string;
  points: number;
};

export const calculateRanking = (
  night: ReturnType<typeof useFetchNightVotes>["data"]
): RankedGame[] => {
  if (!night) return [];

  return Object.values(
    night.votes
      .flatMap((vote) => vote.selected_games)
      .reduce<Record<string, RankedGame>>(
        (mergedGames, game) => ({
          ...mergedGames,
          [game.id]: {
            id: game.id,
            thumbnail: game.thumbnail,
            name: game.name,
            points:
              (mergedGames[game.id]?.points ?? 0) +
              night.games_limit -
              game.rank +
              1,
          },
        }),
        {}
      )
  ).sort((a, b) => b.points - a.points);
};
