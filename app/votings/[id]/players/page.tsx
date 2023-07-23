"use client";

import BoardGame from "@/app/ui/BoardGame";
import Button from "@/app/ui/Button";
import Form from "@/app/ui/Form";
import FormField from "@/app/ui/FormField";
import Heading from "@/app/ui/Heading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Bars4Icon from "@heroicons/react/24/outline/Bars4Icon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import cx from "classnames";
import bggCollection from "@/app/__tests__/bgg-collection.json";
import { useDebounce } from "react-use";

type Step = "select-games" | "order-games";

// https://boardgamegeek.com/xmlapi2/collection?username=bartkozal&own=1&excludesubtype=boardgameexpansion

function SelectGamesStep({ setStep }: { setStep: (step: Step) => void }) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  useDebounce(() => setDebouncedSearchValue(searchValue), 300, [searchValue]);

  return (
    <>
      <div className="flex divide-x">
        <div className="w-3/4">
          <Heading>
            Mark games you would like to play on July 23rd at 19:00
          </Heading>

          <input
            className="w-full mb-4 rounded-xl"
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <div className="grid gap-4 grid-cols-3">
            {bggCollection
              .filter((entry) =>
                entry.name
                  .toLowerCase()
                  .includes(debouncedSearchValue.toLowerCase())
              )
              .map((entry) => (
                <div
                  key={entry.id}
                  className={cx(
                    "p-2 hover:bg-gray-200 cursor-pointer flex items-center",
                    {
                      "bg-gray-300": false,
                    }
                  )}
                >
                  <BoardGame name={entry.name} thumbnail={entry.thumbnail} />
                </div>
              ))}
          </div>
        </div>

        <div className="w-1/4 ml-6 pl-6">
          <Heading>
            Selected{" "}
            <span className="block text-sm text-gray-500">
              3 left to select
            </span>
          </Heading>

          <div className="grid gap-2 mb-4">
            <div className="flex items-center justify-between">
              <BoardGame size="small" />
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </div>

            <div className="flex items-center justify-between">
              <BoardGame size="small" />
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </div>

            <div className="flex items-center justify-between">
              <BoardGame size="small" />
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          <Button className="w-full" onClick={() => setStep("order-games")}>
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
}

function OrderGamesStep({ setStep }: { setStep: (step: Step) => void }) {
  return (
    <div className="mx-auto">
      <div className="my-8">
        <Heading>Order games by priority:</Heading>

        <div className="flex gap-4 items-center mt-4">
          <Bars4Icon className="w-6 h-6 text-gray-500" />
          <div className="text-gray-300 font-bold text-3xl">1</div>
          <BoardGame />
        </div>

        <div className="flex gap-4 items-center mt-4">
          <Bars4Icon className="w-6 h-6 text-gray-500" />
          <div className="text-gray-300 font-bold text-3xl">2</div>
          <BoardGame />
        </div>

        <div className="flex gap-4 items-center mt-4">
          <Bars4Icon className="w-6 h-6 text-gray-500" />
          <div className="text-gray-300 font-bold text-3xl">3</div>
          <BoardGame />
        </div>
      </div>

      <FormField htmlFor="name" label="Your name:">
        <input type="text" name="name" id="name" className="w-full" />
      </FormField>

      <div className="mt-4 flex gap-3 justify-center">
        <Button
          styleType="inline"
          className="text-gray-500"
          onClick={() => setStep("select-games")}
        >
          Back
        </Button>
        <Button type="submit">Confirm</Button>
      </div>
    </div>
  );
}

export default function Page() {
  const [step, setStep] = useState<Step>("select-games");
  const router = useRouter();

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/votings/1");
        }}
      >
        {step === "select-games" && <SelectGamesStep setStep={setStep} />}
        {step === "order-games" && <OrderGamesStep setStep={setStep} />}
      </Form>
    </div>
  );
}

{
}
