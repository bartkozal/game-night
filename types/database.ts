import { Database } from "./supabase";

export type FetchData<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertData<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
