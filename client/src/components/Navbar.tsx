import { Link } from "react-router-dom";
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "./ui/separator";

const Navbar = () => {
  const admin = true;
  const loading = false;
  return (
    <div className="sticky top-0 z-50 border border-b-1 max-padd-container">
      <div className="flex items-center justify-between h-16">
        <Link to={"/"}>
          <h1 className="text-xl font-bold md:font-extrabold">FoodPalace</h1>
        </Link>
        <div className="items-center hidden gap-10 md:flex">
          <div className="items-center hidden gap-6 md:flex">
          <Link to={"/"} className="text-sm font-medium transition-colors">Home</Link>
            <Link to={"/profile"} className="text-sm font-medium transition-colors">Profile</Link>
            <Link to={"/order/status"} className="text-sm font-medium transition-colors">Order</Link>
      
          {admin && (
            <Menubar >
              <MenubarMenu >
                <MenubarTrigger className="text-sm cursor-pointer">Dashboard</MenubarTrigger>
                <MenubarContent >
                  <Link to={"admin/restaurant"}>
                    <MenubarItem className="text-sm cursor-pointer">Restaurant</MenubarItem>
                  </Link>
                  <Link to={"admin/Menu"}>
                    <MenubarItem className="text-sm cursor-pointer">Menu</MenubarItem>
                  </Link>
                  <Link to={"admin/orders"}>
                    <MenubarItem className="text-sm cursor-pointer">Orders</MenubarItem>
                  </Link>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Light</DropdownMenuItem>
                <DropdownMenuItem>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link to={"/cart"} className="relative cursor-pointer">
            <ShoppingCart />
            <Button
              size={"icon"}
              className="absolute w-4 h-4 text-xs bg-red-500 rounded-full -inset-y-3 left-2 hover:bg-red-500"
            >
              5
            </Button>
          </Link>
          <div className="">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="">
            {loading ? (
              <Button className="bg-green hover:bg-hoverGreen">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="text-sm bg-green hover:bg-hoverGreen">Logout</Button>
            )}
          </div>
        </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* mobile responsiveness */}
        <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
const MobileNav  =() => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant="outline" className="text-black bg-gray-200 hover:bg-gray-500">
          <Menu size={"16"}/>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>FoodPalace</SheetTitle>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Light</DropdownMenuItem>
                <DropdownMenuItem>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2"/>
        <SheetDescription className="flex-1">
          <Link to={"/profile"} className="flex items-center gap-4 px-3 py-2 font-medium rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900">
          <User/>
          <span>Profile</span>
          </Link>
          <Link to={"/order"} className="flex items-center gap-4 px-3 py-2 font-medium rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900">
          <HandPlatter/>
          <span>Order</span>
          </Link>
          <Link to={"/profile"} className="flex items-center gap-4 px-3 py-2 font-medium rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900">
          <ShoppingCart/>
          <span>Cart (0)</span>
          </Link>
          <Link to={"/menu"} className="flex items-center gap-4 px-3 py-2 font-medium rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900">
          <SquareMenu/>
          <span>Menu</span>
          </Link>
          <Link to={"/orders"} className="flex items-center gap-4 px-3 py-2 font-medium rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900">
          <UtensilsCrossed/>
          <span>Restaurant</span>
          </Link>
          <Link to={"/profile"} className="flex items-center gap-4 px-3 py-2 font-medium rounded-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900">
          <PackageCheck/>
          <span>Restaurant Orders</span>
          </Link>
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-2">     
              <div className="flex flex-row items-center gap-2">
                <Avatar>
                  <AvatarImage/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-bold">Ayodeji</h1>
              </div>
            
              <SheetClose asChild>
              <Button type="submit" className="bg-green hover:bg-hoverGreen">Logout</Button>
            </SheetClose> 
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )   
}