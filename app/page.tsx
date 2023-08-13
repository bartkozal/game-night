"use client";

import { useRouter } from "next/navigation";
import FormField from "./ui/FormField";
import Form from "./ui/Form";
import Button from "./ui/Button";
import dayjs from "dayjs";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/nights/1");
        }}
      >
        <FormField
          htmlFor="accounts"
          label="BoardGameGeek account used to create the voting list:"
        >
          <input type="text" name="accounts" id="accounts" required />
        </FormField>

        <FormField htmlFor="count" label="How many games players can select?">
          <input
            type="number"
            name="count"
            id="count"
            defaultValue={5}
            min={1}
          />
        </FormField>

        <FormField htmlFor="expansions" label="Include expansions?">
          <select name="expansions" id="expansions">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </FormField>

        <FormField htmlFor="schedule-at" label="When are you going to play?">
          <input
            type="datetime-local"
            name="schedule-at"
            id="schedule-at"
            defaultValue={dayjs()
              .add(1, "day")
              .hour(20)
              .minute(0)
              .format("YYYY-MM-DDTHH:mm")}
            required
          />
        </FormField>

        <div>
          <Button type="submit">Schedule game night</Button>
        </div>
      </Form>
    </main>
  );
}
