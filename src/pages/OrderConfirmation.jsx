// OrderConfirmation.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  const location = useLocation();

  // Destructure the values from location.state.
  // Use default values if state is undefined or properties are missing.
  const {
    orderId = 'GK' + Date.now().toString().slice(-10), // Use the passed orderId or generate a new one
    grandTotal: passedGrandTotal = 0, // Rename to avoid conflict with calculated total
    fare = 0,
    paymentFee = 0,
    tip = 0, // This will now come from the passed state
    discount = 0,
    tax07 = 0, // This will now come from the passed state
    tax19 = 0,
    products = [], // This will now be your actual cart items
    // You can add more specific data like restaurant name, delivery address etc.
  } = location.state || {};

  // Calculate productsSubtotal based on the `products` array received
  const productsSubtotal = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // The 'total' shown in the summary should be the `passedGrandTotal` from the form.
  // We remove the hardcoded calculation here to display the exact total from the form.
  const totalToDisplay = passedGrandTotal;


  return (
    <>
      <div className="abcd">
        <div className="overlay"></div>
        <h1>Order Confirmed!</h1>
      </div>

      <div className="confirmation-wrapper">
        <div className="confirmation-card">
          <div className="confirmation-header">Bestellung erhalten!</div>

          <div className="confirmation-content">
            <CheckCircleIcon className="check-icon" />
            <h2 className="order-id">Order ID {orderId}</h2>
            {/* You might want to remove these or populate them with actual passed data if relevant */}
            <h3 className="order-title">Your order has been received!</h3>
            <p className="order-subtitle">Thank you for your purchase.</p>

            <div className="product-list">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="product-row">
                    <span>{product.name} x {product.quantity}</span>
                    <span>€ {(product.price * product.quantity).toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <div className="product-row"><span>No products found.</span></div>
              )}
            </div>
          </div>

          <div className="cost-details">
            <div className="cost-row"><span>Product Subtotal</span><span>€ {productsSubtotal.toFixed(2)}</span></div>
            <div className="cost-row"><span>Delivery Fare</span><span>+ € {fare.toFixed(2)}</span></div>
            <div className="cost-row"><span>Payment Fee</span><span>+ € {paymentFee.toFixed(2)}</span></div>
            <div className="cost-row"><span>Tip</span><span>+ € {tip.toFixed(2)}</span></div>
            <div className="cost-row"><span>Discount</span><span>– € {discount.toFixed(2)}</span></div>
            <div className="cost-row"><span>Tax 07%</span><span>+ € {tax07.toFixed(2)}</span></div>
            <div className="cost-row"><span>Tax 19%</span><span>+ € {tax19.toFixed(2)}</span></div>
            <div className="total-row"><strong>Grand Total</strong><strong>€ {totalToDisplay.toFixed(2)}</strong></div>
          </div>
        </div>
      </div>
    </>
  );
}