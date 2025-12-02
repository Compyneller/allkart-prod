"use client";
import { TopCarousel } from "@/components/Home/top-carousel";
import Container from "@/components/ui/container";
import HomeLayout from "./_components/home-layout";

const HomePage = () => {
  return (
    <div className="w-full overflow-hidden">
      <Container>
        <TopCarousel />
        <HomeLayout />
      </Container>
    </div>
  );
};

export default HomePage;
