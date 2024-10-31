import { Orders } from "./orderType";

// Category enum to ensure type safety for menu item categories
export enum MenuCategory {
    Appetizer = "Appetizer",
    MainCourse = "Main Course",
    Dessert = "Dessert",
    Swallows = "Swallows",
    Drinks = "Drinks",
    RiceDishes = "Rice Dishes",
    Soups = "Soups",
    Stews = "Stews",
    Grilled = "Grilled"
  }
  
  // Menu item interface
  export interface MenuItem {
    _id: string;
    category: MenuCategory;
    name: string;
    description: string;
    price: number;
    image: string;
  }
  
  // Restaurant interface
  export interface Restaurant {
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
    facebook: string;
  }
  
  // Search result interface
  export interface SearchedRestaurant {
    data: Restaurant[];
  }
  
  // Type for the filter parameters in search
  export interface SearchParams {
    searchText: string;
    searchQuery: string;
    selectedCuisines: string[]; // Changed from 'any' to be more specific
  }
  
  // Restaurant state interface
  export interface RestaurantState {
    loading: boolean;
    restaurant: Restaurant | null;
    searchedRestaurant: SearchedRestaurant | null;
    appliedFilter: string[];
    singleRestaurant: Restaurant | null;
    restaurantOrder: Orders[]; // Assuming Orders type is imported
  
    // Methods
    createRestaurant: (formData: FormData) => Promise<void>;
    getRestaurant: () => Promise<void>;
    updateRestaurant: (formData: FormData) => Promise<void>;
    searchRestaurant: (
      searchText: string,
      searchQuery: string,
      selectedCuisines: string[]
    ) => Promise<void>;
    addMenuToRestaurant: (menu: MenuItem) => void;
    updateMenuToRestaurant: (menu: MenuItem) => void;
    setAppliedFilter: (value: string) => void;
    resetAppliedFilter: () => void;
    getSingleRestaurant: (restaurantId: string) => Promise<void>;
    getRestaurantOrders: () => Promise<void>;
    updateRestaurantOrder: (orderId: string, status: string) => Promise<void>;
  }