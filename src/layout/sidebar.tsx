import { Avatar, AvatarFallback, AvatarImage } from "@/commons/components/ui/avatar";
import { LayoutDashboard, History, LogOut } from "lucide-react";
import { NavButton } from "./nav-button";

const mainNav = [
  {
    to: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    to: "/applications",
    icon: <History />,
    label: "Applications",
  },
];

export function Sidebar() {
  return (
    <aside className="flex-col w-64 bg-card border-r hidden lg:flex h-screen sticky top-0">
      <div className="flex h-full min-h-0 flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-3 py-3">
            <div className="size-8 text-primary">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">CorpPortal</h2>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            {mainNav.map((item) => (
              <NavButton key={item.label} {...item} />
            ))}
          </div>
        </div>
        <div className="border-t pt-2">
          <div className="flex gap-3 p-3 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-base font-medium leading-normal">
                Jane Doe
              </h1>
              <p className="text-sm font-normal leading-normal text-muted-foreground">
                Maker
              </p>
            </div>
          </div>
          <NavButton to="/logout" icon={<LogOut />} label="Logout" />
        </div>
      </div>
    </aside>
  );
}
