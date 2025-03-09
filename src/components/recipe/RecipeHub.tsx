import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import RecipeFilters from "./RecipeFilters";
import RecipeGrid from "./RecipeGrid";
import RecipeDetailModal from "./RecipeDetailModal";
import CreateRecipeModal from "./CreateRecipeModal";
import AuthModal from "../auth/AuthModal";
import ChapaPayment from "../payment/ChapaPayment";
import Footer from "../common/Footer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface RecipeHubProps {
  initialLoggedIn?: boolean;
}

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
  price?: number;
  category?: string;
  ingredients?: string[];
  instructions?: { step: number; description: string }[];
  author?: { name: string; avatar: string };
}

const RecipeHub = ({ initialLoggedIn = false }: RecipeHubProps) => {
  const { toast } = useToast();

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const [userData, setUserData] = useState({
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  });

  // Recipe modals state
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);
  const [showCreateRecipe, setShowCreateRecipe] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  // Payment state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPremiumRecipe, setSelectedPremiumRecipe] = useState<{
    id: string;
    title: string;
    price: number;
  } | null>(null);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedPrepTime, setSelectedPrepTime] = useState("any");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample recipes data
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: "1",
      title: "Delicious Pasta Carbonara",
      description:
        "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
      image:
        "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80",
      prepTime: 30,
      cuisine: "Italian",
      category: "Dinner",
      rating: 4.5,
      isPremium: false,
      isLiked: false,
      isBookmarked: false,
      author: {
        name: "Chef Maria",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      },
      ingredients: [
        "Spaghetti",
        "Eggs",
        "Pancetta",
        "Parmesan cheese",
        "Black pepper",
        "Salt",
      ],
      instructions: [
        {
          step: 1,
          description: "Boil pasta according to package instructions.",
        },
        { step: 2, description: "Fry pancetta until crispy." },
        { step: 3, description: "Mix eggs and cheese in a bowl." },
        { step: 4, description: "Combine all ingredients and serve." },
      ],
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
      category: "Dinner",
      rating: 4.8,
      isPremium: true,
      isLiked: false,
      isBookmarked: false,
      price: 299.99,
      author: {
        name: "Chef Sombat",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sombat",
      },
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
      category: "Lunch",
      rating: 4.3,
      isPremium: false,
      isLiked: false,
      isBookmarked: false,
      author: {
        name: "Chef Mike",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      },
    },
    {
      id: "4",
      title: "Ethiopian Doro Wat with Injera",
      description:
        "Traditional Ethiopian chicken stew served with injera flatbread.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
      prepTime: 60,
      cuisine: "Ethiopian",
      category: "Dinner",
      rating: 4.9,
      isPremium: true,
      isLiked: false,
      isBookmarked: false,
      price: 349.99,
      author: {
        name: "Chef Abeba",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abeba",
      },
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
      category: "Dessert",
      rating: 4.9,
      isPremium: true,
      isLiked: false,
      isBookmarked: false,
      price: 249.99,
      author: {
        name: "Chef Pierre",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre",
      },
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
      category: "Lunch",
      rating: 4.2,
      isPremium: false,
      isLiked: false,
      isBookmarked: false,
      author: {
        name: "Chef Elena",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      },
    },
  ]);

  // Filtered recipes
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  // Apply filters when filter state changes
  useEffect(() => {
    let result = [...recipes];

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter((recipe) => recipe.category === selectedCategory);
    }

    // Apply cuisine filter
    if (selectedCuisine !== "All") {
      result = result.filter((recipe) => recipe.cuisine === selectedCuisine);
    }

    // Apply prep time filter
    if (selectedPrepTime !== "any") {
      switch (selectedPrepTime) {
        case "under15":
          result = result.filter((recipe) => recipe.prepTime < 15);
          break;
        case "15-30":
          result = result.filter(
            (recipe) => recipe.prepTime >= 15 && recipe.prepTime <= 30,
          );
          break;
        case "30-60":
          result = result.filter(
            (recipe) => recipe.prepTime > 30 && recipe.prepTime <= 60,
          );
          break;
        case "over60":
          result = result.filter((recipe) => recipe.prepTime > 60);
          break;
      }
    }

    // Apply premium filter
    if (showPremiumOnly) {
      result = result.filter((recipe) => recipe.isPremium);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.cuisine.toLowerCase().includes(query),
      );
    }

    setFilteredRecipes(result);
  }, [
    recipes,
    selectedCategory,
    selectedCuisine,
    selectedPrepTime,
    showPremiumOnly,
    searchQuery,
  ]);

  // Handler functions
  const handleLogin = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthModalTab("signup");
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleAuthSuccess = (data: any) => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    toast({
      title: "Welcome!",
      description:
        authModalTab === "login"
          ? "You have successfully logged in."
          : "Your account has been created.",
    });
  };

  const handleRecipeClick = (id: string) => {
    const recipe = recipes.find((r) => r.id === id);
    setSelectedRecipeId(id);

    if (recipe?.isPremium && !isLoggedIn) {
      handleLogin();
      return;
    }

    setShowRecipeDetail(true);
  };

  const handleCreateRecipe = () => {
    if (isLoggedIn) {
      setShowCreateRecipe(true);
    } else {
      handleLogin();
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedCuisine("All");
    setSelectedPrepTime("any");
    setShowPremiumOnly(false);
    setSearchQuery("");
  };

  const handleBuyRecipe = (id: string) => {
    if (!isLoggedIn) {
      handleLogin();
      return;
    }

    const recipe = recipes.find((r) => r.id === id);
    if (recipe && recipe.isPremium) {
      setSelectedPremiumRecipe({
        id: recipe.id,
        title: recipe.title,
        price: recipe.price || 299.99,
      });
      setShowRecipeDetail(false);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = (reference: string) => {
    console.log(`Payment successful with reference: ${reference}`);
    setShowPaymentModal(false);

    // Update recipes to mark the purchased recipe as accessible
    if (selectedPremiumRecipe) {
      toast({
        title: "Payment Successful",
        description: `You now have access to ${selectedPremiumRecipe.title}`,
      });
    }

    setSelectedPremiumRecipe(null);
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    setSelectedPremiumRecipe(null);
  };

  const handleLikeRecipe = (id: string) => {
    if (!isLoggedIn) {
      handleLogin();
      return;
    }

    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, isLiked: !recipe.isLiked } : recipe,
      ),
    );

    const recipe = recipes.find((r) => r.id === id);
    const action = recipe?.isLiked ? "unliked" : "liked";

    toast({
      title: `Recipe ${action}`,
      description: `You have ${action} ${recipe?.title}`,
    });
  };

  const handleBookmarkRecipe = (id: string) => {
    if (!isLoggedIn) {
      handleLogin();
      return;
    }

    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isBookmarked: !recipe.isBookmarked }
          : recipe,
      ),
    );

    const recipe = recipes.find((r) => r.id === id);
    const action = recipe?.isBookmarked ? "removed from" : "added to";

    toast({
      title: `Recipe ${action} bookmarks`,
      description: `${recipe?.title} has been ${action} your bookmarks`,
    });
  };

  const handleCreateRecipeSubmit = (data: any) => {
    // Create a new recipe
    const newRecipe: Recipe = {
      id: `new-${Date.now()}`,
      title: data.title,
      description: data.description,
      image: data.images[0],
      prepTime: data.prepTime,
      cuisine: data.cuisine,
      category: data.category,
      rating: 0,
      isPremium: data.isPremium,
      isLiked: false,
      isBookmarked: false,
      author: {
        name: userData.name,
        avatar: userData.avatar,
      },
      ingredients: data.ingredients,
      instructions: data.instructions.map(
        (instruction: string, index: number) => ({
          step: index + 1,
          description: instruction,
        }),
      ),
    };

    // Add the new recipe to the list
    setRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
    setShowCreateRecipe(false);

    toast({
      title: "Recipe Created",
      description: `Your recipe "${data.title}" has been created successfully.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        userName={userData.name}
        userAvatar={userData.avatar}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />

      <main className="flex-1">
        {/* Filters */}
        <RecipeFilters
          selectedCategory={selectedCategory}
          selectedCuisine={selectedCuisine}
          selectedPrepTime={selectedPrepTime}
          showPremiumOnly={showPremiumOnly}
          onCategoryChange={setSelectedCategory}
          onCuisineChange={setSelectedCuisine}
          onPrepTimeChange={setSelectedPrepTime}
          onPremiumToggle={setShowPremiumOnly}
          onClearFilters={handleClearFilters}
        />

        {/* Recipe Grid */}
        <RecipeGrid
          recipes={filteredRecipes}
          onRecipeClick={handleRecipeClick}
          onLike={handleLikeRecipe}
          onBookmark={handleBookmarkRecipe}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isLoading={false}
          totalPages={Math.ceil(filteredRecipes.length / 6)}
        />

        {/* Floating Action Button for Create Recipe */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={handleCreateRecipe}
            className="rounded-full h-14 w-14 p-0 flex items-center justify-center shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
        onLogin={handleAuthSuccess}
        onSignup={handleAuthSuccess}
      />

      <RecipeDetailModal
        open={showRecipeDetail}
        onOpenChange={setShowRecipeDetail}
        id={selectedRecipeId || "1"}
        title={recipes.find((r) => r.id === selectedRecipeId)?.title}
        description={
          recipes.find((r) => r.id === selectedRecipeId)?.description
        }
        image={recipes.find((r) => r.id === selectedRecipeId)?.image}
        prepTime={recipes.find((r) => r.id === selectedRecipeId)?.prepTime}
        cuisine={recipes.find((r) => r.id === selectedRecipeId)?.cuisine}
        category={recipes.find((r) => r.id === selectedRecipeId)?.category}
        author={recipes.find((r) => r.id === selectedRecipeId)?.author}
        ingredients={recipes
          .find((r) => r.id === selectedRecipeId)
          ?.ingredients?.map((ing) => ({ name: ing, amount: "", unit: "" }))}
        instructions={
          recipes.find((r) => r.id === selectedRecipeId)?.instructions
        }
        rating={recipes.find((r) => r.id === selectedRecipeId)?.rating}
        isPremium={recipes.find((r) => r.id === selectedRecipeId)?.isPremium}
        price={recipes.find((r) => r.id === selectedRecipeId)?.price}
        isLiked={recipes.find((r) => r.id === selectedRecipeId)?.isLiked}
        isBookmarked={
          recipes.find((r) => r.id === selectedRecipeId)?.isBookmarked
        }
        onLike={handleLikeRecipe}
        onBookmark={handleBookmarkRecipe}
        onPay={() => {
          if (selectedRecipeId) {
            handleBuyRecipe(selectedRecipeId);
          }
        }}
      />

      <CreateRecipeModal
        open={showCreateRecipe}
        onOpenChange={setShowCreateRecipe}
        onSubmit={handleCreateRecipeSubmit}
      />

      {/* Payment Modal */}
      {showPaymentModal && selectedPremiumRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <ChapaPayment
              amount={selectedPremiumRecipe.price}
              currency="ETB"
              title="Premium Recipe Purchase"
              description="Complete your payment to unlock exclusive premium recipes"
              recipeId={selectedPremiumRecipe.id}
              recipeTitle={selectedPremiumRecipe.title}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
              onError={(error) => console.log(`Payment error: ${error}`)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeHub;
