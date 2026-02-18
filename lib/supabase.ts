import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export async function uploadLogo(
  file: File,
  userId: string
): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const fileName = `${userId}/logo-${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("logos")
    .upload(fileName, file, { upsert: true });

  if (error) {
    console.error("Logo upload error:", error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("logos").getPublicUrl(fileName);

  return publicUrl;
}
