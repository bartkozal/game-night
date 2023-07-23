"use client";

import BoardGame from "@/app/ui/BoardGame";
import FormField from "@/app/ui/FormField";
import Heading from "@/app/ui/Heading";
import { useEffect, useRef } from "react";

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
      <FormField htmlFor="url" label="Send this link to your players:">
        <input
          type="url"
          name="url"
          id="url"
          readOnly
          value={global.location.origin + "/votings/" + params.id + "/players"}
          ref={shareUrlInput}
        />
      </FormField>

      <div className="flex mt-4">
        <div className="w-2/3">
          <Heading>Results</Heading>

          <div className="flex gap-4 items-center">
            <span className="text-gray-300 font-bold text-3xl">1</span>
            <BoardGame />
          </div>
        </div>

        <div className="w-1/3">
          <Heading>Details</Heading>
          <h4 className="mb-2 border-b-2 inline-block">Bart</h4>
          <div className="flex gap-2 items-center">
            <span className="text-gray-300 font-bold text-base">1</span>
            <BoardGame size="small" />
          </div>
        </div>
      </div>
    </div>
  );
}
