import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, Plus, X, Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  ingredients: z
    .array(z.string())
    .min(1, { message: "Add at least one ingredient" }),
  instructions: z
    .array(z.string())
    .min(1, { message: "Add at least one instruction" }),
  prepTime: z.number().min(1, { message: "Preparation time is required" }),
  cuisine: z.string().min(1, { message: "Cuisine is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  isPremium: z.boolean().default(false),
  images: z.array(z.string()).min(1, { message: "Add at least one image" }),
});

type RecipeFormValues = z.infer<typeof formSchema>;

interface CreateRecipeModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: RecipeFormValues) => void;
}

const CreateRecipeModal = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
}: CreateRecipeModalProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [ingredients, setIngredients] = useState<string[]>([
    "Flour",
    "Sugar",
    "Eggs",
  ]);
  const [newIngredient, setNewIngredient] = useState("");
  const [instructions, setInstructions] = useState<string[]>([
    "Preheat oven to 350°F",
    "Mix dry ingredients",
  ]);
  const [newInstruction, setNewInstruction] = useState("");
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80",
  ]);

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      ingredients: ingredients,
      instructions: instructions,
      prepTime: 30,
      cuisine: "",
      category: "",
      isPremium: false,
      images: images,
    },
  });

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      const updatedIngredients = [...ingredients, newIngredient.trim()];
      setIngredients(updatedIngredients);
      form.setValue("ingredients", updatedIngredients);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
    form.setValue("ingredients", updatedIngredients);
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      const updatedInstructions = [...instructions, newInstruction.trim()];
      setInstructions(updatedInstructions);
      form.setValue("instructions", updatedInstructions);
      setNewInstruction("");
    }
  };

  const handleRemoveInstruction = (index: number) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
    form.setValue("instructions", updatedInstructions);
  };

  const handleImageUpload = () => {
    // In a real implementation, this would handle file uploads
    // For now, we'll just add a placeholder image
    const newImage = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=800&q=80`;
    const updatedImages = [...images, newImage];
    setImages(updatedImages);
    form.setValue("images", updatedImages);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    form.setValue("images", updatedImages);
  };

  const onFormSubmit = (data: RecipeFormValues) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const nextTab = () => {
    if (activeTab === "basic") setActiveTab("ingredients");
    else if (activeTab === "ingredients") setActiveTab("instructions");
    else if (activeTab === "instructions") setActiveTab("images");
  };

  const prevTab = () => {
    if (activeTab === "images") setActiveTab("instructions");
    else if (activeTab === "instructions") setActiveTab("ingredients");
    else if (activeTab === "ingredients") setActiveTab("basic");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[800px] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Recipe
          </DialogTitle>
          <DialogDescription>
            Share your culinary masterpiece with the world. Fill in the details
            below to create your recipe.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-6"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipe Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Delicious Chocolate Cake"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Give your recipe a descriptive title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A rich, moist chocolate cake perfect for any occasion..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe your recipe and what makes it special.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="prepTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preparation Time (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cuisine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cuisine</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cuisine" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="italian">Italian</SelectItem>
                            <SelectItem value="mexican">Mexican</SelectItem>
                            <SelectItem value="indian">Indian</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                            <SelectItem value="ethiopian">Ethiopian</SelectItem>
                            <SelectItem value="american">American</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                          <SelectItem value="dessert">Dessert</SelectItem>
                          <SelectItem value="snack">Snack</SelectItem>
                          <SelectItem value="beverage">Beverage</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPremium"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Premium Recipe
                        </FormLabel>
                        <FormDescription>
                          Mark this recipe as premium content that requires
                          payment to access.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="ingredients" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Ingredients</h3>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add an ingredient"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" onClick={handleAddIngredient}>
                      <Plus className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>

                  <div className="border rounded-md p-4">
                    {ingredients.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No ingredients added yet. Add some ingredients to your
                        recipe.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {ingredients.map((ingredient, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                          >
                            <span>{ingredient}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveIngredient(index)}
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="instructions" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Instructions</h3>
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Add a step-by-step instruction"
                      value={newInstruction}
                      onChange={(e) => setNewInstruction(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAddInstruction}
                      className="self-start"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>

                  <div className="border rounded-md p-4">
                    {instructions.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">
                        No instructions added yet. Add step-by-step instructions
                        for your recipe.
                      </p>
                    ) : (
                      <ol className="space-y-4 list-decimal list-inside">
                        {instructions.map((instruction, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-start p-3 bg-gray-50 rounded-md"
                          >
                            <span className="text-sm">{instruction}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveInstruction(index)}
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recipe Images</h3>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Camera className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Upload high-quality images of your recipe
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={handleImageUpload}
                    >
                      <Upload className="h-4 w-4 mr-2" /> Upload Image
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Recipe image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex justify-between sm:justify-between">
              <div>
                {activeTab !== "basic" && (
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Previous
                  </Button>
                )}
              </div>
              <div>
                {activeTab !== "images" ? (
                  <Button type="button" onClick={nextTab}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Create Recipe</Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeModal;
