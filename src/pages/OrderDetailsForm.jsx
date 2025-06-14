// OrderDetailsForm.js
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import "./OrderDetailsForm.css";

export default function OrderDetailsForm() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const [salutation, setSalutation] = useState("Woman");
  const [packing, setPacking] = useState("disposable");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [tipValue, setTipValue] = useState(0);
  const [error, setError] = useState("");
  const formRef = useRef(null);

  const [cartItems, setCartItems] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({});

  const calculateBaseTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const baseTotal = calculateBaseTotal();
  const tax = parseFloat((baseTotal * 0.07).toFixed(2));
  const grandTotal = (baseTotal + tipValue + tax).toFixed(2); // Keep grandTotal calculation here

  useEffect(() => {
    if (location.state) {
      const { cart, restaurantInfo } = location.state;
      if (cart) {
        setCartItems(cart);
      }
      if (restaurantInfo) {
        setRestaurantInfo(restaurantInfo);
      }
    } else {
      setError("No order details found. Please go back to select items.");
      // navigate('/restaurant-menu'); // Example: redirect back to menu
    }
  }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !surname || !phone || !email || !city) {
      setError("Please fill in all required fields.");
      formRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setError("");

    // --- IMPORTANT CHANGE HERE ---
    // Pass the calculated grandTotal and other relevant data to the confirmation page
    navigate('/order-confirmation', {
      state: {
        orderId: 'GK' + Date.now().toString().slice(-10), // Generate a simple dynamic order ID
        grandTotal: parseFloat(grandTotal), // Pass the grand total as a number
        products: cartItems, // Pass products for the summary
        fare: 0, // Set your actual delivery fare here if applicable
        paymentFee: 0, // Set your actual payment fee here
        tip: tipValue, // Pass the chosen tip
        discount: 0, // Set actual discount if any
        tax07: tax, // Pass the calculated tax
        tax19: 0, // If you have another tax bracket
        // ... any other order details you want to display on confirmation
      },
    });
    // --- END IMPORTANT CHANGE ---
  };

  return (
    <>
      <div className="background-image">
        <div className="text-content"></div>
        <div className="wave-container1">
          <div className="wave-element wave-1"></div>
          <div className="wave-element wave-2"></div>
          <div className="wave-element wave-3"></div>
        </div>
        <div className="about-text">
          <h1>Cart</h1>
        </div>
      </div>
      <div className="order-form-wrapper" ref={formRef}>
        <div className="order-header">Order details</div>
        {error && <p className="error-message">{error}</p>}

        <form className="order-form" onSubmit={handleSubmit}>
          {/* ... (rest of your form inputs remain unchanged) ... */}

          {/* Salutation */}
          <div className="grid-2">
            <div className="form-group">
              <label>Salutation</label>
              <select value={salutation} onChange={(e) => setSalutation(e.target.value)}>
                <option>Woman</option>
                <option>Mister</option>
              </select>
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid-2">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                value={firstName}
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Surname *</label>
              <input
                type="text"
                value={surname}
                placeholder="Surname"
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Telephone/Mobile No. *</label>
              <input
                type="text"
                value={phone}
                placeholder="Telephone/Mobile No."
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email ID *</label>
              <input
                type="email"
                value={email}
                placeholder="Email ID"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                value={city}
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Postal Code (Optional)</label>
              <input
                type="text"
                value={postalCode}
                placeholder="Postal Code"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          {/* Date & Tip */}
          <div className="grid-2">
            <div className="form-group">
              <label>Date</label>
              <input type="date" defaultValue="2025-06-06" />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="text" value="11:45" readOnly />
            </div>
            <div className="form-group">
              <label>Tip</label>
              <select onChange={(e) => setTipValue(parseFloat(e.target.value))}>
                <option value="0">No Tip (0%)</option>
                <option value="0.7">0.70 (5%)</option>
                <option value="1.4">1.40 (10%)</option>
                <option value="2.1">2.10 (15%)</option>
              </select>
            </div>
          </div>

          {/* Packing Material */}
          <div className="form-group">
            <label>Packing Material</label>
            <div className="radio-group">
              {["reusable", "recycle", "disposable"].map((type) => (
                <label className="radio-option" key={type}>
                  <input
                    type="radio"
                    name="packing"
                    value={type}
                    checked={packing === type}
                    onChange={(e) => setPacking(e.target.value)}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)} packaging
                </label>
              ))}
            </div>
          </div>

          {/* Payment Option */}
          <div className="form-group payment-option">
            <div className="payment">Payment Option</div>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash Payment
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ecNumber"
                  checked={paymentMethod === "ecNumber"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                EC Number
              </label>
            </div>
          </div>

          {/* Remark */}
          <div className="form-group">
            <label>Remark</label>
            <textarea placeholder="e.g. allergies, special wishes..." />
          </div>

          {/* Cutlery Checkbox */}
          <div className="checkbox-row">
            <input type="checkbox" />
            <span>Cutlery</span>
            <span>€ 0.0</span>
          </div>

          {/* Order Summary Section */}
          <div className="payment">Order Summary</div>
          <div className="form-group order-summary">

            {cartItems.length > 0 ? (
              <div className="cart-items-display">
                <h4>Your Items:</h4>
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-row cart-item-summary">
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>€ {(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                ))}
                <hr />
              </div>
            ) : (
              <p>No items in cart.</p>
            )}

            <div className="summary-row">
              <span>PACKAGING TYPE:</span>
              <span>{packing.charAt(0).toUpperCase() + packing.slice(1)}</span>
            </div>
            <div className="summary-row">
              <span>SUBTOTAL:</span>
              <span>€ {baseTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>TIP:</span>
              <span>€ {tipValue.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>TAX (7%):</span>
              <span>€ {tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <strong>GRAND TOTAL:</strong>
              <strong>€ {grandTotal}</strong>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Preorder
          </button>
        </form>
      </div>
    </>
  );
}