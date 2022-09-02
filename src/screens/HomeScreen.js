import React, { useEffect } from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import CategoryInfo from "../components/homeComponents/categoryInfo";
import Slider from "../components/homeComponents/slider";
import HeaderBar from "../components/HeaderBar";
import FeaturedCategories from "../components/homeComponents/FeaturedCategories";
import {
  kitchen,
  ladies,
  children,
  toiletries,
  otherCat,
  men,
} from "../data/featuredCategories";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  const category = match.params.category;

  const title = "Home";
  useEffect(() => {
    document.title = `Rozzette | ${title}`;
  }, []);

  return (
    <div>
      {/* <Announcements /> */}
      <Header />
      {/* <CategorySideBar /> */}
      <main className="main">
        <Slider />
        <HeaderBar barTitle="SHOP BY CATEGORY" />
        <CategoryInfo />
        <HeaderBar barTitle="SHOP FOR YOUR KITCHEN" />
        <FeaturedCategories data={kitchen} />
        <HeaderBar barTitle="SHOP FOR LADIES" />
        <FeaturedCategories data={ladies} />
        <HeaderBar barTitle="SHOP FOR CHILDREN" />
        <FeaturedCategories data={children} />
        <HeaderBar barTitle="SHOP FOR MEN" />
        <FeaturedCategories data={men} />
        <HeaderBar barTitle="SHOP FOR TOILETRIES" />
        <FeaturedCategories data={toiletries} />
        <HeaderBar barTitle="SHOP FOR FURNITURE & APPLIANCES" />
        <FeaturedCategories data={otherCat} />
        <ShopSection
          keyword={keyword}
          pagenumber={pagenumber}
          category={category}
        />
        <CalltoActionSection />
        <ContactInfo />
        <Footer />
      </main>
    </div>
  );
};

export default HomeScreen;
