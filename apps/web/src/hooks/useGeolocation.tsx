"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";

// Define types for better type safety
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Partial type for Nominatim response
interface NominatimResponse {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    road?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
    state_district?: string;
    [key: string]: string | undefined;
  };
}

const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<NominatimResponse | null>(null);

  // Function to fetch address from OpenStreetMap (Nominatim)
  const getAddressFromCoordinates = useCallback(
    async (lat: number, lon: number) => {
      // Nominatim requires a User-Agent to prevent blocking, though browsers enforce their own headers.
      // Added 'addressdetails=1' to ensure we get the broken down components (city, state, etc)
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch address data");
        }

        const data: NominatimResponse = await response.json();

        if (data && data.address) {
          setAddress(data);
          return data;
        } else {
          toast.warning("Location found, but no address details available.");
          return null;
        }
      } catch (error) {
        console.error("Geocoding error:", error);
        toast.error("Could not fetch address details.");
        return null;
      }
    },
    []
  );

  // Main trigger function to be called by your button
  const handleAutomaticAddress = useCallback(() => {
    if (!("geolocation" in navigator)) {
      toast.warning("Geolocation is not supported by this browser.");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // 1. Update Coordinate State
        setCoordinates({ latitude, longitude });

        // 2. Fetch Address
        await getAddressFromCoordinates(latitude, longitude);

        setIsLoading(false);
        toast.success("Location fetched successfully!");
      },
      (error) => {
        setIsLoading(false);
        console.error("Error getting location:", error);

        // specific error handling
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error("Please allow location access in your browser.");
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            toast.error("The request to get user location timed out.");
            break;
          default:
            toast.error("An unknown error occurred.");
        }
      },
      // High accuracy option for better e-commerce delivery precision
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, [getAddressFromCoordinates]);

  return {
    coordinates,
    address,
    isLoading,
    handleAutomaticAddress,
  };
};

export default useGeolocation;
