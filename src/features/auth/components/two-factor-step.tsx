import { Button } from "@/commons/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/commons/components/ui/card";
import { Input } from "@/commons/components/ui/input";
import { apiClient } from "@/services/api";
import { useState } from "react";

type TwoFactorStepProps = {
  onLogin: (token: string) => void;
};

export function TwoFactorStep({ onLogin }: TwoFactorStepProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { token } = await apiClient.verifyTwoFactor(otp);
      if (token) {
        console.log("TwoFactorStep: 2FA successful. Calling onLogin with token:", token);
        onLogin(token);
      } else {
        console.log("TwoFactorStep: Invalid OTP.");
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            required
            maxLength={6}
            autoFocus // Added autoFocus
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
