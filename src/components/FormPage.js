import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
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
    India: ["Delhi", "Mumbai", "Jaipur"],
    USA: ["New York", "Los Angeles", "Chicago"],
    UK: ["London", "Manchester", "Birmingham"],
  };

  const validate = () => {
    const newErrors = {};
    for (let key in formData) {
      if (!formData[key]) newErrors[key] = "This field is required";
    }
    if (formData.aadhar && !/^\d{12}$/.test(formData.aadhar)) newErrors.aadhar = "Aadhar must be 12 digits";
    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan)) newErrors.pan = "Invalid PAN format";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Phone must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: formData });
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Username", name: "username" },
          { label: "Email", name: "email", type: "email" },
          {
            label: "Password",
            name: "password",
            type: showPassword ? "text" : "password",
            extra: (
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            ),
          },
        ].map((field) => (
          <div className="form-group" key={field.name}>
            <label>{field.label}:</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
            {field.extra}
            {errors[field.name] && <p className="error">{errors[field.name]}</p>}
          </div>
        ))}

        <div className="form-group">
          <label>Phone No:</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <div className="form-group">
          <label>Country:</label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">--Select--</option>
            {Object.keys(countries).map((ctry) => (
              <option key={ctry} value={ctry}>
                {ctry}
              </option>
            ))}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        <div className="form-group">
          <label>City:</label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">--Select--</option>
            {formData.country &&
              countries[formData.country].map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
          </select>
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div className="form-group">
          <label>PAN No:</label>
          <input name="pan" value={formData.pan} onChange={handleChange} />
          {errors.pan && <p className="error">{errors.pan}</p>}
        </div>

        <div className="form-group">
          <label>Aadhar No:</label>
          <input name="aadhar" value={formData.aadhar} onChange={handleChange} />
          {errors.aadhar && <p className="error">{errors.aadhar}</p>}
        </div>

        <button type="submit" disabled={!validate()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
