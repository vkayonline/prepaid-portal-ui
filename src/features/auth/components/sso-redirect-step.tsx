import { useEffect } from "react";

export function SsoRedirectStep() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://google.com";
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="text-2xl font-bold">Redirecting for SSO</h1>
      <p className="text-muted-foreground">
        You will be redirected to your single sign-on provider to complete the
        sign-in process.
      </p>
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </div>
  );
}
