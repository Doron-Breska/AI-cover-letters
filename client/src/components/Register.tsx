import React, { useRef } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

// Import useState for future use
// import { useState } from "react";

type Avatar = string | File;

interface NewUser {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  tech_info: string;
  personal_text: string;
  img: Avatar; // Updated type for image upload
  personal_info: PersonalInfo;
}

interface PersonalInfo {
  Leadership: string;
  Adaptability_Flexibility: string;
  Proactivity_Initiative: string;
  Attention_to_Detail: string;
  Spontaneity: string;
  Teamwork_Collaboration: string;
  Resilience: string;
  Innovativeness_Creativity: string;
  Emotional_Intelligence: string;
  tech_info: string; // Added tech_info field here
}

const Register: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const personalTextRef = useRef<HTMLTextAreaElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  // Add refs for skills, education, and work experience
  const skillsRef = useRef<HTMLInputElement>(null);
  const educationRef = useRef<HTMLInputElement>(null);
  const workExperienceRef = useRef<HTMLInputElement>(null);

  // Add a ref for techInfoRef
  const techInfoRef = useRef<HTMLTextAreaElement>(null);

  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const skillsValue = skillsRef.current?.value || "";
    const educationValue = educationRef.current?.value || "";
    const workExperienceValue = workExperienceRef.current?.value || "";

    // Concatenate the values into a single string
    const techInfoValue = `${skillsValue}, ${educationValue}, ${workExperienceValue}`;

    const personalInfo: PersonalInfo = {
      Leadership: "", // Add the values as needed
      Adaptability_Flexibility: "",
      Proactivity_Initiative: "",
      Attention_to_Detail: "",
      Spontaneity: "",
      Teamwork_Collaboration: "",
      Resilience: "",
      Innovativeness_Creativity: "",
      Emotional_Intelligence: "",
      tech_info: techInfoValue, // Assign the concatenated value here
    };

    const newUser: NewUser = {
      username: usernameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      first_name: firstNameRef.current?.value || "",
      last_name: lastNameRef.current?.value || "",
      tech_info: techInfoValue, // Assign the concatenated value here as well
      personal_text: personalTextRef.current?.value || "",
      img: imgRef.current?.files
        ? imgRef.current.files[0]
        : "https://res.cloudinary.com/danq3q4qv/image/upload/v1683035195/avatars/default-profile-picture-avatar-photo-placeholder-vector-illustration-700-205664584_z4jvlo.jpg", // Updated for file upload
      personal_info: personalInfo,
    };

    try {
      const formData = new FormData();
      formData.append("username", newUser.username);
      formData.append("email", newUser.email);
      formData.append("password", newUser.password);
      formData.append("first_name", newUser.first_name);
      formData.append("last_name", newUser.last_name);
      formData.append("tech_info", newUser.tech_info);
      formData.append("personal_info", JSON.stringify(newUser.personal_info));
      formData.append("personal_text", newUser.personal_text);
      if (newUser.img) {
        formData.append("img", newUser.img);
      }
      // Append other fields as needed

      // Replace the API endpoint with your actual endpoint
      const response = await axios.post(
        "http://localhost:5001/api/users/new",
        formData
      );

      if (response.status === 200) {
        const data = response.data;
        if (data.status === "success") {
          // Optionally, you can dispatch login action and set user state as well, similar to the login process.
          // dispatch(login(data.user));
          console.log("we created a user:", data);

          // Redirect to a success page or login page
          // history.push("/login");

          // resetInputs();
        } else {
          // setErrorMessage("Registration failed: " + data.message);
        }
      }
    } catch (error) {
      console.error("Registration Error:", error);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            ref={usernameRef}
            type="text"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            ref={emailRef}
            type="email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name:
          </label>
          <input
            ref={firstNameRef}
            type="text"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name:
          </label>
          <input
            ref={lastNameRef}
            type="text"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            ref={passwordRef}
            type="password"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Add three input fields for skills, education, and work experience */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Skills:
          </label>
          <input
            ref={skillsRef}
            type="text"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Education:
          </label>
          <input
            ref={educationRef}
            type="text"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Work Experience:
          </label>
          <input
            ref={workExperienceRef}
            type="text"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tech Info:
          </label>
          <textarea
            ref={techInfoRef} 
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Personal Text:
          </label>
          <textarea
            ref={personalTextRef}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image URL:
          </label>
          <input
            ref={imgRef}
            type="file"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            onClick={() => {
              handleSubmit;
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Create user
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
