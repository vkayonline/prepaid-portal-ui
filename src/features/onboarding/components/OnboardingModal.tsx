import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { Button } from "@/commons/components/ui/button";
import { Input } from "@/commons/components/ui/input";
import { Label } from "@/commons/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/commons/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/commons/components/ui/radio-group";
import { Textarea } from "@/commons/components/ui/textarea";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/commons/components/ui/modal";
import { cn } from "@/commons/lib/utils";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const [mode, setMode] = useState<"bulk" | "single">("bulk");
  const [corporate, setCorporate] = useState("");
  const [product, setProduct] = useState("");
  const [cardType, setCardType] = useState<"virtual" | "physical">("virtual");
  const [personalization, setPersonalization] = useState("personalized");

  // single-entry fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [topup, setTopup] = useState("");
  const [address, setAddress] = useState("");

  // bulk upload
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvError, setCsvError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  function resetForm() {
    setMode("bulk");
    setCorporate("");
    setProduct("");
    setCardType("virtual");
    setPersonalization("personalized");
    setName("");
    setEmail("");
    setMobile("");
    setTopup("");
    setAddress("");
    setCsvFile(null);
    setCsvError("");
  }

  function handleClose() {
    resetForm();
    onClose && onClose();
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setCsvError("");
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      setCsvError("File too large. Max 5MB.");
      return;
    }
    if (!f.name.toLowerCase().endsWith(".csv")) {
      setCsvError("Please upload a CSV file.");
      return;
    }
    setCsvFile(f);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) {
      const fakeEvent = { target: { files: [f] } } as unknown as ChangeEvent<HTMLInputElement>;
      handleFileChange(fakeEvent);
    }
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function downloadTemplate() {
    const headers = ["Name", "Email", "Mobile Number", "Top-up Amount", "Address (physical only)"];
    const rows = [headers.join(",")];
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "onboarding_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleSubmit() {
    // Basic validation example
    if (!corporate) {
      alert("Please select a corporate.");
      return;
    }
    if (mode === "bulk") {
      if (!csvFile) {
        alert("Please upload a CSV file for bulk upload.");
        return;
      }
      // process CSV file upload...
      alert("Bulk upload ready to be processed: " + csvFile.name);
      handleClose();
      return;
    }

    // single entry validation
    if (!name || !email || !mobile) {
      alert("Please fill name, email and mobile.");
      return;
    }
    if (cardType === "physical" && !address) {
      alert("Please fill address for physical card.");
      return;
    }

    const payload = {
      corporate,
      product,
      cardType,
      personalization,
      name,
      email,
      mobile,
      topup,
      address: cardType === "physical" ? address : undefined,
    };

    // submit payload to server...
    console.log("Submitting single entry", payload);
    alert("Single entry submitted\n" + JSON.stringify(payload, null, 2));
    handleClose();
  }

  return (
    <Modal open={open} onOpenChange={handleClose}>
      <ModalContent className="max-w-4xl">
        <ModalHeader>
          <ModalTitle>New Onboarding</ModalTitle>
          <ModalDescription>Step 1 — Enter details</ModalDescription>
        </ModalHeader>

        <div className="p-6 space-y-6">
          {/* Entry Mode */}
          <div className="space-y-2">
            <Label>Entry Mode</Label>
            <div className="flex gap-3">
              <Button
                variant={mode === "bulk" ? "secondary" : "outline"}
                onClick={() => setMode("bulk")}
              >
                Bulk Upload
              </Button>
              <Button
                variant={mode === "single" ? "secondary" : "outline"}
                onClick={() => setMode("single")}
              >
                Single Entry
              </Button>
            </div>
          </div>

          {/* Corporate & Product */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Corporate</Label>
              <Select value={corporate} onValueChange={setCorporate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Corporate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corp-a">Corp A</SelectItem>
                  <SelectItem value="corp-b">Corp B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Product</Label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product-1">Product 1</SelectItem>
                  <SelectItem value="product-2">Product 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Card Type + Personalization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Card Type</Label>
              <div className="flex gap-3">
                <Button
                  variant={cardType === "virtual" ? "secondary" : "outline"}
                  onClick={() => setCardType("virtual")}
                >
                  Virtual Card
                </Button>
                <Button
                  variant={cardType === "physical" ? "secondary" : "outline"}
                  onClick={() => setCardType("physical")}
                >
                  Physical Card
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Personalization</Label>
              <RadioGroup
                value={personalization}
                onValueChange={setPersonalization}
                className="flex gap-4 items-center"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="personalized" id="personalized" />
                  <Label htmlFor="personalized">Personalized</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="non-personalized" id="non-personalized" />
                  <Label htmlFor="non-personalized">Non-Personalized</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Dynamic Form Area */}
          <div className="border rounded-lg p-4 bg-muted/40">
            {mode === "bulk" ? (
              <div className="space-y-4">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="relative rounded-lg border-2 border-dashed border-muted-foreground/30 bg-background p-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="text-sm text-muted-foreground">Click to upload or drag and drop</div>
                  <div className="text-xs text-muted-foreground/80">CSV file (MAX. 5MB)</div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />

                  {csvFile && (
                    <div className="absolute bottom-3 left-3 text-xs text-foreground">{csvFile.name}</div>
                  )}
                </div>

                <div className="bg-background p-4 rounded-md border">
                  <div className="text-sm font-semibold mb-2">CSV Template Instructions</div>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li><strong>Name</strong> : Full name of the customer</li>
                    <li><strong>Email</strong> : Customer's email address</li>
                    <li><strong>Mobile Number</strong> : Customer's mobile phone number</li>
                    <li><strong>Top-up Amount</strong> : Initial amount to load on the card</li>
                    <li><strong>Address</strong> : Required only if 'Physical' card type is selected</li>
                  </ul>
                  <div className="mt-3 flex items-center gap-3">
                    <Button onClick={downloadTemplate} variant="outline">Download Template</Button>
                    <div className="text-xs text-muted-foreground">CSV must include header row. UTF-8 encoded.</div>
                  </div>
                  {csvError && <div className="text-sm text-destructive mt-2">{csvError}</div>}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Mobile Number</Label>
                  <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Top-up Amount</Label>
                  <Input value={topup} onChange={(e) => setTopup(e.target.value)} />
                </div>

                {cardType === "physical" && (
                  <div className="md:col-span-2 space-y-2">
                    <Label>Address</Label>
                    <Textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Continue to Review</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
