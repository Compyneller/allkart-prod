import { Navigation } from "lucide-react";
import { Button } from "./ui/button";

const OpenMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const handleOpenMap = () => {
    // This opens the map with directions from the user's current location
    // to the specific coordinates.
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    // Opens in a new tab (or triggers the app on mobile)
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Usage in JSX

  return (
    <Button
      onClick={() => handleOpenMap()}
      size="sm"
      className="w-full"
      variant="outline">
      <Navigation size={16} />
      Direction
    </Button>
  );
};

export default OpenMap;
