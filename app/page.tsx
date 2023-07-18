"use client";

import { useRouter } from "next/navigation";
import PlusSmallIcon from "@heroicons/react/24/outline/PlusSmallIcon";
import FormField from "./ui/FormField";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <form
        className="grid gap-4"
        onClick={(e) => {
          e.preventDefault();
          router.push("/votings/1");
        }}
      >
        <FormField
          htmlFor="accounts"
          label="Type BGG accounts used to create games list:"
        >
          <input type="text" name="accounts" id="accounts" />
          <a href="#" className="flex">
            <PlusSmallIcon className="w-6 h-6" /> add more
          </a>
        </FormField>

        <FormField htmlFor="count" label="How many games players can select?">
          <input type="number" name="count" id="count" value={5} />
        </FormField>

        <FormField htmlFor="expansions" label="Include expansions?">
          <select name="expansions" id="expansions">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </FormField>

        <FormField htmlFor="schedule-at" label="When are you going to play?">
          <input type="datetime-local" name="schedule-at" id="schedule-at" />
        </FormField>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-2xl"
          >
            Create voting list
          </button>
        </div>
      </form>
    </main>
  );
}
