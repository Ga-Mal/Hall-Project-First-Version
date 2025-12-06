import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";

const BUCKET = "photography-imgs";

export const useLocatoinsStore = create((set, get) => ({
  locations: [],
  loading: false,
  errors: null,

  // Protected Parsing
  protectedJSONparse: (value, fallback = []) => {
    try {
      return Array.isArray(JSON.parse(value)) ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

  uploadImg: async (file) => {
    if (!file) return "";
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file, { cacheControl: 3600, upsert: true });

    if (error) throw error;

    const { data: urlImg } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(fileName);
    return urlImg.publicUrl;
  },

  addLocation: async (payload, headerImg, galleryImgs = []) => {
    set({ loading: true, errors: null });

    try {
      const headerUrl = await get().uploadImg(headerImg);

      const galleryUrls = await Promise.all(
        galleryImgs.map((img) => get().uploadImg(img))
      );

      const finalyData = {
        ...payload,
        header_img: headerUrl,
        gallery_imgs: JSON.stringify(galleryUrls),
      };

      const { data, error } = await supabase
        .from("locations")
        .insert([finalyData])
        .select()
        .single();

      if (error) throw error;

      const cleanedData = {
        ...data,
        gallery_imgs: get().protectedJSONparse(data.gallery_imgs, []),
      };

      set((state) => ({
        locations: [cleanedData, ...state.locations],
        loading: false,
      }));

      return { data: cleanedData, error: null, loading: false };
    } catch (err) {
      console.log(err);
      set({ loading: false, errors: err });

      return { data: null, error: err, loading: false };
    }
  },

  fetchLocations: async () => {
    set({ loading: true, errors: null });

    try {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .order("id", { ascending: false });
      if (error) throw error;

      const cleaneData = data.map((loc) => ({
        ...loc,
        gallery_imgs: get().protectedJSONparse(loc.gallery_imgs, []),
      }));
      set({ locations: cleaneData, loading: false });
    } catch (err) {
      console.log(err);
      set({ loading: false, errors: err });
    }
  },

  getLocationById: (id) => {
    return get().locations.find((loc) => loc.id === id) || null;
  },

  updateLocation: async (id, payload, newHeaderImg, newGalleryImgs = []) => {
    set({ loading: true, errors: null });
    try {
      const existingLocation = get().locations.find((loc) => loc.id === id);
      let headerUrl = existingLocation?.header_img;
      let galleryUrls = existingLocation?.gallery_imgs || [];

      if (newHeaderImg) {
        headerUrl = await get().uploadImg(newHeaderImg);
      }
      if (newGalleryImgs.length) {
        galleryUrls = await Promise.all(
          newGalleryImgs.map((img) => get().uploadImg(img))
        );
      }
      const { data, error } = await supabase
        .from("locations")
        .update({
          ...payload,
          header_img: headerUrl,
          gallery_imgs: JSON.stringify(galleryUrls),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      const cleanedData = {
        ...data,
        gallery_imgs: get().protectedJSONparse(data.gallery_imgs, []),
      };

      set((state) => ({
        locations: state.locations.map((loc) =>
          loc.id === id ? cleanedData : loc
        ),
        loading: false,
      }));
    } catch (err) {
      console.log(err);
      set({ loading: false, errors: err });
    }
  },

  deleteLocation: async (id) => {
    set({ loading: true, errors: null });
    try {
      const { error } = await supabase.from("locations").delete().eq("id", id);

      if (error) throw error;

      set((state) => ({
        locations: state.locations.filter((loc) => loc.id !== id),
        loading: false,
      }));
    } catch (err) {
      console.log(err);
      set({ loading: false, errors: err });
    }
  },

  clear: () => set({ locations: [], errors: null }),
}));
