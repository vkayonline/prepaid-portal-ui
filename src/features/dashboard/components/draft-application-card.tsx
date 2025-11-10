import { Button } from "@/commons/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/commons/components/ui/card";

type DraftApplicationCardProps = {
  id: string;
  date: string;
  description: string;
};

export function DraftApplicationCard({
  id,
  date,
  description,
}: DraftApplicationCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Draft #{id}</CardTitle>
          <CardDescription>{date}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Edit</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
