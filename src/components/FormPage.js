import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const countries = {
    India: ["Jaipur", "Delhi", "Mumbai"],
    USA: ["New York", "Chicago", "Texas"],
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.username.trim()) newErrors.username = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.password.trim()) newErrors.password = "Required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Required";
    if (!formData.country.trim()) newErrors.country = "Required";
    if (!formData.city.trim()) newErrors.city = "Required";
    if (!formData.pan.trim()) newErrors.pan = "Required";
    if (!formData.aadhar.trim()) newErrors.aadhar = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: formData });
    }
  };

  return (
    <div className="container">
      <h2>SignUp Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        {errors.firstName && <span>{errors.firstName}</span>}

        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        {errors.lastName && <span>{errors.lastName}</span>}

        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        {errors.username && <span>{errors.username}</span>}

        <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
        {errors.email && <span>{errors.email}</span>}

        <div className="password-field">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <span>{errors.password}</span>}

        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}

        <div className="phone">
          <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
          </select>
          <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        {errors.phoneNumber && <span>{errors.phoneNumber}</span>}

        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">--Select Country--</option>
          {Object.keys(countries).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {errors.country && <span>{errors.country}</span>}

        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">--Select City--</option>
          {formData.country && countries[formData.country].map((city) => <option key={city}>{city}</option>)}
        </select>
        {errors.city && <span>{errors.city}</span>}

        <input name="pan" placeholder="PAN Number" value={formData.pan} onChange={handleChange} />
        {errors.pan && <span>{errors.pan}</span>}

        <input name="aadhar" placeholder="Aadhar Number" value={formData.aadhar} onChange={handleChange} />
        {errors.aadhar && <span>{errors.aadhar}</span>}

        <button type="submit" className="submit-btn">Signup</button>
      </form>
    </div>
  );
}

export default FormPage;
