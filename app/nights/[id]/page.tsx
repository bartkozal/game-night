"use client";

import BoardGame from "@/app/ui/BoardGame";
import Heading from "@/app/ui/Heading";
import { useEffect, useRef, useState } from "react";
import { useCopyToClipboard } from "react-use";
import {
  CheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { useFetchNightVotes } from "@/app/utils/api-hooks";
import { humanizeDateTime } from "@/app/utils/datetime";
import LoadingState from "@/app/ui/LoadingState";
import { calculateRanking } from "@/app/utils/ranking";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const { data: night, isLoading } = useFetchNightVotes(params.id);
  const shareUrlInput = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const playersPageUrl = `${global.location.origin}/nights/${params.id}/voting?token=${night?.voting_token}`;

  useEffect(() => {
    shareUrlInput.current?.select();
  }, []);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  }, [isCopied]);

  if (isLoading) return <LoadingState />;

  return (
    <div className="md:w-[640px] md:mx-auto">
      <div className="my-8 bg-gn-dark-grey rounded-xl p-8">
        <label htmlFor="url" className="block mb-4 text-center text-xl">
          Share this link with your friends:
        </label>

        <div className="flex items-center">
          <input
            type="url"
            name="url"
            id="url"
            className="w-full bg-[#0B0B0B] border-[#3A3A3A] rounded"
            readOnly
            value={playersPageUrl}
            ref={shareUrlInput}
          />

          <button>
            {isCopied ? (
              <CheckIcon className="w-6 h-6 text-green-600 ml-3" />
            ) : (
              <ClipboardDocumentListIcon
                className="w-6 h-6 text-gray-500 ml-3"
                onClick={() => {
                  copyToClipboard(playersPageUrl);
                  setIsCopied(true);
                }}
              />
            )}
          </button>
        </div>
      </div>

      {night?.votes?.length !== 0 && (
        <div className="flex divide-x">
          <div className="w-2/3">
            <Heading className="mb-0">
              Games selected for the game night on{" "}
              {humanizeDateTime(night?.scheduled_at)}
            </Heading>

            <div className="grid divide-y">
              {calculateRanking(night).map((rankedGame, index) => (
                <div
                  key={rankedGame.id}
                  className="flex gap-4 items-center mt-4 pt-4"
                >
                  <div className="text-gray-300 font-bold text-3xl w-10 text-center">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <BoardGame
                      thumbnail={rankedGame.thumbnail}
                      name={rankedGame.name}
                    />
                  </div>
                  <div className="text-gray-400">{rankedGame.points} pts</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/3 ml-6 pl-6">
            <Heading>Voting</Heading>
            <div className="grid gap-4">
              {night?.votes.map((vote) => (
                <div key={vote.id}>
                  <h4 className="mb-2 border-b-2 inline-block">
                    {vote.voter_name}
                  </h4>

                  <div className="grid">
                    {vote.selected_games
                      .sort((a, b) => a.rank - b.rank)
                      .map((game) => (
                        <div
                          className="flex gap-2 my-1 items-center"
                          key={game.id}
                        >
                          <div className="text-gray-300 font-bold text-base">
                            {game.rank}
                          </div>
                          <BoardGame
                            size="small"
                            thumbnail={game.thumbnail}
                            name={game.name}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
