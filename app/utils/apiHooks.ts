import { parseCollectionPayload } from "./bgg";
import supabase from "./supabase";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { InsertData } from "@/types/database";

export const useFetchBggCollection = (username: string) =>
  useSWR(`bgg/collection/${username}`, async () => {
    const res = await fetch(
      `https://boardgamegeek.com/xmlapi2/collection?username=${username}&own=1&excludesubtype=boardgameexpansion`
    );
    const xml = await res.text();

    return parseCollectionPayload(xml);
  });

export const useFetchNight = (id: string) =>
  useSWR(`nights/${id}`, async () => {
    const { data } = await supabase
      .from("nights")
      .select()
      .eq("id", id)
      .single();

    return data;
  });

export const useInsertNight = () =>
  useSWRMutation(
    "nights",
    async (_, { arg }: { arg: InsertData<"nights"> }) => {
      const { data } = await supabase
        .from("nights")
        .insert(arg)
        .select()
        .single();
      return data;
    }
  );
