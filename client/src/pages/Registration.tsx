// import { ChangeEvent, useState } from "react";
// import { useDispatch } from "react-redux";

import Register from "../components/Register";



// type Props = {}

const Registration = () => {
  //  const dispatch = useDispatch();

  //  const [formData, setFormData] = useState({
  //    username: "",
  //    email: "",
  //    first_name: "",
  //    last_name: "",
  //    password: "",
  //    tech_info: "",
  //    personal_info: "",
  //    personal_text: "",
  //  });

  //  const handleInputChange = (e: React.FormEvent) => {
  //    const { name, value } = e.target;
  //    setFormData({
  //      ...formData,
  //      [name]: value,
  //    });
  //  };

  //  const handleRegistration = async  (e: ChangeEvent<HTMLInputElement>) => {
  //    e.preventDefault();

  //    try {
  //      const response = await fetch("http://localhost:5001/api/users/register", {
  //        method: "POST",
  //        headers: {
  //          "Content-Type": "application/json",
  //        },
  //        body: JSON.stringify(formData),
  //      });

  //      if (!response.ok) {
  //        throw new Error("Registration failed");
  //      }

  //      const data = await response.json();
  //      // Optionally, you can dispatch login action and set user state as well, similar to the login process.

  //      // Redirect to a success page or login page
  //      history.push("/login");
  //    } catch (error) {
  //      console.error("Registration Error:", error);
  //    }
  //  };

  return (
    <div><Register /></div>
    //  <div>
    //    <h2>Register</h2>
    //    <form onSubmit={handleRegistration}>

    //      <div>
    //        <label>Username: </label>
    //        <input
    //          type="text"
    //          name="username"
    //          value={formData.username}
    //          onChange={handleInputChange}
    //        />
    //      </div>
    //      {/* Add more input fields as needed */}
    //      <button type="submit">Register</button>
    //    </form>
    //  </div>
  );
};

export default Registration;
