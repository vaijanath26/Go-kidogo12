import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import pizza from "../assets/1.jpg";
import sushi from "../assets/2.jpg";
import curry from "../assets/3.jpg";
import burger from "../assets/4.jpg";
import veg from "../assets/5.jpg";
import chinese from "../assets/6.jpg";
import mexican from "../assets/7.jpg";
import nudeln from "../assets/8.jpg";
import vegan from "../assets/9.jpg";
import halal from "../assets/10.jpg";
import Background from "../component/Background";
import "./Home.css";
import Restau_card from "../component/Restau_cards";
import ProcessFlow from "../component/ProcessFlow";
import Application from "../component/Application";

const cardData = [
  { imgSrc: pizza, title: "Pizza" },
  { imgSrc: sushi, title: "Sushi" },
  { imgSrc: curry, title: "Curry" },
  { imgSrc: burger, title: "Burger" },
  { imgSrc: veg, title: "Veg" },
  { imgSrc: chinese, title: "Chinese" },
  { imgSrc: mexican, title: "Mexican" },
  { imgSrc: nudeln, title: "Nudeln" },
  { imgSrc: vegan, title: "Vegan" },
  { imgSrc: halal, title: "Halal" },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(5);
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    navigate(`/partner?category=${category}`);
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const updateVisibleCards = () => {
      if (window.matchMedia("(max-width: 600px)").matches) {
        setVisibleCards(2);
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setVisibleCards(3);
      } else {
        setVisibleCards(5);
      }
    };

    const debouncedResize = debounce(updateVisibleCards, 100);
    window.addEventListener("resize", debouncedResize);
    updateVisibleCards();

    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const totalCards = cardData.length;
  const cardWidth = 210;

  const nextSlide = () => {
    if (currentIndex + visibleCards < totalCards) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <Background />
      <div className="home-main-container">
        <h2 className="home-title">Popular Categories</h2>
        <div className="home-carousel">
          <button
            className="home-arrow home-arrow-left"
            onClick={prevSlide}
            aria-label="Previous Slide"
            disabled={currentIndex === 0}
          >
            <ChevronLeftIcon className="home-icon" />
          </button>
          <div className="home-card-container">
            <div
              className="home-card-wrapper"
              style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
            >
              {cardData.map((item, index) => (
                <div className="home-card" key={index} onClick={() => handleCardClick(item.title)}>
                  <img
                    src={item.imgSrc}
                    alt={`Delicious ${item.title}`}
                    className="home-card-image"
                    loading="lazy"
                  />
                  <div className="home-card-content">
                    <h3>{item.title}</h3>
                    <p>View All</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="home-arrow home-arrow-right"
            onClick={nextSlide}
            aria-label="Next Slide"
            disabled={currentIndex + visibleCards >= totalCards}
          >
            <ChevronRightIcon className="home-icon" />
          </button>
        </div>
      </div>

      <div className="home-bg-gray">
        <div className="home-content-container">
          <div className="home-main-title">
            <span><em></em></span>
            <h2>Choose from the most popular restaurants in<br /> your neighborhood.</h2>
            <p className="home-description">Order, enjoy and support your local heroes!</p>
            <a href="/restaurants" className="home-link">All restaurants →</a>
          </div>

          <Restau_card />

          <div className="home-banner">
            <div className="home-overlay"></div>
            <div className="home-wrapper">
              <div>
                <medium>GokidoGo Delivery</medium>
                <h1>We Deliver to your Office</h1>
                <h2>Enjoy a tasty food in minutes!</h2><br />
                <a href="/restaurants" className="home-btn home-gradient">Start Now!</a>
              </div>
            </div>
          </div>

          <ProcessFlow />
          <Application />
        </div>
      </div>
    </>
  );
}

export default Home;
