import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Lock,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ChapaPaymentProps {
  amount?: number;
  currency?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  description?: string;
  publicKey?: string;
  recipeId?: string;
  recipeTitle?: string;
  onSuccess?: (reference: string) => void;
  onCancel?: () => void;
  onError?: (error: string) => void;
}

/**
 * ChapaPayment Component
 *
 * This component handles payments for premium recipes using the Chapa payment gateway.
 * In a production environment, this would integrate with a Golang backend using Hasura Actions
 * to process the payment securely.
 *
 * Features:
 * - Collects user payment information
 * - Handles payment processing states (loading, success, error)
 * - Provides callbacks for payment events
 * - Supports premium recipe purchases
 */
const ChapaPayment = ({
  amount = 100,
  currency = "ETB",
  email = "customer@example.com",
  firstName = "John",
  lastName = "Doe",
  title = "Complete Your Payment",
  description = "Secure payment processing via Chapa",
  publicKey = "CHAPUBK_TEST-X7Mzs6YCxLvNbaqWe3YdyFWt46N15R1w", // Replace with your actual public key
  recipeId = "",
  recipeTitle = "Premium Recipe",
  onSuccess = () => {},
  onCancel = () => {},
  onError = () => {},
}: ChapaPaymentProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState({
    email,
    firstName,
    lastName,
    amount: amount.toString(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const initiatePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation with Golang backend and Hasura:
      // 1. Call Hasura Action to initiate payment
      // 2. Golang backend would handle the Chapa API call
      // 3. Use JWT for authentication
      // 4. Store transaction in database with Hasura/Postgres

      // Simulate API call to backend
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate a random transaction reference
      const txRef = `TX-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

      // In production, backend would return Chapa checkout URL
      // window.location.href = `https://checkout.chapa.co/checkout/${txRef}`;

      // For demo, simulate success
      setSuccess(true);
      onSuccess(txRef);

      // In production, this would trigger a Hasura event to update user permissions
      // for accessing the premium recipe content
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Payment initialization failed";
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-center text-green-600 flex items-center justify-center">
            <CheckCircle2 className="mr-2 h-6 w-6" />
            Payment Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Your payment has been processed successfully.</p>
          <p className="text-sm text-gray-600 mb-2">You now have access to:</p>
          <p className="font-medium text-primary">{recipeTitle}</p>
          <p className="text-sm text-gray-500 mt-4">
            A confirmation has been sent to your email.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => setSuccess(false)}>Return to Recipe</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        {recipeTitle && (
          <div className="mt-2 p-2 bg-gray-50 rounded-md">
            <p className="text-sm font-medium">Recipe: {recipeTitle}</p>
            <p className="text-sm text-gray-500">Premium Content</p>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={paymentData.firstName}
            onChange={handleInputChange}
            placeholder="John"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={paymentData.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={paymentData.email}
            onChange={handleInputChange}
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount ({currency})</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={paymentData.amount}
            onChange={handleInputChange}
            placeholder="100"
          />
        </div>

        <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
          <Lock className="h-4 w-4 mr-1" />
          <span>Secured by Chapa Payment Gateway</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          onClick={initiatePayment}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" />
              Pay {currency} {paymentData.amount}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChapaPayment;
