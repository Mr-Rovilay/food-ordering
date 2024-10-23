import mongoose, { Schema, Document } from 'mongoose';

// Interface for menu item
interface IMenuItem extends Document {
  name: string;
  image: string;
  price: string;
  description: string;
}

// Interface for menu category
interface IMenuCategory extends Document {
  category: string;
  items: IMenuItem[];
}

// Interface for restaurant
interface IRestaurant extends Document {
  name: string;
  rating: number;
  reviews: number;
  description: string;
  address: string;
  openingHours: string;
  phone: string;
  website: string;
  instagram: string;
  facebook: string;
  cuisines: string[];
  imageUrl: string;
  menu: IMenuCategory[];
}

// Schema for menu item
const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true }
});

// Schema for menu category
const MenuCategorySchema: Schema = new Schema({
  category: { type: String, required: true },
  items: [MenuItemSchema]
});

// Schema for restaurant
const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  openingHours: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  instagram: { type: String, required: true },
  facebook: { type: String, required: true },
  cuisines: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  menu: [MenuCategorySchema]
});

// Create and export the model
export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);

