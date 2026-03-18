import { getSupabaseClient } from "./supabaseClient";

// ✅ SIGN UP — trigger handles users table automatically
export async function signUp(email: string, password: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("User not returned from auth");
  return data;
}

// ✅ SIGN IN
export async function signIn(email: string, password: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}