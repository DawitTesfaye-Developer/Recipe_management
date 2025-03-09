import React, { useState } from "react";
import Header from "./layout/Header";
import RecipeFilters from "./recipe/RecipeFilters";
import RecipeGrid from "./recipe/RecipeGrid";
import AuthModal from "./auth/AuthModal";
import RecipeDetailModal from "./recipe/RecipeDetailModal";
import CreateRecipeModal from "./recipe/CreateRecipeModal";
import Footer from "./common/Footer";

const Home = () => {
  // State for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  // State for recipe modals
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);
  const [showCreateRecipe, setShowCreateRecipe] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedPrepTime, setSelectedPrepTime] = useState("any");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock recipes data
  const recipes = [
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
  ];

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
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleRecipeClick = (id: string) => {
    setSelectedRecipeId(id);
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
    console.log(`Searching for: ${query}`);
    // In a real app, this would filter recipes based on the query
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedCuisine("All");
    setSelectedPrepTime("any");
    setShowPremiumOnly(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        userName="John Doe"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
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
          recipes={recipes}
          onRecipeClick={handleRecipeClick}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {/* Floating Action Button for Create Recipe */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleCreateRecipe}
            className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </button>
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
      />

      <CreateRecipeModal
        open={showCreateRecipe}
        onOpenChange={setShowCreateRecipe}
        onSubmit={(data) => {
          console.log("Recipe created:", data);
          setShowCreateRecipe(false);
        }}
      />
    </div>
  );
};

export default Home;
