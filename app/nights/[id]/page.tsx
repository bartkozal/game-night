"use client";

import BoardGame from "@/app/ui/BoardGame";
import Heading from "@/app/ui/Heading";
import { useEffect, useRef, useState } from "react";
import { useCopyToClipboard } from "react-use";
import {
  CheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { useFetchNight } from "@/app/utils/apiHooks";
import { humanizeDateTime } from "@/app/utils/datetime";
import LoadingState from "@/app/ui/LoadingState";
import EmptyState from "@/app/ui/EmptyState";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const { data: night, isLoading } = useFetchNight(params.id);
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
    <div>
      <div className="my-8 bg-gray-100 p-8">
        <label htmlFor="url" className="block mb-4 text-center text-xl">
          Share this link with your friends:
        </label>

        <div className="flex items-center">
          <input
            type="url"
            name="url"
            id="url"
            className="w-full"
            readOnly
            value={playersPageUrl}
            ref={shareUrlInput}
          />

          <button>
            {isCopied ? (
              <CheckIcon className="w-6 h-6 text-green-600 ml-3" />
            ) : (
              <ClipboardDocumentListIcon
                className="w-6 h-6 text-gray-600 ml-3"
                onClick={() => {
                  copyToClipboard(playersPageUrl);
                  setIsCopied(true);
                }}
              />
            )}
          </button>
        </div>
      </div>

      <div className="flex divide-x">
        <div className="w-2/3">
          <Heading>
            Games selected for the game night on{" "}
            {humanizeDateTime(night?.scheduled_at)}
          </Heading>

          <EmptyState />

          {/* <div className="flex gap-4 items-center">
            <div className="text-gray-300 font-bold text-3xl">1</div>
            <BoardGame
              thumbnail="https://cf.geekdo-images.com/7bd4Zhbzdc_57GEpnd_zjA__thumb/img/yY27TheKJozDYkCXczDLgrCIo-M=/fit-in/200x150/filters:strip_icc()/pic2901599.jpg"
              name="Catan: Gra planszowa"
            />
            <div className="text-gray-400">8 pts</div>
          </div> */}
        </div>

        <div className="w-1/3 ml-6 pl-6">
          <Heading>Voting</Heading>

          <EmptyState>No one voted</EmptyState>

          {/* <h4 className="mb-2 border-b-2 inline-block">Bart</h4>
          <div className="flex gap-2 items-center">
            <div className="text-gray-300 font-bold text-base">1</div>
            <BoardGame
              size="small"
              thumbnail="https://cf.geekdo-images.com/7bd4Zhbzdc_57GEpnd_zjA__thumb/img/yY27TheKJozDYkCXczDLgrCIo-M=/fit-in/200x150/filters:strip_icc()/pic2901599.jpg"
              name="Catan: Gra planszowa"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
