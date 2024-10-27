import { Link } from "react-router-dom";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
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
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";

const Navbar = () => {
  const { user, loading,logout } = useUserStore();

  return (
    <nav className="fixed top-0 z-50 w-full border-b backdrop-blur-sm bg-white/75 dark:bg-slate-950/75">
      <div className="max-padd-container sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-transparent md:text-2xl md:font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text">
              Food<span className="text-green">Palace</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex items-center space-x-6">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/order/status">Order</NavLink>

              {user?.admin && (
                <Menubar className="bg-transparent border-none">
                  <MenubarMenu>
                    <MenubarTrigger className="text-sm font-medium transition-colors cursor-pointer hover:text-green">
                      Dashboard
                    </MenubarTrigger>
                    <MenubarContent className="min-w-[140px]">
                      <Link to="/admin/restaurant">
                        <MenubarItem className="text-sm cursor-pointer">
                          Restaurant
                        </MenubarItem>
                      </Link>
                      <Link to="/admin/menu">
                        <MenubarItem className="text-sm cursor-pointer">
                          Menu
                        </MenubarItem>
                      </Link>
                      <Link to="/admin/orders">
                        <MenubarItem className="text-sm cursor-pointer">
                          Orders
                        </MenubarItem>
                      </Link>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              )}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <Link to="/cart" className="relative p-2 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                  5
                </span>
              </Link>

              <Avatar className="w-8 h-8 transition transform hover:scale-105">
                <AvatarImage />
                <AvatarFallback className="bg-slate-200 dark:bg-slate-700">CN</AvatarFallback>
              </Avatar>

              {loading ? (
                <Button className="bg-green hover:bg-hoverGreen">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={logout} className="text-sm font-medium">
                  Logout
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Navigation Link Component
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-sm font-medium transition-colors text-slate-700 dark:text-slate-200 hover:text-green dark:hover:text-green"
  >
    {children}
  </Link>
);

// Theme Toggle Component
const ThemeToggle = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon" className="bg-transparent border-none hover:bg-slate-100 dark:hover:bg-slate-800">
        <Sun className="w-5 h-5 transition-transform scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute w-5 h-5 transition-transform scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="min-w-[100px]">
      <DropdownMenuItem className="cursor-pointer">Light</DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer">Dark</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// Mobile Navigation Component
const MobileNav = () => {
  const { user } = useUserStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="bg-transparent border-none hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px]">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">FoodPalace</SheetTitle>
            <ThemeToggle />
          </div>
          <Separator />
        </SheetHeader>

        <div className="flex flex-col mt-6 space-y-2">
          <MobileNavLink to="/profile" icon={<User className="w-5 h-5" />}>
            Profile
          </MobileNavLink>
          <MobileNavLink to="/order/status" icon={<HandPlatter className="w-5 h-5" />}>
            Order
          </MobileNavLink>
          <MobileNavLink to="/cart" icon={<ShoppingCart className="w-5 h-5" />}>
            Cart (0)
          </MobileNavLink>

          {user?.admin && (
            <>
              <Separator className="my-2" />
              <MobileNavLink to="/admin/menu" icon={<SquareMenu className="w-5 h-5" />}>
                Menu
              </MobileNavLink>
              <MobileNavLink to="/admin/restaurant" icon={<UtensilsCrossed className="w-5 h-5" />}>
                Restaurant
              </MobileNavLink>
              <MobileNavLink to="/admin/orders" icon={<PackageCheck className="w-5 h-5" />}>
                Restaurant Orders
              </MobileNavLink>
            </>
          )}
        </div>

        <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <div className="flex flex-col w-full space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage />
                <AvatarFallback className="bg-slate-200 dark:bg-slate-700">CN</AvatarFallback>
              </Avatar>
              <h1 className="text-lg font-bold">Ayodeji</h1>
            </div>
            <SheetClose asChild>
              <Button className="w-full bg-green hover:bg-hoverGreen">
                Logout
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center px-4 py-3 space-x-4 text-sm font-medium transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default Navbar;