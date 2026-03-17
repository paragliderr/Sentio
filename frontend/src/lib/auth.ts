import { getSupabaseClient } from "./supabaseClient";

// ✅ SIGN UP
export async function signUp(email: string, password: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  if (!data.user) {
    throw new Error("User not returned from auth");
  }

  // 🔥 DO NOT include id
  const { error: insertError } = await supabase.from("users").insert({
    email: data.user.email ?? email,
    username: email.split("@")[0],
  });

  if (insertError) {
    console.error("INSERT ERROR:", insertError);
    throw new Error("Database error saving new user");
  }

  return data;
}

// ✅ SIGN IN
export async function signIn(email: string, password: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}