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
import { BggCollectionEntry as Game } from "@/app/utils/parseBggCollectionPayload";

type Step = "select-games" | "order-games";

// https://boardgamegeek.com/xmlapi2/collection?username=bartkozal&own=1&excludesubtype=boardgameexpansion

type SelectGamesStepProps = {
  setStep: (step: Step) => void;
  games: Game[];
  selectedGames: Game[];
  selectedGamesLimit: number;
  setSelectedGames: (games: Game[]) => void;
};

function SelectGamesStep({
  setStep,
  games,
  selectedGames,
  selectedGamesLimit,
  setSelectedGames,
}: SelectGamesStepProps) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const isDisabled = selectedGames.length !== selectedGamesLimit;
  const isSelected = (game: Game) =>
    selectedGames.some(({ id }) => id === game.id);

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
            {games
              .filter((game) =>
                game.name
                  .toLowerCase()
                  .includes(debouncedSearchValue.toLowerCase())
              )
              .map((game) => (
                <div
                  key={game.id}
                  className={cx(
                    "p-2 hover:bg-gray-200 cursor-pointer flex items-center",
                    {
                      "bg-gray-300": isSelected(game),
                    }
                  )}
                  onClick={() => {
                    setSelectedGames(
                      isSelected(game)
                        ? selectedGames.filter(({ id }) => id !== game.id)
                        : [...selectedGames, game]
                    );
                  }}
                >
                  <BoardGame name={game.name} thumbnail={game.thumbnail} />
                </div>
              ))}
          </div>
        </div>

        <div className="w-1/4 ml-6 pl-6">
          <Heading>
            Selected{" "}
            <span className="block text-sm text-gray-500">
              {selectedGamesLimit - selectedGames.length} left to select
            </span>
          </Heading>

          <div className="grid gap-2 mb-4">
            {selectedGames.map((game) => (
              <div key={game.id} className="flex items-center justify-between">
                <BoardGame
                  size="small"
                  name={game.name}
                  thumbnail={game.thumbnail}
                />
                <div>
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            ))}
          </div>

          <Button
            className="w-full"
            onClick={() => setStep("order-games")}
            disabled={isDisabled}
          >
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
}

type OrderGamesStepProps = {
  selectedGames: Game[];
  setStep: (step: Step) => void;
};

function OrderGamesStep({ selectedGames, setStep }: OrderGamesStepProps) {
  return (
    <div className="mx-auto">
      <div className="my-8">
        <Heading>Order games by priority:</Heading>

        {selectedGames.map((game, i) => (
          <div key={game.id} className="flex gap-4 items-center mt-4">
            <Bars4Icon className="w-6 h-6 text-gray-500" />
            <div className="text-gray-300 font-bold text-3xl">{i + 1}</div>
            <BoardGame name={game.name} thumbnail={game.thumbnail} />
          </div>
        ))}
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
  const selectedGamesLimit = 5; // TODO backend
  const games = bggCollection; // TODO backend
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/votings/1");
        }}
      >
        {step === "select-games" && (
          <SelectGamesStep
            setStep={setStep}
            games={games}
            selectedGames={selectedGames}
            selectedGamesLimit={selectedGamesLimit}
            setSelectedGames={setSelectedGames}
          />
        )}

        {step === "order-games" && (
          <OrderGamesStep setStep={setStep} selectedGames={selectedGames} />
        )}
      </Form>
    </div>
  );
}

{
}
