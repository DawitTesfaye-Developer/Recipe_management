import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import {
  Filter,
  ChevronDown,
  Clock,
  Globe,
  UtensilsCrossed,
} from "lucide-react";

interface RecipeFiltersProps {
  categories?: string[];
  cuisines?: string[];
  prepTimes?: { label: string; value: string }[];
  selectedCategory?: string;
  selectedCuisine?: string;
  selectedPrepTime?: string;
  showPremiumOnly?: boolean;
  onCategoryChange?: (category: string) => void;
  onCuisineChange?: (cuisine: string) => void;
  onPrepTimeChange?: (prepTime: string) => void;
  onPremiumToggle?: (isPremium: boolean) => void;
  onClearFilters?: () => void;
}

const RecipeFilters = ({
  categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snacks",
    "Beverages",
  ],
  cuisines = [
    "All",
    "Italian",
    "Mexican",
    "Chinese",
    "Indian",
    "Japanese",
    "Mediterranean",
    "American",
    "Thai",
  ],
  prepTimes = [
    { label: "Any time", value: "any" },
    { label: "Under 15 minutes", value: "under15" },
    { label: "15-30 minutes", value: "15-30" },
    { label: "30-60 minutes", value: "30-60" },
    { label: "Over 60 minutes", value: "over60" },
  ],
  selectedCategory = "All",
  selectedCuisine = "All",
  selectedPrepTime = "any",
  showPremiumOnly = false,
  onCategoryChange = () => {},
  onCuisineChange = () => {},
  onPrepTimeChange = () => {},
  onPremiumToggle = () => {},
  onClearFilters = () => {},
}: RecipeFiltersProps) => {
  return (
    <div className="w-full py-4 px-4 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium">Filters</h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <UtensilsCrossed className="h-4 w-4 text-gray-500 hidden sm:block" />
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cuisine Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Globe className="h-4 w-4 text-gray-500 hidden sm:block" />
              <Select value={selectedCuisine} onValueChange={onCuisineChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Cuisine" />
                </SelectTrigger>
                <SelectContent>
                  {cuisines.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Prep Time Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Clock className="h-4 w-4 text-gray-500 hidden sm:block" />
              <Select value={selectedPrepTime} onValueChange={onPrepTimeChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Prep Time" />
                </SelectTrigger>
                <SelectContent>
                  {prepTimes.map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Premium Toggle */}
            <Toggle
              pressed={showPremiumOnly}
              onPressedChange={onPremiumToggle}
              className="h-9 px-3 gap-1 w-full sm:w-auto"
              variant="outline"
            >
              <span className="whitespace-nowrap">Premium Only</span>
              {showPremiumOnly && (
                <Badge
                  variant="secondary"
                  className="ml-1 bg-amber-100 text-amber-800"
                >
                  ON
                </Badge>
              )}
            </Toggle>
          </div>

          {/* Clear Filters Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700 w-full md:w-auto"
          >
            Clear Filters
          </Button>
        </div>

        {/* Active Filters Display */}
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedCategory !== "All" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {selectedCategory}
            </Badge>
          )}
          {selectedCuisine !== "All" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Cuisine: {selectedCuisine}
            </Badge>
          )}
          {selectedPrepTime !== "any" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Time: {prepTimes.find((t) => t.value === selectedPrepTime)?.label}
            </Badge>
          )}
          {showPremiumOnly && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 bg-amber-100 text-amber-800"
            >
              Premium Only
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;
