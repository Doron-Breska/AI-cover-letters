import React, { useRef } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../slices/userSlice";
// import { RootState } from "../store/store";

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
}

const Register: React.FC = () => {
  // const dispatch = useDispatch();

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const techInfoRef = useRef<HTMLTextAreaElement>(null);
  const personalTextRef = useRef<HTMLTextAreaElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const leadershipRef = useRef<HTMLInputElement>(null);
  const adaptabilityRef = useRef<HTMLInputElement>(null);
  const proactivityRef = useRef<HTMLInputElement>(null);
  const attentionToDetailRef = useRef<HTMLInputElement>(null);
  const spontaneityRef = useRef<HTMLInputElement>(null);
  const teamworkRef = useRef<HTMLInputElement>(null);
  const resilienceRef = useRef<HTMLInputElement>(null);
  const innovativenessRef = useRef<HTMLInputElement>(null);
  const emotionalIntelligenceRef = useRef<HTMLInputElement>(null);

  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // const resetInputs = () => {
  //   if (usernameRef.current) usernameRef.current.value = "";
  //   if (emailRef.current) emailRef.current.value = "";
  //   if (passwordRef.current) passwordRef.current.value = "";
  //   // Reset other inputs here
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const personalInfo: PersonalInfo = {
      Leadership: leadershipRef.current?.value || "",
      Adaptability_Flexibility: adaptabilityRef.current?.value || "",
      Proactivity_Initiative: proactivityRef.current?.value || "",
      Attention_to_Detail: attentionToDetailRef.current?.value || "",
      Spontaneity: spontaneityRef.current?.value || "",
      Teamwork_Collaboration: teamworkRef.current?.value || "",
      Resilience: resilienceRef.current?.value || "",
      Innovativeness_Creativity: innovativenessRef.current?.value || "",
      Emotional_Intelligence: emotionalIntelligenceRef.current?.value || "",
    };

    const newUser: NewUser = {
      username: usernameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      first_name: firstNameRef.current?.value || "",
      last_name: lastNameRef.current?.value || "",
      tech_info: techInfoRef.current?.value || "",
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
      // setErrorMessage("Registration Error: " + error.message);
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
       {/* Personal Info Fields */}
       {/* Add styling for personal info fields here */}
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
