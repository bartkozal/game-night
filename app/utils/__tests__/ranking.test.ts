import { describe, expect, it } from "vitest";
import { calculateRanking } from "../ranking";

describe("calculateRanking", () => {
  it("should return an empty array if night is not defined", () => {
    const night = undefined;

    expect(calculateRanking(night)).toEqual([]);
  });

  it("should calculate ranking for night based on votes", () => {
    const game1 = {
      id: "1",
      name: "game1",
      thumbnail: "/game1.png",
    };

    const game2 = {
      id: "2",
      name: "game2",
      thumbnail: "/game2.png",
    };

    const game3 = {
      id: "3",
      name: "game3",
      thumbnail: "/game3.png",
    };

    const night = {
      id: "1",
      scheduled_at: "2021-01-01T00:00:00.000Z",
      games_limit: 2,
      voting_token: "1234",
      votes: [
        {
          id: "1",
          voter_name: "voter1",
          selected_games: [
            { ...game1, rank: 1 },
            { ...game2, rank: 2 },
          ],
        },
        {
          id: "2",
          voter_name: "voter2",
          selected_games: [
            { ...game1, rank: 1 },
            { ...game3, rank: 2 },
          ],
        },
        {
          id: "3",
          voter_name: "voter3",
          selected_games: [
            { ...game2, rank: 1 },
            { ...game3, rank: 2 },
          ],
        },
      ],
    };

    const expected = [
      {
        ...game1,
        points: 4,
      },
      {
        ...game2,
        points: 3,
      },
      {
        ...game3,
        points: 2,
      },
    ];

    expect(calculateRanking(night)).toEqual(expected);
  });
});
