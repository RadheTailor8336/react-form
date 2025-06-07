import React from "react";
import { useLocation } from "react-router-dom";

function SuccessPage() {
  const { state } = useLocation();

  return (
    <div className="container">
      <h2>SignUp Form</h2>
      <div className="success-box">
        <p>Thanks for signing up, find your details below:</p>
        <hr />
        <p><strong>First Name:</strong> {state.firstName}</p>
        <p><strong>Last Name:</strong> {state.lastName}</p>
        <p><strong>Username:</strong> {state.username}</p>
        <p><strong>Email Address:</strong> {state.email}</p>
        <p><strong>Phone:</strong> {state.phoneCode} {state.phoneNumber}</p>
        <p><strong>Country:</strong> {state.country}</p>
        <p><strong>City:</strong> {state.city}</p>
        <p><strong>PAN No:</strong> {state.pan}</p>
        <p><strong>Aadhar No:</strong> {state.aadhar}</p>
      </div>
    </div>
  );
}

export default SuccessPage;
