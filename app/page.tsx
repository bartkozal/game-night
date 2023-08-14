"use client";

import { useRouter } from "next/navigation";
import FormField from "./ui/FormField";
import Form from "./ui/Form";
import Button from "./ui/Button";
import dayjs from "dayjs";
import { useInsertNight } from "./utils/apiHooks";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  bgg_account: string;
  games_limit: number;
  expansions: boolean;
  scheduled_at: string;
};

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();
  const { trigger } = useInsertNight();

  const createNight: SubmitHandler<FormData> = async (formData) => {
    const nights = await trigger(formData);

    if (!nights) return;

    router.push(`/nights/${nights[0].id}`);
  };

  return (
    <main>
      <Form onSubmit={handleSubmit(createNight)}>
        <FormField
          htmlFor="bgg_account"
          label="BoardGameGeek account used to create the voting list:"
        >
          <input
            type="text"
            id="bgg_account"
            {...register("bgg_account", { required: true })}
          />
        </FormField>

        <FormField
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
            defaultValue={dayjs()
              .add(1, "day")
              .hour(20)
              .minute(0)
              .format("YYYY-MM-DDTHH:mm")}
            {...register("scheduled_at", { required: true })}
          />
        </FormField>

        <div>
          <Button type="submit">Schedule game night</Button>
        </div>
      </Form>
    </main>
  );
}
