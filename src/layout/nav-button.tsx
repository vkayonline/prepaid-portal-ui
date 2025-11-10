import { Button } from "@/commons/components/ui/button";
import { cn } from "@/commons/lib/utils";
import type {ReactNode} from "react";
import { Link, useLocation } from "react-router-dom";

type NavButtonProps = {
  to: string;
  icon: ReactNode;
  label: string;
};

export function NavButton({ to, icon, label }: NavButtonProps) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      className={cn("gap-3 px-3 py-2 justify-start", {
        "text-primary": isActive,
      })}
    >
      <Link to={to}>
        {icon}
        <p className="text-sm font-medium leading-normal">{label}</p>
      </Link>
    </Button>
  );
}
