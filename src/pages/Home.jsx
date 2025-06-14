import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate, Link } from "react-router-dom";
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
import "./Home.css"; // Assuming you'll update this CSS file as well
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

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(5);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    navigate(`/partner?category=${category}`);
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
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

  const fetchRestaurants = async () => {
    try {
      const response = await fetch("/api/api.php/userhome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId: "321312364633",
          latitude: "321312364633",
          longitude: "321312364633",
          location: "Frankfurt",
          user: "123456",
          email: "devkpandey@gmail.com",
          zipcode: "61348",
          sorting: "",
          country: "",
        }),
      });

      const data = await response.json();
      const restaurantList = data?.[0]?.Restaurants || [];
      setRestaurants(restaurantList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const totalCards = cardData.length;
  const cardWidth = 210; // This value likely needs to be dynamic or calculated based on CSS for responsiveness

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
      <div className="home-container">
        <h2 className="home-section-title">Popular Categories</h2>
        <div className="category-carousel">
          <button
            className="carousel-arrow carousel-arrow--left"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeftIcon className="carousel-arrow__icon" />
          </button>
          <div className="carousel-card-container">
            <div
              className="carousel-card-wrapper"
              style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
            >
              {cardData.map((item, index) => (
                <div
                  className="category-card"
                  key={index}
                  onClick={() => handleCardClick(item.title)}
                >
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="category-card__image"
                    loading="lazy"
                  />
                  <div className="category-card__content">
                    <h3>{item.title}</h3>
                    <p>View All</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="carousel-arrow carousel-arrow--right"
            onClick={nextSlide}
            disabled={currentIndex + visibleCards >= totalCards}
          >
            <ChevronRightIcon className="carousel-arrow__icon" />
          </button>
        </div>
            <div className="home-main-promo">
            <h2>
              Choose from the most popular restaurants in
              <br /> your neighborhood.
            </h2>
            <p className="home-main-promo__description">
              Order, enjoy and support your local heroes!
            </p>
            <Link to="/partner" className="home-main-promo__link">
            All restaurants →
          </Link>
          </div>
        {loading ? (
          <p>Loading restaurants...</p>
        ) : (
          <div className="restaurant-grid">
            {restaurants.map((rest, i) => (
              <div
                key={i}
                className={`restaurant-card ${rest.Active !== "1" ? "restaurant-card--inactive" : ""}`}
                onClick={() => handleRestaurantClick(rest.restroid)}
              >
                <img
                  src={rest.image || "https://via.placeholder.com/150"}
                  alt={rest.name}
                  className="restaurant-card__image"
                  loading="lazy"
                />
                <div className="restaurant-card__details">
                  <h3>{rest.name}</h3>
                  <p>
                    <strong>Address:</strong> {rest.address || "N/A"}
                  </p>
                 <p>
              <strong>
               Rating: <span style={{ color: "#367337" }}>★</span>
               </strong>{" "}
              {rest.rating
              ? rest.rating.toFixed(1)
              : (Math.random() * (9.9 - 8.5) + 8.5).toFixed(1)}
                  </p>
                  
                  <p>
                    <strong>Open:</strong> {rest.FirstOrder || "N/A"} -{" "}
                    {rest.LastOrder || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {rest.Active === "1" ? (
                      <span className="restaurant-card__status--active">Active</span>
                    ) : (
                      <span className="restaurant-card__status--inactive">Inactive</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="home-background-gray">
        <div className="home-content-wrapper">
          

          <div className="home-banner-section">
            <div className="home-banner-section__overlay"></div>
            <div className="home-banner-section__content">
              <div>
                <p className="home-banner-section__subheading">GokidoGo Delivery</p>
                <h1>We Deliver to your Office</h1>
                <h2>Enjoy a tasty food in minutes!</h2>
                <br />
                <Link to="/partner" className="home-banner-section__button home-banner-section__button--gradient">
                  Start Now!
                </Link>
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