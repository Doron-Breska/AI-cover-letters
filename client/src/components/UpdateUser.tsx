import React, { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login } from "../slices/userSlice";
import { useDispatch } from "react-redux";

interface PersonalInfo {
  Leadership?: string;
  Adaptability_Flexibility?: string;
  Proactivity_Initiative?: string;
  Attention_to_Detail?: string;
  Spontaneity?: string;
  Teamwork_Collaboration?: string;
  Resilience?: string;
  Innovativeness_Creativity?: string;
  Emotional_Intelligence?: string;
}

const UpdateUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const userId = user?.user_id;

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const techInfoRef = useRef<HTMLTextAreaElement>(null);
  const personalTextRef = useRef<HTMLTextAreaElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  // Personal Info Refs
  const leadershipRef = useRef<HTMLInputElement>(null);
  const adaptabilityRef = useRef<HTMLInputElement>(null);
  const proactivityRef = useRef<HTMLInputElement>(null);
  const attentionToDetailRef = useRef<HTMLInputElement>(null);
  const spontaneityRef = useRef<HTMLInputElement>(null);
  const teamworkRef = useRef<HTMLInputElement>(null);
  const resilienceRef = useRef<HTMLInputElement>(null);
  const innovativenessRef = useRef<HTMLInputElement>(null);
  const emotionalIntelligenceRef = useRef<HTMLInputElement>(null);

  const updateUserObjectRedux = () => {
    axios
      .get("http://localhost:5001/api/users/active", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "Success") {
          dispatch(login(data.activeUser));
        }
      })
      .catch((error) => {
        console.error("There was an error retrieving the data", error);
      });
  };

  const resetInputs = () => {
    if (usernameRef.current) usernameRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (firstNameRef.current) firstNameRef.current.value = "";
    if (lastNameRef.current) lastNameRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
    if (techInfoRef.current) techInfoRef.current.value = "";
    if (personalTextRef.current) personalTextRef.current.value = "";
    if (imgRef.current) imgRef.current.value = "";
    // Personal Info Refs
    if (leadershipRef.current) leadershipRef.current.value = "";
    if (adaptabilityRef.current) adaptabilityRef.current.value = "";
    if (proactivityRef.current) proactivityRef.current.value = "";
    if (attentionToDetailRef.current) attentionToDetailRef.current.value = "";
    if (spontaneityRef.current) spontaneityRef.current.value = "";
    if (teamworkRef.current) teamworkRef.current.value = "";
    if (resilienceRef.current) resilienceRef.current.value = "";
    if (innovativenessRef.current) innovativenessRef.current.value = "";
    if (emotionalIntelligenceRef.current)
      emotionalIntelligenceRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (usernameRef.current?.value)
      formData.append("username", usernameRef.current?.value);
    if (emailRef.current?.value)
      formData.append("email", emailRef.current?.value);
    if (passwordRef.current?.value)
      formData.append("password", passwordRef.current?.value);
    if (firstNameRef.current?.value)
      formData.append("first_name", firstNameRef.current?.value);
    if (lastNameRef.current?.value)
      formData.append("last_name", lastNameRef.current?.value);
    if (techInfoRef.current?.value)
      formData.append("tech_info", techInfoRef.current?.value);
    if (personalTextRef.current?.value)
      formData.append("personal_text", personalTextRef.current?.value);
    if (imgRef.current?.files && imgRef.current.files.length > 0) {
      formData.append("img", imgRef.current?.files[0]);
    }

    const personalInfo: PersonalInfo = {};
    if (leadershipRef.current?.value)
      personalInfo.Leadership = leadershipRef.current?.value;
    if (adaptabilityRef.current?.value)
      personalInfo.Adaptability_Flexibility = adaptabilityRef.current?.value;
    if (proactivityRef.current?.value)
      personalInfo.Proactivity_Initiative = proactivityRef.current?.value;
    if (attentionToDetailRef.current?.value)
      personalInfo.Attention_to_Detail = attentionToDetailRef.current?.value;
    if (spontaneityRef.current?.value)
      personalInfo.Spontaneity = spontaneityRef.current?.value;
    if (teamworkRef.current?.value)
      personalInfo.Teamwork_Collaboration = teamworkRef.current?.value;
    if (resilienceRef.current?.value)
      personalInfo.Resilience = resilienceRef.current?.value;
    if (innovativenessRef.current?.value)
      personalInfo.Innovativeness_Creativity = innovativenessRef.current?.value;
    if (emotionalIntelligenceRef.current?.value)
      personalInfo.Emotional_Intelligence =
        emotionalIntelligenceRef.current?.value;

    if (Object.keys(personalInfo).length > 0)
      formData.append("personal_info", JSON.stringify(personalInfo));

    try {
      if (userId) {
        const response = await axios.put(
          `http://localhost:5001/api/users/update/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("User updated successfully:", response.data);
        updateUserObjectRedux();
        resetInputs();
      } else {
        console.error("User ID is not available");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username: </label>
        <input ref={usernameRef} type="text" />
      </div>
      <div>
        <label>Email: </label>
        <input ref={emailRef} type="email" />
      </div>
      <div>
        <label>First Name: </label>
        <input ref={firstNameRef} type="text" />
      </div>
      <div>
        <label>Last Name: </label>
        <input ref={lastNameRef} type="text" />
      </div>
      <div>
        <label>Password: </label>
        <input ref={passwordRef} type="password" />
      </div>
      <div>
        <label>Tech Info: </label>
        <textarea ref={techInfoRef} />
      </div>
      <div>
        <label>Personal Text: </label>
        <textarea ref={personalTextRef} />
      </div>
      <div>
        <label>Image URL: </label>
        <input ref={imgRef} type="file" name="img" />
      </div>
      {/* Personal Info Fields */}
      <div>
        <label>Leadership: </label>
        <input ref={leadershipRef} type="number" step="0.2" min="0" max="1" />
      </div>
      <div>
        <label>Adaptability/Flexibility: </label>
        <input ref={adaptabilityRef} type="number" step="0.2" min="0" max="1" />
      </div>
      <div>
        <label>Proactivity/Initiative: </label>
        <input ref={proactivityRef} type="number" step="0.2" min="0" max="1" />
      </div>
      <div>
        <label>Attention to Detail: </label>
        <input
          ref={attentionToDetailRef}
          type="number"
          step="0.2"
          min="0"
          max="1"
        />
      </div>
      <div>
        <label>Spontaneity: </label>
        <input ref={spontaneityRef} type="number" step="0.2" min="0" max="1" />
      </div>
      <div>
        <label>Teamwork/Collaboration: </label>
        <input ref={teamworkRef} type="number" step="0.2" min="0" max="1" />
      </div>
      <div>
        <label>Resilience: </label>
        <input ref={resilienceRef} type="number" step="0.2" min="0" max="1" />
      </div>
      <div>
        <label>Innovativeness/Creativity: </label>
        <input
          ref={innovativenessRef}
          type="number"
          step="0.2"
          min="0"
          max="1"
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
        />
      </div>
      <button
        type="submit"
        onClick={() => {
          handleSubmit;
        }}
      >
        Update
      </button>
    </form>
  );
};

export default UpdateUser;
