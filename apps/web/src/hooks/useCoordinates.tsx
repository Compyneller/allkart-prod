import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useCoordinates = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState({
        state: false,
        message: ""
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if Geolocation is supported
        if (!("geolocation" in navigator)) {
            setError({
                state: true,
                message: "Geolocation is not supported by your browser."
            });
            setIsLoading(false);
            return;
        }
        if (sessionStorage.getItem("latitude") && sessionStorage.getItem("longitude")) {
            setLocation({
                lat: parseFloat(sessionStorage.getItem("latitude")!),
                lng: parseFloat(sessionStorage.getItem("longitude")!),
            });
            setIsLoading(false);
            return;
        }

        // Request location
        navigator.geolocation.getCurrentPosition(
            (position) => {

                sessionStorage.setItem("latitude", position.coords.latitude.toString());
                sessionStorage.setItem("longitude", position.coords.longitude.toString());

                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setIsLoading(false);
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setError({
                            state: true,
                            message: "PERMISSION_DENIED"
                        })
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setError({
                            state: true,
                            message: "POSITION_UNAVAILABLE"
                        })
                        break;
                    case error.TIMEOUT:
                        setError({
                            state: true,
                            message: "TIMEOUT"
                        })
                        toast.error("The request to get user location timed out.");
                        break;
                    default:
                        setError({
                            state: true,
                            message: "DEFAULT"
                        })
                        toast.error("An unknown error occurred.");
                }
                setIsLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, []);

    return { location, error, isLoading };
};