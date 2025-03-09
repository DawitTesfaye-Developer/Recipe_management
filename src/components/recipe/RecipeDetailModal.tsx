import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Heart,
  Bookmark,
  Star,
  User,
  MessageCircle,
  ChevronRight,
  DollarSign,
  Share2,
  Printer,
  Plus,
  Send,
} from "lucide-react";

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

interface Instruction {
  step: number;
  description: string;
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  date: string;
}

interface RecipeDetailModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  cuisine?: string;
  category?: string;
  author?: {
    name: string;
    avatar: string;
  };
  ingredients?: Ingredient[];
  instructions?: Instruction[];
  rating?: number;
  ratingCount?: number;
  isPremium?: boolean;
  price?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  comments?: Comment[];
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
  onRate?: (id: string, rating: number) => void;
  onComment?: (id: string, comment: string) => void;
  onPay?: (id: string) => void;
}

const RecipeDetailModal = ({
  open = true,
  onOpenChange = () => {},
  id = "1",
  title = "Delicious Pasta Carbonara",
  description = "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper. This authentic carbonara recipe is creamy, delicious and surprisingly easy to make at home.",
  image = "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80",
  prepTime = 15,
  cookTime = 15,
  servings = 4,
  cuisine = "Italian",
  category = "Main Course",
  author = {
    name: "Chef Maria",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  },
  ingredients = [
    { name: "Spaghetti", amount: "400", unit: "g" },
    { name: "Eggs", amount: "4", unit: "large" },
    { name: "Pancetta", amount: "150", unit: "g" },
    { name: "Parmesan cheese", amount: "50", unit: "g" },
    { name: "Black pepper", amount: "1", unit: "tsp" },
    { name: "Salt", amount: "to taste", unit: "" },
  ],
  instructions = [
    {
      step: 1,
      description:
        "Bring a large pot of salted water to boil and cook spaghetti according to package instructions.",
    },
    {
      step: 2,
      description:
        "While pasta cooks, cut pancetta into small cubes and fry in a large pan until crispy.",
    },
    {
      step: 3,
      description:
        "In a bowl, whisk eggs and grated parmesan cheese together. Season with black pepper.",
    },
    {
      step: 4,
      description:
        "Drain pasta, reserving a cup of pasta water. Add pasta to the pan with pancetta.",
    },
    {
      step: 5,
      description:
        "Remove pan from heat and quickly stir in the egg mixture, tossing continuously to create a creamy sauce.",
    },
    {
      step: 6,
      description:
        "If needed, add a splash of reserved pasta water to loosen the sauce. Serve immediately with extra parmesan and black pepper.",
    },
  ],
  rating = 4.7,
  ratingCount = 128,
  isPremium = false,
  price = 2.99,
  isLiked = false,
  isBookmarked = false,
  comments = [
    {
      id: "c1",
      user: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      text: "Made this last night and it was amazing! The sauce was perfectly creamy.",
      date: "2 days ago",
    },
    {
      id: "c2",
      user: {
        name: "Sarah Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      text: "I added a bit of garlic and it was delicious. Will definitely make again!",
      date: "1 week ago",
    },
  ],
  onLike = () => {},
  onBookmark = () => {},
  onRate = () => {},
  onComment = () => {},
  onPay = () => {},
}: RecipeDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const [newComment, setNewComment] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const handleLike = () => {
    onLike(id);
  };

  const handleBookmark = () => {
    onBookmark(id);
  };

  const handleRate = (rating: number) => {
    setUserRating(rating);
    onRate(id, rating);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(id, newComment);
      setNewComment("");
    }
  };

  const handlePayment = () => {
    // In a real implementation, this would integrate with Chapa payment
    onPay(id);
    setShowPaymentForm(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-0">
        <div className="relative w-full h-[300px] overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          {isPremium && (
            <Badge
              variant="default"
              className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-600"
            >
              Premium
            </Badge>
          )}
        </div>

        <DialogHeader className="p-6 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
              <div className="flex items-center mt-2 space-x-4">
                <Badge variant="secondary">{cuisine}</Badge>
                <Badge variant="outline">{category}</Badge>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {prepTime + cookTime} mins
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">
                    {rating} ({ratingCount})
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
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
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Printer className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium">{author.name}</span>
          </div>

          <p className="mt-4 text-gray-700">{description}</p>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full px-6"
        >
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Recipe Details
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Comments ({comments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                <p className="text-sm text-gray-500 mb-2">
                  For {servings} servings
                </p>
                <ul className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      <span>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Preparation Info
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Prep Time</p>
                      <p className="font-medium">{prepTime} mins</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Cook Time</p>
                      <p className="font-medium">{cookTime} mins</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Total Time</p>
                      <p className="font-medium">{prepTime + cookTime} mins</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                <ol className="space-y-4">
                  {instructions.map((instruction) => (
                    <li key={instruction.step} className="flex">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm mr-3">
                        {instruction.step}
                      </span>
                      <p className="text-gray-700">{instruction.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {isPremium && !showPaymentForm && (
              <div className="mt-8 p-4 border border-amber-200 bg-amber-50 rounded-lg">
                <h3 className="text-lg font-semibold flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-amber-500" />
                  Premium Recipe
                </h3>
                <p className="mt-2 mb-4">
                  This is a premium recipe. Purchase to unlock all instructions
                  and exclusive cooking tips.
                </p>
                <Button onClick={() => setShowPaymentForm(true)}>
                  Purchase for ${price.toFixed(2)}
                </Button>
              </div>
            )}

            {showPaymentForm && (
              <div className="mt-8 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Card Number
                    </label>
                    <Input placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Expiry Date
                      </label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        CVC
                      </label>
                      <Input placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Cardholder Name
                    </label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowPaymentForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handlePayment}>
                      Pay ${price.toFixed(2)}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Rate this recipe</h3>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-8 w-8 cursor-pointer ${
                      star <= userRating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRate(star)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="py-4">
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{comment.user.name}</h4>
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))}

              <Separator className="my-6" />

              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold">Add a comment</h3>
                <Textarea
                  placeholder="Share your experience with this recipe..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!newComment.trim()}>
                    <Send className="h-4 w-4 mr-2" /> Post Comment
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="p-6 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailModal;
