"use client";

import BoardGame from "@/app/ui/BoardGame";
import Button from "@/app/ui/Button";
import Form from "@/app/ui/Form";
import Heading from "@/app/ui/Heading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bars4Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import cx from "classnames";
import { useDebounce } from "react-use";
import parseBggCollectionPayload, {
  BggCollectionEntry as Game,
} from "@/app/utils/parseBggCollectionPayload";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import useSWR from "swr";

const VIEW_TYPE_PAGE_SIZE = {
  grid: 24,
  list: 80,
  all: 0,
} as const;

const DEFAULT_VIEW_TYPE = "grid";

type ViewType = keyof typeof VIEW_TYPE_PAGE_SIZE;
type PageSize = (typeof VIEW_TYPE_PAGE_SIZE)[ViewType];

const useGames = (username: string) =>
  useSWR(`bgg/${username}`, () =>
    fetch(
      `https://boardgamegeek.com/xmlapi2/collection?username=${username}&own=1&excludesubtype=boardgameexpansion`
    )
      .then((res) => res.text())
      .then((xml) => parseBggCollectionPayload(xml))
  );

export default function Page() {
  const selectedGamesLimit = 5; // TODO backend
  const { data: games = [], isLoading } = useGames("bartkozal");
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [viewType, setViewType] = useState<ViewType>(DEFAULT_VIEW_TYPE);
  const [pageSize, setPageSize] = useState<PageSize>(
    VIEW_TYPE_PAGE_SIZE[DEFAULT_VIEW_TYPE]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const router = useRouter();

  useDebounce(() => setDebouncedSearchValue(searchValue), 300, [searchValue]);

  useEffect(() => {
    setPageSize(VIEW_TYPE_PAGE_SIZE[viewType]);
  }, [viewType]);

  const gamesAreNotSelected = selectedGames.length < selectedGamesLimit;
  const isSelected = (game: Game) =>
    selectedGames.some(({ id }) => id === game.id);
  const lastPage = Math.ceil(games.length / pageSize);

  const handleOrderChange = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(selectedGames);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedGames(items);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex divide-x">
      <div className="w-3/4">
        <Heading>
          Select and order by preference {selectedGamesLimit} games you would
          like to play on July 23rd at 19:00
        </Heading>

        <div className="flex items-center mb-4">
          <input
            className="w-full rounded-xl"
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-2 ml-4">
            <button
              className={cx(
                viewType === "grid" ? "text-gray-700" : "text-gray-400"
              )}
              onClick={() => setViewType("grid")}
            >
              <Squares2X2Icon className="w-6 h-6" />
            </button>
            <button
              className={cx(
                viewType === "list" ? "text-gray-700" : "text-gray-400"
              )}
              onClick={() => setViewType("list")}
            >
              <Bars4Icon className="w-6 h-6" />
            </button>
            <button
              className={cx(
                "uppercase text-sm",
                viewType === "all" ? "text-gray-700" : "text-gray-400"
              )}
              onClick={() => setViewType("all")}
            >
              All
            </button>
          </div>
        </div>

        <div
          className={cx(
            "grid",
            viewType === "list" ? "grid-cols-4 gap-1" : "grid-cols-3 gap-2"
          )}
        >
          {games
            .filter((game) =>
              game.name
                .toLowerCase()
                .includes(debouncedSearchValue.toLowerCase())
            )
            .slice(
              (currentPage - 1) * pageSize,
              pageSize ? currentPage * pageSize : games.length
            )
            .map((game) => (
              <div
                key={game.id}
                className={cx(
                  "hover:bg-gray-100 cursor-pointer flex items-center",
                  viewType === "list" ? "p-1" : "p-2",
                  {
                    "bg-gray-300": isSelected(game),
                  }
                )}
                onClick={() => {
                  setSelectedGames(
                    isSelected(game)
                      ? selectedGames.filter(({ id }) => id !== game.id)
                      : gamesAreNotSelected
                      ? [...selectedGames, game]
                      : selectedGames
                  );
                }}
              >
                <BoardGame
                  name={game.name}
                  thumbnail={game.thumbnail}
                  size={viewType === "list" ? "small" : "regular"}
                />
              </div>
            ))}
        </div>

        {viewType !== "all" && lastPage !== 1 && (
          <div className="flex items-center justify-center mt-8">
            <button
              className={cx(
                "w-7 h-7 flex items-center justify-center mx-1",
                currentPage === 1
                  ? "text-gray-400"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            <div>
              Page {currentPage} of {lastPage}
            </div>

            <button
              className={cx(
                "w-7 h-7 flex items-center justify-center mx-1",
                currentPage === lastPage
                  ? "text-gray-400"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === lastPage}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="w-1/4 ml-6 pl-6">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/votings/1");
          }}
        >
          <div>
            <Heading className="mb-0">Selected</Heading>

            <div className="text-sm text-gray-500">
              {selectedGamesLimit - selectedGames.length} left to select
            </div>
          </div>

          {selectedGames.length === 0 ? (
            <div className="border border-dashed border-gray-400 p-3 text-center text-gray-400 uppercase text-xs rounded">
              No games selected
            </div>
          ) : (
            <DragDropContext onDragEnd={handleOrderChange}>
              <Droppable droppableId="selected-games">
                {(droppable) => (
                  <div
                    className="grid"
                    {...droppable.droppableProps}
                    ref={droppable.innerRef}
                  >
                    {selectedGames.map((game, index) => (
                      <Draggable
                        key={game.id}
                        draggableId={game.id}
                        index={index}
                      >
                        {(draggable) => (
                          <div
                            className="flex items-center justify-between my-1"
                            ref={draggable.innerRef}
                            {...draggable.draggableProps}
                            {...draggable.dragHandleProps}
                          >
                            <div className="flex items-center gap-2">
                              <Bars4Icon className="w-4 h-4 text-gray-500 shrink-0" />

                              <BoardGame
                                size="small"
                                name={game.name}
                                thumbnail={game.thumbnail}
                              />
                            </div>

                            <XMarkIcon
                              className="w-4 h-4 cursor-pointer text-gray-500 shrink-0"
                              onClick={() => {
                                setSelectedGames(
                                  selectedGames.filter(
                                    ({ id }) => id !== game.id
                                  )
                                );
                              }}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {droppable.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}

          {!gamesAreNotSelected && (
            <input
              type="text"
              name="name"
              id="name"
              className="w-full text-sm"
              placeholder="Provide your name..."
              required
            />
          )}

          <Button className="w-full" disabled={gamesAreNotSelected}>
            Confirm
          </Button>
        </Form>
      </div>
    </div>
  );
}
