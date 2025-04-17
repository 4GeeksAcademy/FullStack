import React from "react";
import LayoutHeader from "../component/LayoutHeader.jsx";
import HeroBanner from "../component/HeroBanner.jsx";
import CategoriesSection from "../component/CategoriesSection.jsx";
import SearchFilters from "../component/SearchFilters.jsx";
import FeaturedDeals from "../component/FeaturedDeals.jsx";

export const Home = () => {
  return (
    <div>
      <LayoutHeader />
      <HeroBanner />
      <CategoriesSection />
      <SearchFilters />
      <FeaturedDeals />
    </div>
  );
};
