"use client";

import BoardGame from "@/app/ui/BoardGame";
import Heading from "@/app/ui/Heading";
import { useEffect, useRef } from "react";
import ClipboardDocumentListIcon from "@heroicons/react/24/outline/ClipboardDocumentListIcon";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const shareUrlInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    shareUrlInput.current?.select();
  }, []);

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
            value={
              global.location.origin + "/votings/" + params.id + "/players"
            }
            ref={shareUrlInput}
          />

          <ClipboardDocumentListIcon className="w-6 h-6 text-gray-600 ml-3" />
        </div>
      </div>

      <Heading>Games selected for the game night on July 23rd at 19:00</Heading>

      <div className="flex mt-4">
        <div className="w-2/3">
          <div className="flex gap-4 items-center">
            <div className="text-gray-300 font-bold text-3xl">1</div>
            <BoardGame />
            <div className="text-gray-400">8 pts</div>
          </div>
        </div>

        <div className="w-1/3">
          <Heading>Voting</Heading>
          <h4 className="mb-2 border-b-2 inline-block">Bart</h4>
          <div className="flex gap-2 items-center">
            <div className="text-gray-300 font-bold text-base">1</div>
            <BoardGame size="small" />
          </div>
        </div>
      </div>
    </div>
  );
}
