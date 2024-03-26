import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className=" text-orange-500" />
      </SheetTrigger>
      <SheetContent className=" space-y-3">
        <SheetTitle>
        <span>Welcome to EasyFood</span>
        </SheetTitle>
        <Separator/>
       <SheetDescription className=" flex">
          <Button className=" flex-1 font-bold bg-orange-500" >Login</Button>
       </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}