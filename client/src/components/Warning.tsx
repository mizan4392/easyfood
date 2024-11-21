import { BadgeInfo } from "lucide-react";
import React from "react";

export default function Warning() {
  return (
    <div className="bg-red-400 text-center p-2 flex gap-2 justify-center">
      <BadgeInfo />
      Sorry for delay.This site deployed under free tier on Render.Request might
      be slow due to inactivity!!!
    </div>
  );
}
