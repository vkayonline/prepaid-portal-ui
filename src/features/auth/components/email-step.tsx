import { Button } from "@/commons/components/ui/button";
import { Input } from "@/commons/components/ui/input";
import { Label } from "@/commons/components/ui/label";
import { apiClient } from "@/services/api";
import { useState } from "react";

type EmailStepProps = {
  setEmail: (email: string) => void;
  setStep: (step: "password" | "sso-redirect") => void;
};

export function EmailStep({ setEmail, setStep }: EmailStepProps) {
  const [localEmail, setLocalEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { sso } = await apiClient.checkSso(localEmail);
      if (sso) {
        setStep("sso-redirect");
      } else {
        setStep("password");
      }
    } catch (err) {
      setError("Failed to check SSO. Please try again.");
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <p className="text-muted-foreground">
        Enter your email to sign in to your account.
      </p>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john.doe@example.com"
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
          required
          autoFocus // Added autoFocus
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Continuing..." : "Continue"}
      </Button>
    </form>
  );
}
