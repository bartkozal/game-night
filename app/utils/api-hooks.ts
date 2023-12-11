import { parseCollectionPayload } from "./bgg";
import supabase from "./supabase";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { InsertData } from "@/types/database";

// <?xml version="1.0" encoding="utf-8" standalone="yes"?>
// <message>
// 	Your request for this collection has been accepted and will be processed.  Please try again later for access.
// </message>

// empty response
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

export const useFetchNightVotes = (id: string) =>
  useSWR(`night-votes/${id}`, async () => {
    const { data } = await supabase
      .from("nights")
      .select(
        `
        id, scheduled_at, voting_token, games_limit, votes (
          selected_games, voter_name, id
        )
      `
      )
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

export const useInsertVote = () =>
  useSWRMutation("votes", async (_, { arg }: { arg: InsertData<"votes"> }) => {
    const { data } = await supabase.from("votes").insert(arg).select().single();
    return data;
  });
