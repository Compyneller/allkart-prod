"use client";
import Loader from "@/components/loader";
import Container from "@/components/ui/container";
import { fetchStores } from "data/fetchStores";
import { useCoordinates } from "hooks/useCoordinates";
import CategoryListing from "./cat-listing";
import HomeProducts from "./home-products";
import NearByStores from "./near-by-stores";

const HomeLayout = () => {
  const { location: coordinates, error, isLoading: LocationLoading } = useCoordinates()
  const { data, isLoading } = fetchStores({ latitude: coordinates?.lat, longitude: coordinates?.lng })


  if (LocationLoading) {

    return <Loader />
  }

  if (error.state || !coordinates) {
    switch (error.message) {
      case "PERMISSION_DENIED":
        return (
          <div className="flex items-center flex-col justify-center w-full h-dvh">
            <p className="text-2xl font-semibold text-center animate-pulse">
              Please allow location access in your browser to get stores
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Try Again
            </button>
          </div>
        );
      case "POSITION_UNAVAILABLE":
        return (
          <div className="flex items-center flex-col justify-center w-full h-dvh">
            <p className="text-2xl font-semibold text-center animate-pulse">
              Location information is unavailable
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Try Again
            </button>
          </div>
        );
      case "TIMEOUT":
        return (
          <div className="flex items-center flex-col justify-center w-full h-dvh">
            <p className="text-2xl font-semibold text-center animate-pulse">
              The request to get user location timed out
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Try Again
            </button>
          </div>
        );
      default:
        return (
          <div className="flex items-center flex-col justify-center w-full h-dvh">
            <p className="text-2xl font-semibold text-center animate-pulse">
              An unknown error occurred
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Try Again
            </button>
          </div>
        );
    }
  }



  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Searching for nearby stores...</p>
      </div>
    );
  }


  if (data?.stores?.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No stores found in your area</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }




  return (
    <Container>
      {/* <TopCarousel /> */}
      <CategoryListing />
      <NearByStores data={data?.stores} />
      <HomeProducts data={data?.products} />
    </Container>
  );
};

export default HomeLayout;
