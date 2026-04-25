import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [addressInput, setAddressInput] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fetch user info
    const user = localStorage.getItem("user") || "Guest";
    const userEmail = localStorage.getItem("userEmail") || "Not logged in";
    const savedAddress = localStorage.getItem("userAddress") || "";

    setShippingDetails({
      name: user,
      email: userEmail,
      address: savedAddress,
    });
    setAddressInput(savedAddress);

    // Fetch cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    // Calculate total dynamically
    const totalPrice = storedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice.toFixed(2));
  }, []);

  const handlePlaceOrder = () => {
    if (!addressInput.trim()) {
      alert("⚠️ Please enter your shipping address!");
      return;
    }

    // Save address to localStorage for next time
    localStorage.setItem("userAddress", addressInput);

    // Here you can also clear the cart or send order to backend
    localStorage.removeItem("cart");

    alert("✅ Order placed successfully!");
    navigate("/"); // redirect to home
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0f7fa 0%, #e8f5e9 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "50px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#2e7d32",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Checkout
        </h2>

        {/* Shipping Details */}
        <div
          style={{
            marginBottom: "30px",
            padding: "20px",
            background: "#f1f8e9",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ marginBottom: "10px", color: "#33691e" }}>
            Shipping Details
          </h3>
          <p>
            <strong>Name:</strong> {shippingDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {shippingDetails.email}
          </p>

          {!shippingDetails.address ? (
            <div style={{ marginTop: "10px" }}>
              <label>
                Enter Address:
                <textarea
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    resize: "vertical",
                  }}
                  placeholder="Enter your shipping address"
                />
              </label>
            </div>
          ) : (
            <p>
              <strong>Address:</strong> {addressInput}
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div
          style={{
            marginBottom: "30px",
            padding: "20px",
            background: "#e8f5e9",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ marginBottom: "15px", color: "#2e7d32" }}>
            Order Summary
          </h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #c8e6c9",
                }}
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          )}
          {cartItems.length > 0 && (
            <div
              style={{
                marginTop: "15px",
                fontWeight: "bold",
                fontSize: "1.2rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Total:</span>
              <span>₹{total} + Shipping</span>
            </div>
          )}
        </div>

        <button
          onClick={handlePlaceOrder}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, #66bb6a 0%, #1b5e20 100%)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)")
          }
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
