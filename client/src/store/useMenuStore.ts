import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT = "http://localhost:5000/api/menu";

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
  withCredentials: true,
});

type Menu = {
  _id: string;
  // Add other menu properties here
};

type MenuState = {
  loading: boolean;
  menu: Menu | null;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formData: FormData) => {
        set({ loading: true });
        try {
          const response = await axiosInstance.post("/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
            // update restaurant 
            useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
          } else {
            throw new Error(response.data.message || "Failed to create menu");
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "An error occurred while creating the menu");
          } else {
            toast.error("An unexpected error occurred");
          }
          set({ loading: false });
        }
      },
      editMenu: async (menuId: string, formData: FormData) => {
        set({ loading: true });
        try {
          const response = await axiosInstance.put(`/${menuId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, menu: response.data.menu });
            // update restaurant menu
            useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
          } else {
            throw new Error(response.data.message || "Failed to edit menu");
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "An error occurred while editing the menu");
          } else {
            toast.error("An unexpected error occurred");
          }
          set({ loading: false });
        }
      },
    }),
    {
      name: "menu-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);