import React from "react";
import { Button } from "./ui/button";
import { LocateIcon } from "lucide-react";

const OpenMap = () => {
  const handleOpenMap = (lat: number, lng: number) => {
    // This opens the map with directions from the user's current location
    // to the specific coordinates.
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    // Opens in a new tab (or triggers the app on mobile)
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Usage in JSX

  return (
    <Button
      onClick={() => handleOpenMap(26.7606, 83.3732)}
      size="sm"
      variant="outline">
      <LocateIcon /> Get Direction
    </Button>
  );
};

export default OpenMap;
