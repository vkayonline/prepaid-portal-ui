import { Button } from "@/commons/components/ui/button";
import { Input } from "@/commons/components/ui/input";
import { BellIcon, PlusIcon, SearchIcon } from "lucide-react";

export function Header({ title }: { title: string }) {
  return (
    <header className="border-b bg-card sticky top-0 z-10">
      <div className="flex items-center justify-between whitespace-nowrap max-w-7xl mx-auto px-6 lg:px-10 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="lg:hidden">
            <span className="material-symbols-outlined">menu</span>
          </Button>
          <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        </div>
        <div className="flex flex-1 justify-end items-center gap-4">
          <div className="hidden md:flex items-center relative">
            <SearchIcon className="absolute left-3 text-muted-foreground" />
            <Input
              className="pl-10 !h-10 max-w-64"
              placeholder="Search applications..."
            />
          </div>
          <Button variant="outline" size="icon">
            <BellIcon />
          </Button>
          <Button className="hidden sm:flex gap-2">
            <PlusIcon />
            <span className="truncate">New Onboarding</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
