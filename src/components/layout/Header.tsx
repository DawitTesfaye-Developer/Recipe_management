import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Menu,
  ChefHat,
  LogIn,
  UserPlus,
  User,
  LogOut,
  Heart,
  BookOpen,
} from "lucide-react";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  onLogin?: () => void;
  onSignup?: () => void;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
  onProfileClick?: () => void;
  onSavedRecipesClick?: () => void;
  onMyRecipesClick?: () => void;
}

const Header = ({
  isLoggedIn = false,
  userName = "Guest User",
  userAvatar = "",
  onLogin = () => {},
  onSignup = () => {},
  onLogout = () => {},
  onSearch = () => {},
  onProfileClick = () => {},
  onSavedRecipesClick = () => {},
  onMyRecipesClick = () => {},
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">RecipeHub</span>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-md mx-4"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for recipes..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="ml-2">
            Search
          </Button>
        </form>

        {/* Auth Buttons or User Menu */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userName}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSavedRecipesClick}>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Saved Recipes</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onMyRecipesClick}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>My Recipes</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={onLogin}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button onClick={onSignup}>
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
