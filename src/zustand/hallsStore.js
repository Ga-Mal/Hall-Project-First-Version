import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";

const BUCKET = "product-images";

export const useHallsStore = create((set, get) => ({
  // STATE
  halls: [],
  loading: false,
  error: null,

  // Helpers

  parseJSON: (value, fallback) => {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

  uploadImage: async (file) => {
    if (!file) return "";

    console.log(file.type, file.size);

    if (!file.type.startsWith("image/")) {
      throw new Error("الملف ليس صورة صحيحة");
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file, { cacheControl: "3600", upsert: true });

    if (error) throw error;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

    return data.publicUrl;
  },

  fetchHalls: async () => {
    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase
        .from("halls")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;

      const cleaned = data.map((hall) => ({
        ...hall,
        imgs: get().parseJSON(hall.imgs, []),
        extensions: get().parseJSON(hall.extensions, []),
      }));
      set({ halls: cleaned, loading: false });

    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  getHallById: (id) => {
    return get().halls.find((h) => h.id == id) || null;
  },

  addHall: async (payload, headerFile, galleryFiles = []) => {
    set({ loading: true, error: null });

    try {
      const headerUrl = await get().uploadImage(headerFile); // Upload Img To Storage and Return The URL

      const galleryUrls = await Promise.all(
        galleryFiles.map((file) => get().uploadImage(file))
      );

      const finalPayload = {
        ...payload,
        header_img: headerUrl,
        imgs: JSON.stringify(galleryUrls),
        extensions: JSON.stringify(payload.extensions || []),
      };

      const { data, error } = await supabase
        .from("halls")
        .insert([finalPayload])
        .select()
        .single();

      if (error) throw error;

      const cleanedData = {
        ...data,
        imgs: get().parseJSON(data.imgs, []),
        extensions: get().parseJSON(data.extensions, []),
      };

      set((state) => ({ halls: [cleanedData, ...state.halls], loading: false }));
    } catch (err) {
      console.log(err);
      set({ error: err.message, loading: false });
    }
  },

  updateHall: async (id, payload, newHeader, newGallery = []) => {
    set({ loading: true, error: null });

    try {
      const existingHall = get().halls.find((h) => h.id === id);

      let headerUrl = existingHall?.header_img;
      let galleryUrls = existingHall?.imgs || [];

      if (newHeader) {
        headerUrl = await get().uploadImage(newHeader);
      }

      if (newGallery.length) {
        galleryUrls = await Promise.all(
          newGallery.map((f) => get().uploadImage(f))
        );
      }

      const { data, error } = await supabase
        .from("halls")
        .update({
          ...payload,
          header_img: headerUrl,
          imgs: JSON.stringify(galleryUrls),
          extensions: JSON.stringify(payload.extensions || []),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      const cleanedData = {
        ...data,
        imgs: get().parseJSON(data.imgs, []),
        extensions: get().parseJSON(data.extensions, []),
      };

      set((state) => ({
        halls: state.halls.map((h) => (h.id === id ? cleanedData : h)),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteHall: async (id) => {
    set({ loading: true, error: null });

    try {
      const { error } = await supabase.from("halls").delete().eq("id", id);

      if (error) throw error;

      set((state) => ({
        halls: state.halls.filter((h) => h.id !== id),
        loading: false,
      }));
    } catch (err) {
      console.log(err);
      set({ error: err.message, loading: false });
    }
  },

  clear: () => set({ halls: [], error: null }),
  
}));
