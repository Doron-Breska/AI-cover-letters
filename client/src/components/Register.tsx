import React, { useRef } from "react";
import axios from "axios";
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username: </label>
        <input ref={usernameRef} type="text" required />
      </div>
      <div>
        <label>Email: </label>
        <input ref={emailRef} type="email" required />
      </div>
      <div>
        <label>First Name: </label>
        <input ref={firstNameRef} type="text" required />
      </div>
      <div>
        <label>Last Name: </label>
        <input ref={lastNameRef} type="text" required />
      </div>
      <div>
        <label>Password: </label>
        <input ref={passwordRef} type="password" required />
      </div>
      <div>
        <label>Tech Info: </label>
        <textarea ref={techInfoRef} required />
      </div>
      <div>
        <label>Personal Text: </label>
        <textarea ref={personalTextRef} required />
      </div>
      <div>
        <label>Image URL: </label>
        <input ref={imgRef} type="file" required />
      </div>
      {/* Personal Info Fields */}
      <div>
        <label>Leadership: </label>
        <input
          ref={leadershipRef}
          type="number"
          step="0.2"
          min="0"
          max="1"
          required
        />
      </div>
      <div>
        <label>Adaptability/Flexibility: </label>
        <input
          ref={adaptabilityRef}
          type="number"
          step="0.2"
          min="0"
          max="1"
          required
        />
      </div>
      <div>
        <label>Proactivity/Initiative: </label>
        <input
          ref={proactivityRef}
          type="number"
          step="0.2"
          min="0"
          max="1"
          required
        />
      </div>
      <div>
        <label>Attention to Detail: </label>
        <input
          ref={attentionToDetailRef}
          type="number"
          step="0.2"
          min="0"
          max="1"
          required
        />
      </div>
      <div>
        <label>Spontaneity: </label>
        <input
          ref={spontaneityRef}
          type="number"
          step="0.2"
          min="0"
          max="1"
          required
        />
      </div>
      <div>
        <label>Teamwork/Collaboration: </label>
        <input
          ref={teamworkRef}
          type="number"
          step="0.2"
          min="0"
          max="1"
          required
        />
      </div>
      <div>
        <label>Resilience: </label>
        <input
          ref={resilienceRef}
          type="number"
          step="0.2"
          min="0"
          max="1"
          required
        />
      </div>
      <div>
        <label>Innovativeness/Creativity: </label>
        <input
          ref={innovativenessRef}
          type="number"
          step="0.2"
          min="0"
          max="1"
          required
        />
      </div>
      <div>
        <label>Emotional Intelligence: </label>
        <input
          ref={emotionalIntelligenceRef}
          type="number"
          step="0.2"
          min="0"
          max="1"
          required
        />
      </div>
      <button
        type="submit"
        onClick={() => {
          handleSubmit;
        }}
      >
        Create user
      </button>
    </form>
  );
};

export default Register;
