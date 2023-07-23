"use client";

import BoardGame from "@/app/ui/BoardGame";
import Button from "@/app/ui/Button";
import Form from "@/app/ui/Form";
import FormField from "@/app/ui/FormField";
import Heading from "@/app/ui/Heading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ArrowsUpDownIcon from "@heroicons/react/24/outline/ArrowsUpDownIcon";

type Step = "select-games" | "order-games";

function SelectGamesStep({ setStep }: { setStep: (step: Step) => void }) {
  return (
    <FormField htmlFor="search" label="Mark games you would like to play:">
      <input
        className="mt-4 "
        type="search"
        name="search"
        id="search"
        placeholder="Search..."
      />

      <div className="mt-4 flex divide-x">
        <div className="grid gap-4 grid-cols-3">
          <BoardGame />
          <BoardGame />
          <BoardGame />
          <BoardGame />
          <BoardGame />
          <BoardGame />
          <BoardGame />
          <BoardGame />
        </div>

        <div className="w-1/4 ml-6 pl-6">
          <Heading>
            Selected{" "}
            <span className="block text-sm text-gray-500">
              3 left to select
            </span>
          </Heading>

          <div className="grid gap-2 mb-4">
            <BoardGame size="small" />
            <BoardGame size="small" />
          </div>

          <Button onClick={() => setStep("order-games")}>Confirm</Button>
        </div>
      </div>
    </FormField>
  );
}

function OrderGamesStep({ setStep }: { setStep: (step: Step) => void }) {
  return (
    <>
      <FormField htmlFor="order" label="Order games by priority:">
        <div className="flex gap-4 items-center mt-4">
          <span className="text-gray-300 font-bold text-3xl">1</span>
          <ArrowsUpDownIcon className="w-6 h-6 text-gray-500" />
          <BoardGame />
        </div>

        <div className="flex gap-4 items-center mt-4">
          <span className="text-gray-300 font-bold text-3xl">2</span>
          <ArrowsUpDownIcon className="w-6 h-6 text-gray-500" />
          <BoardGame />
        </div>

        <div className="flex gap-4 items-center mt-4">
          <span className="text-gray-300 font-bold text-3xl">3</span>
          <ArrowsUpDownIcon className="w-6 h-6 text-gray-500" />
          <BoardGame />
        </div>
      </FormField>

      <FormField htmlFor="name" label="Your name:">
        <input type="text" name="name" id="name" />
      </FormField>

      <div className="flex gap-3">
        <Button styleType="inline" onClick={() => setStep("select-games")}>
          Back
        </Button>
        <Button type="submit">Confirm</Button>
      </div>
    </>
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
