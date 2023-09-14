import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/schema";

const supabase = createPagesBrowserClient<Database>();

export const fetchUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("general_users")
    .select("*")
    .eq("user_id", userId);

  return { data, error };
};

export const insertUser = async (
  nickname: string,
  like: string,
  userId: string,
) => {
  const { data, error } = await supabase
    .from("general_users")
    .insert({ nickname: nickname, like: like, user_id: userId })
    .select();

  return { data, error };
};

export const fetchUsers = async () => {
  const { data, error } = await supabase.from("general_users").select("*");

  return { data, error };
};
