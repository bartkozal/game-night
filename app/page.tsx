"use client";

import { useRouter } from "next/navigation";
import Form from "./ui/Form";
import FormInput from "./ui/FormInput";
import FormSelect from "./ui/FormSelect";
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
    <div className="md:max-w-md md:mx-auto">
      <Form<FormData> methods={methods} onSubmit={createNight}>
        <FormInput
          id="bgg_account"
          label="BoardGameGeek account used to create the voting list:"
          type="text"
          validation={{ required: true }}
        />

        <FormInput
          id="games_limit"
          label="How many games players can select?"
          type="number"
          defaultValue={5}
          validation={{ required: true, min: 1, max: 30 }}
        />

        <FormSelect
          id="expansions"
          label="Include expansions?"
          defaultValue="false"
          validation={{ required: true }}
          options={[
            ["false", "No"],
            ["true", "Yes"],
          ]}
        />

        <FormInput
          id="scheduled_at"
          label="When are you going to play?"
          type="datetime-local"
          defaultValue={getDateTimeOneDayFromNow()}
          validation={{ required: true }}
        />

        <Button type="submit">Schedule game night</Button>
      </Form>
    </div>
  );
}
