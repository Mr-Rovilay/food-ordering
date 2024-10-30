import { Orders } from "@/types/orderType";
import { MenuItem, RestaurantState } from "@/types/restaurantType";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "http://localhost:5000/api/restaurant";

const axiosInstance = axios.create({
  baseURL: API_END_POINT,
  withCredentials: true,
});

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],

      createRestaurant: async (formData: FormData) => {
        set({ loading: true });
        try {
          const response = await axiosInstance.post("/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "An error occurred while creating the restaurant");
          } else {
            toast.error("An unexpected error occurred");
          }
          set({ loading: false });
        }
      },

      getRestaurant: async () => {
        set({ loading: true });
        try {
          const response = await axiosInstance.get("/");
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.restaurant });
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            set({ restaurant: null });
          }
          set({ loading: false });
        }
      },

      updateRestaurant: async (formData: FormData) => {
        set({ loading: true });
        try {
          const response = await axiosInstance.put("/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "An error occurred while updating the restaurant");
          } else {
            toast.error("An unexpected error occurred");
          }
          set({ loading: false });
        }
      },

      searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: string[]) => {
        set({ loading: true });
        try {
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          const response = await axiosInstance.get(`/search/${searchText}?${params.toString()}`);
          if (response.data.success) {
            set({ loading: false, searchedRestaurant: response.data });
          }
        } catch (error) {
          console.error("Error searching restaurants:", error);
          set({ loading: false });
        }
      },

      addMenuToRestaurant: (menu: MenuItem) => {
        set((state) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },

      updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
          return state;
        });
      },

      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },

      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      getSingleRestaurant: async (restaurantId: string) => {
        try {
          const response = await axiosInstance.get(`/${restaurantId}`);
          if (response.data.success) {
            set({ singleRestaurant: response.data.restaurant });
          }
        } catch (error) {
          console.error("Error fetching single restaurant:", error);
        }
      },

      getRestaurantOrders: async () => {
        try {
          const response = await axiosInstance.get("/order");
          if (response.data.success) {
            set({ restaurantOrder: response.data.orders });
          }
        } catch (error) {
          console.error("Error fetching restaurant orders:", error);
        }
      },

      updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
          const response = await axiosInstance.put(
            `/order/${orderId}/status`,
            { status },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            const updatedOrder = get().restaurantOrder.map((order: Orders) =>
              order._id === orderId ? { ...order, status: response.data.status } : order
            );
            set({ restaurantOrder: updatedOrder });
            toast.success(response.data.message);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "An error occurred while updating the order");
          } else {
            toast.error("An unexpected error occurred");
          }
        }
      },
    }),
    {
      name: "restaurant-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);