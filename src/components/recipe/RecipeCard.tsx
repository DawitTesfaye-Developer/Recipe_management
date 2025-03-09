import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Heart, Bookmark, Star } from "lucide-react";

interface RecipeCardProps {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  prepTime?: number;
  cuisine?: string;
  rating?: number;
  isPremium?: boolean;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onClick?: (id: string) => void;
}

const RecipeCard = ({
  id = "1",
  title = "Delicious Pasta Carbonara",
  description = "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
  image = "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80",
  prepTime = 30,
  cuisine = "Italian",
  rating = 4.5,
  isPremium = false,
  isLiked = false,
  isBookmarked = false,
  onLike = () => {},
  onBookmark = () => {},
  onClick = () => {},
}: RecipeCardProps) => {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark(id);
  };

  const handleClick = () => {
    onClick(id);
  };

  return (
    <Card
      className="w-full max-w-[350px] h-[400px] overflow-hidden cursor-pointer transition-transform hover:scale-105 bg-white"
      onClick={handleClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {isPremium && (
          <Badge
            variant="default"
            className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600"
          >
            Premium
          </Badge>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-1">
            {title}
          </CardTitle>
          <Badge variant="secondary" className="ml-2">
            {cuisine}
          </Badge>
        </div>
        <div className="flex items-center mt-1">
          <Clock className="h-4 w-4 mr-1 text-gray-500" />
          <span className="text-xs text-gray-500">{prepTime} mins</span>
          <div className="flex items-center ml-3">
            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
            <span className="text-xs">{rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <CardDescription className="text-sm line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="ghost"
          size="icon"
          className={`${isLiked ? "text-red-500" : "text-gray-500"}`}
          onClick={handleLike}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`${isBookmarked ? "text-blue-500" : "text-gray-500"}`}
          onClick={handleBookmark}
        >
          <Bookmark
            className={`h-5 w-5 ${isBookmarked ? "fill-blue-500" : ""}`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
