"use client";

import { useRouter } from "next/navigation";
import FormField from "./ui/FormField";
import Form from "./ui/Form";
import Button from "./ui/Button";
import { useInsertNight } from "./utils/api-hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { getDateTimeOneDayFromNow } from "./utils/datetime";

type FormData = {
  bgg_account: string;
  games_limit: number;
  expansions: boolean;
  scheduled_at: string;
};

export default function Home() {
  const router = useRouter();
  const methods = useForm<FormData>();
  const { trigger } = useInsertNight();

  const createNight: SubmitHandler<FormData> = async (formData) => {
    const night = await trigger(formData);

    if (!night) return;

    router.push(`/nights/${night.id}`);
  };

  return (
    <Form methods={methods} onSubmit={createNight}>
      <FormField
        id="bgg_account"
        label="BoardGameGeek account used to create the voting list:"
        type="text"
        options={{ required: true }}
      />

      {/* <FormField
          htmlFor="games_limit"
          label="How many games players can select?"
        >
          <input
            type="number"
            defaultValue={5}
            id="games_limit"
            {...register("games_limit", { required: true, min: 1, max: 30 })}
          />
        </FormField>

        <FormField htmlFor="expansions" label="Include expansions?">
          <select
            id="expansions"
            defaultValue="false"
            {...register("expansions", { required: true })}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </FormField>

        <FormField htmlFor="scheduled_at" label="When are you going to play?">
          <input
            type="datetime-local"
            id="scheduled_at"
            defaultValue={getDateTimeOneDayFromNow()}
            {...register("scheduled_at", { required: true })}
          />
        </FormField> */}

      <div>
        <Button type="submit">Schedule game night</Button>
      </div>
    </Form>
  );
}
