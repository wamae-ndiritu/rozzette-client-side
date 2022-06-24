import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import CategoryInfo from "../components/homeComponents/categoryInfo";
import Slider from "../components/homeComponents/slider";
import CategorySideBar from "../components/homeComponents/sidebar";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  const category = match.params.category;

  return (
    <div>
      <Header />
      <CategorySideBar />
      <main className="main">
        <Slider />
        <CategoryInfo />
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
