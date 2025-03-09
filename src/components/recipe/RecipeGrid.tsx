import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cuisine: string;
  rating: number;
  isPremium: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface RecipeGridProps {
  recipes?: Recipe[];
  isLoading?: boolean;
  onRecipeClick?: (id: string) => void;
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const RecipeGrid = ({
  recipes = [
    {
      id: "1",
      title: "Delicious Pasta Carbonara",
      description:
        "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
      image:
        "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80",
      prepTime: 30,
      cuisine: "Italian",
      rating: 4.5,
      isPremium: false,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "2",
      title: "Spicy Thai Curry",
      description:
        "Authentic Thai curry with coconut milk, vegetables, and your choice of protein.",
      image:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
      prepTime: 45,
      cuisine: "Thai",
      rating: 4.8,
      isPremium: true,
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: "3",
      title: "Classic Beef Burger",
      description:
        "Juicy beef patty with lettuce, tomato, cheese, and special sauce on a brioche bun.",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
      prepTime: 25,
      cuisine: "American",
      rating: 4.3,
      isPremium: false,
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: "4",
      title: "Vegetable Stir Fry",
      description:
        "Quick and healthy stir-fried vegetables with a savory sauce.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
      prepTime: 20,
      cuisine: "Asian",
      rating: 4.1,
      isPremium: false,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "5",
      title: "Chocolate Lava Cake",
      description:
        "Decadent chocolate cake with a molten center, served with vanilla ice cream.",
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
      prepTime: 40,
      cuisine: "Dessert",
      rating: 4.9,
      isPremium: true,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "6",
      title: "Mediterranean Salad",
      description:
        "Fresh salad with cucumbers, tomatoes, olives, feta cheese, and olive oil dressing.",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
      prepTime: 15,
      cuisine: "Mediterranean",
      rating: 4.2,
      isPremium: false,
      isLiked: false,
      isBookmarked: false,
    },
  ],
  isLoading = false,
  onRecipeClick = () => {},
  onLike = () => {},
  onBookmark = () => {},
  currentPage = 1,
  totalPages = 5,
  onPageChange = () => {},
}: RecipeGridProps) => {
  // Local state to manage likes and bookmarks if needed
  const [localRecipes, setLocalRecipes] = useState<Recipe[]>(recipes);

  const handleLike = (id: string) => {
    // Update local state for immediate UI feedback
    setLocalRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isLiked: !recipe.isLiked } : recipe,
      ),
    );
    // Call the parent handler
    onLike(id);
  };

  const handleBookmark = (id: string) => {
    // Update local state for immediate UI feedback
    setLocalRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isBookmarked: !recipe.isBookmarked }
          : recipe,
      ),
    );
    // Call the parent handler
    onBookmark(id);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-[600px]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : localRecipes.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[600px]">
          <h3 className="text-xl font-semibold mb-4">No recipes found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your filters or search criteria
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {localRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                prepTime={recipe.prepTime}
                cuisine={recipe.cuisine}
                rating={recipe.rating}
                isPremium={recipe.isPremium}
                isLiked={recipe.isLiked}
                isBookmarked={recipe.isBookmarked}
                onClick={onRecipeClick}
                onLike={handleLike}
                onBookmark={handleBookmark}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => onPageChange(page)}
                    className="mx-1 h-8 w-8"
                  >
                    {page}
                  </Button>
                ),
              )}

              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeGrid;
