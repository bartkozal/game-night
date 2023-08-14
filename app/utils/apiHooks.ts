import parseBggCollectionPayload from "./parseBggCollectionPayload";
import supabase from "./supabase";
import useSWR from "swr";

export const useFetchBggCollection = (username: string) =>
  useSWR(`bgg/collection/${username}`, async () => {
    const res = await fetch(
      `https://boardgamegeek.com/xmlapi2/collection?username=${username}&own=1&excludesubtype=boardgameexpansion`
    );
    const xml = await res.text();

    return parseBggCollectionPayload(xml);
  });

export const useInsertNight = () =>
  useSWR("nights", async () => {
    const { data } = await supabase.from("nights").select();

    return data;
  });
