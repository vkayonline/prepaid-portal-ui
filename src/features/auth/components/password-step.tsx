import { Button } from "@/commons/components/ui/button";
import { Input } from "@/commons/components/ui/input";
import { Label } from "@/commons/components/ui/label";
import { apiClient } from "@/services/api";
import { useState } from "react";

type PasswordStepProps = {
  email: string;
  setStep: (step: "2fa") => void;
  onLogin: (token: string) => void;
};

export function PasswordStep({ email, setStep, onLogin }: PasswordStepProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { twoFactor, token } = await apiClient.login(email, password);
      if (twoFactor) {
        console.log("PasswordStep: 2FA required. Setting step to '2fa'.");
        setStep("2fa");
      } else if (token) {
        console.log("PasswordStep: Login successful. Calling onLogin with token:", token);
        onLogin(token);
      } else {
        console.log("PasswordStep: Invalid credentials.");
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Enter Password</h1>
      <p className="text-muted-foreground">
        Enter your password for <span className="font-semibold">{email}</span>.
      </p>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus // Added autoFocus
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
