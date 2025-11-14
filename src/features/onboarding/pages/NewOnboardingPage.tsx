import { Button } from "@/commons/components/ui/button";
import { Card, CardContent, CardFooter } from "@/commons/components/ui/card";
import { Input } from "@/commons/components/ui/input";
import { Label } from "@/commons/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/commons/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/commons/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/commons/components/ui/tabs";
import { Download, UploadCloud } from "lucide-react";

function OnboardingStepper() {
  return (
    <div className="p-6 border-b">
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">1</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-primary">Step 1</span>
            <span className="text-base font-bold">Enter Details</span>
          </div>
        </div>
        <div className="mx-4 h-px flex-1 bg-border"></div>
        <div className="flex flex-1 items-center gap-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">2</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Step 2</span>
            <span className="text-base font-bold text-muted-foreground">Review</span>
          </div>
        </div>
        <div className="mx-4 h-px flex-1 bg-border"></div>
        <div className="flex flex-1 items-center gap-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">3</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Step 3</span>
            <span className="text-base font-bold text-muted-foreground">Submit</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileUploadZone() {
  return (
    <>
      <Label className="mb-2 block text-sm font-medium" htmlFor="csv-upload">
        Upload Customer Data
      </Label>
      <div className="relative flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors hover:border-primary">
        <UploadCloud className="h-10 w-10 text-gray-400" />
        <p className="mt-2 text-sm">
          <span className="font-semibold text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">CSV file (MAX. 5MB)</p>
        <Input className="absolute inset-0 h-full w-full cursor-pointer opacity-0" id="csv-upload" type="file" />
      </div>
    </>
  );
}

function CsvInstructions() {
  return (
    <div className="mt-4 rounded-lg bg-muted/50 p-4">
      <h4 className="mb-2 text-sm font-semibold">CSV Template Instructions</h4>
      <p className="mb-2 text-sm text-muted-foreground">Please ensure your CSV file has the following columns:</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        <li><span className="font-mono rounded bg-muted px-1">Name</span>: Full name of the customer.</li>
        <li><span className="font-mono rounded bg-muted px-1">Email</span>: Customer's email address.</li>
        <li><span className="font-mono rounded bg-muted px-1">Mobile Number</span>: Customer's mobile phone number.</li>
        <li><span className="font-mono rounded bg-muted px-1">Top-up Amount</span>: Initial amount to load on the card.</li>
        <li><span className="font-mono rounded bg-muted px-1">Address</span>: Required only if 'Physical' card type is selected.</li>
      </ul>
      <Button variant="link" className="mt-3 h-auto items-center gap-2 p-0 text-sm font-medium text-primary hover:underline">
        <Download className="h-4 w-4" /> Download Template
      </Button>
    </div>
  );
}

export function NewOnboardingPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 flex flex-col gap-3">
        <h1 className="text-4xl font-black tracking-tight">New Onboarding</h1>
        <p className="text-muted-foreground">Create onboarding requests for single or multiple customers.</p>
      </div>
      <Card>
        <OnboardingStepper />
        <form>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
              <div>
                <Label className="mb-2 block text-sm font-medium" htmlFor="corporate">Corporate</Label>
                <Select>
                  <SelectTrigger id="corporate"><SelectValue placeholder="Select Corporate" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corp1">Innovate Inc.</SelectItem>
                    <SelectItem value="corp2">Quantum Solutions</SelectItem>
                    <SelectItem value="corp3">Apex Financials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block text-sm font-medium" htmlFor="product">Product</Label>
                <Select>
                  <SelectTrigger id="product"><SelectValue placeholder="Select Product" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prod1">Prepaid Business Card</SelectItem>
                    <SelectItem value="prod2">Corporate Expense Card</SelectItem>
                    <SelectItem value="prod3">Virtual Fleet Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label className="mb-2 block text-sm font-medium">Card Type</Label>
                <RadioGroup defaultValue="virtual" className="grid grid-cols-2 gap-4">
                  <Label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <RadioGroupItem value="virtual" id="virtual" />
                    <span className="font-medium">Virtual Card</span>
                  </Label>
                  <Label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <RadioGroupItem value="physical" id="physical" />
                    <span className="font-medium">Physical Card</span>
                  </Label>
                </RadioGroup>
              </div>
              <div className="md:col-span-2">
                <Label className="mb-2 block text-sm font-medium">Personalization</Label>
                <RadioGroup defaultValue="perso" className="flex gap-4">
                  <Label className="flex cursor-pointer items-center gap-2">
                    <RadioGroupItem value="perso" id="perso" />
                    <span>Personalized</span>
                  </Label>
                  <Label className="flex cursor-pointer items-center gap-2">
                    <RadioGroupItem value="non-perso" id="non-perso" />
                    <span>Non-Personalized</span>
                  </Label>
                </RadioGroup>
              </div>
              <div className="md:col-span-2">
                <Tabs defaultValue="bulk">
                  <TabsList>
                    <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
                    <TabsTrigger value="single">Single Entry</TabsTrigger>
                  </TabsList>
                  <TabsContent value="bulk" className="pt-4">
                    <FileUploadZone />
                    <CsvInstructions />
                  </TabsContent>
                  <TabsContent value="single" className="pt-4">
                    <div className="p-8 text-center text-muted-foreground">Single entry form will be implemented here.</div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-4 rounded-b-xl border-t bg-muted/50">
            <Button variant="outline" type="button">Cancel</Button>
            <Button type="submit">Continue to Review</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
