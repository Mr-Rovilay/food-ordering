/* eslint-disable @typescript-eslint/no-explicit-any */
import { Orders } from "./orderType";

export type MenuItem = {
    category: string;
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    menus: MenuItem[];
    imageUrl: string;
    featured: boolean;
    rating: number;
    reviews: number;
    description: string;
    address: string;
    website: string;
    openingHours: string;
    phone: string;
    instagram: string;
    facebook:string   
}

export type SearchedRestaurant = {
    data: Restaurant[]
}

export type RestaurantState = {
    loading: boolean;
    restaurant: Restaurant | null;
    searchedRestaurant: SearchedRestaurant | null;
    appliedFilter: string[];
    singleRestaurant: Restaurant | null;
    restaurantOrder: Orders[];
    createRestaurant: (formData: FormData) => Promise<void>;
    getRestaurant: () => Promise<void>;
    updateRestaurant: (formData: FormData) => Promise<void>;
    searchRestaurant: (searchText: string, searchQuery: string, selectedCuisines: any) => Promise<void>;
    addMenuToRestaurant: (menu: MenuItem) => void;
    updateMenuToRestaurant: (menu: MenuItem) => void;
    setAppliedFilter: (value: string) => void;
    resetAppliedFilter: () => void;
    getSingleRestaurant: (restaurantId: string) => Promise<void>;
    getRestaurantOrders: () => Promise<void>;
    updateRestaurantOrder: (orderId: string, status: string) => Promise<void>;
}