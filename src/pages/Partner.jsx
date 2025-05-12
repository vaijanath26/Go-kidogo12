import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Partner.css";
import "./styles.css";
import Records from "./records.json"; // Replace with your actual JSON file

export default function PartnerPage() {
  const [activeService, setActiveService] = useState("All");

  const filteredPartners =
    activeService === "All"
      ? Records
      : Records.filter((p) => p.services.includes(activeService));

  return (
    <>
      {/* Header Section */}
      <div className="abc">
        <div className="overlay"></div>
        <h1>
          {filteredPartners.length} Partner
          {filteredPartners.length !== 1 && "s"}
        </h1>
      </div>

      {/* Wave animation background */}
      <div className="wave-container1">
        <div className="wave-element wave-1"></div>
        <div className="wave-element wave-2"></div>
        <div className="wave-element wave-3"></div>
      </div>

      {/* Service Filter Buttons */}
      <div className="partner-wrapper">
        <div className="partner-filters">
          {["All", "Delivery", "Takeaway"].map((opt) => (
            <label
              key={opt}
              className={`radio-btn ${activeService === opt ? "active" : ""}`}
            >
              <input
                type="radio"
                name="service"
                value={opt}
                checked={activeService === opt}
                onChange={() => setActiveService(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Partner Banner */}
      <div className="partner-banner">
        <span>
          Select from 1000+ healthy menu items and have it ordered in our zero-waste boxes.
        </span>
        <span className="partner-icon">🚴‍♂️</span>
      </div>

      {/* Partner Cards */}
      <div className="card-container">
        {filteredPartners.map((record, index) => (
          <div className="box" key={index}>
            <div className="card-image">
              <img src={record.image} alt={record.name} className="card-image" />
              <div className="cuisine-tag">{record.cuisine}</div>
            </div>
            <div className="card-info">
              <Link to={`/partner/${record.id}`} className="status-badge">
                open
              </Link>
              <div className="restaurant-name">{record.name}</div>
              <div className="address">{record.address}</div>
            </div>
            <div className="options">
              <div><i className="fas fa-shopping-bag"></i>🚴‍♂️ Takeaway</div>
              <div><i className="fas fa-biking"></i>🛍️ Delivery</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
