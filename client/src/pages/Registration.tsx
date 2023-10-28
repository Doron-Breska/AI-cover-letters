import { useRef, useState } from "react";
import axios from "axios";
import "../styles/Registration.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../slices/loaderSlice";
import "../styles/LoaderProfile.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import React from "react";
import { serverURL } from "../utils/serverURL";

type Avatar = string | File;

interface NewUser {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  tech_info: string;
  personal_text: string;
  img: Avatar;
  personal_info: PersonalInfo;
}

interface PersonalInfo {
  Leadership: string;
  "Adaptability & Flexibility": string;
  "Proactivity & Initiative": string;
  "Attention to details": string;
  Spontaneity: string;
  "Teamwork & Collaboration": string;
  Resilience: string;
  "Innovativeness & Creativity": string;
  "Emotional intelligence": string;
}

const Registration = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loader.loading);
  const errorRef = useRef<HTMLDivElement>(null);
  const scrollToMsg = () => {
    errorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const personalTextRef = useRef<HTMLTextAreaElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const leadershipRef = useRef<HTMLInputElement>(null);
  const leadershipLabelRef = useRef<HTMLLabelElement>(null);

  const adaptabilityRef = useRef<HTMLInputElement>(null);
  const adaptabilityLabelRef = useRef<HTMLLabelElement>(null);

  const proactivityRef = useRef<HTMLInputElement>(null);
  const proactivityLabelRef = useRef<HTMLLabelElement>(null);

  const attentionToDetailRef = useRef<HTMLInputElement>(null);
  const attentionToDetailLabelRef = useRef<HTMLLabelElement>(null);

  const spontaneityRef = useRef<HTMLInputElement>(null);
  const spontaneityLabelRef = useRef<HTMLLabelElement>(null);

  const teamworkRef = useRef<HTMLInputElement>(null);
  const teamworkLabelRef = useRef<HTMLLabelElement>(null);

  const resilienceRef = useRef<HTMLInputElement>(null);
  const resilienceLabelRef = useRef<HTMLLabelElement>(null);

  const innovativenessRef = useRef<HTMLInputElement>(null);
  const innovativenessLabelRef = useRef<HTMLLabelElement>(null);

  const emotionalIntelligenceRef = useRef<HTMLInputElement>(null);
  const emotionalIntelligenceLabelRef = useRef<HTMLLabelElement>(null);

  const skillsRef = useRef<HTMLTextAreaElement>(null);
  const educationRef = useRef<HTMLTextAreaElement>(null);
  const workExperienceRef = useRef<HTMLTextAreaElement>(null);

  const [msg, setMsg] = useState<string | null>(null);

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = () => {
    const file = imgRef.current?.files?.[0];
    setSelectedFileName(file ? file.name : null);
  };

  const resetRefs = () => {
    usernameRef.current!.value = "";
    emailRef.current!.value = "";
    firstNameRef.current!.value = "";
    lastNameRef.current!.value = "";
    passwordRef.current!.value = "";
    personalTextRef.current!.value = "";
    imgRef.current!.value = "";
    leadershipRef.current!.value = "";
    adaptabilityRef.current!.value = "";
    proactivityRef.current!.value = "";
    attentionToDetailRef.current!.value = "";
    spontaneityRef.current!.value = "";
    teamworkRef.current!.value = "";
    resilienceRef.current!.value = "";
    innovativenessRef.current!.value = "";
    emotionalIntelligenceRef.current!.value = "";
    skillsRef.current!.value = "";
    educationRef.current!.value = "";
    workExperienceRef.current!.value = "";
    emotionalIntelligenceLabelRef.current!.textContent =
      "Emotional Intelligence: ";
    innovativenessLabelRef.current!.textContent = `Innovativeness & Creativity: `;
    resilienceLabelRef.current!.textContent = `Resilience: `;
    teamworkLabelRef.current!.textContent = `Teamwork & Collaboration: `;
    spontaneityLabelRef.current!.textContent = `Spontaneity: `;
    attentionToDetailLabelRef.current!.textContent = `Attention to details: `;
    proactivityLabelRef.current!.textContent = `Proactivity & Initiative: `;
    adaptabilityLabelRef.current!.textContent = `Adaptability & Flexibility: `;
    leadershipLabelRef.current!.textContent = `Leadership: `;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(toggleLoading());
    if (
      !usernameRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !firstNameRef.current?.value ||
      !lastNameRef.current?.value ||
      !skillsRef.current?.value ||
      !educationRef.current?.value ||
      !workExperienceRef.current?.value ||
      !leadershipRef.current?.value ||
      !adaptabilityRef.current?.value ||
      !proactivityRef.current?.value ||
      !attentionToDetailRef.current?.value ||
      !spontaneityRef.current?.value ||
      !teamworkRef.current?.value ||
      !resilienceRef.current?.value ||
      !innovativenessRef.current?.value ||
      !emotionalIntelligenceRef.current?.value
    ) {
      console.error("Please fill out all required fields");
      return;
    }

    const skillsValue = skillsRef.current?.value;
    const educationValue = educationRef.current?.value;
    const workExperienceValue = workExperienceRef.current?.value;

    const selectedFile = imgRef.current?.files && imgRef.current.files[0];
    const imageValue =
      selectedFile ||
      "https://res.cloudinary.com/danq3q4qv/image/upload/v1683035195/avatars/default-profile-picture-avatar-photo-placeholder-vector-illustration-700-205664584_z4jvlo.jpg";

    const techInfoValue = `Skills:${skillsValue}. Education :${educationValue}. Previous work experience: ${workExperienceValue}`;

    const personalInfo: PersonalInfo = {
      Leadership: leadershipRef.current?.value,
      "Adaptability & Flexibility": adaptabilityRef.current?.value,
      "Proactivity & Initiative": proactivityRef.current?.value,
      "Attention to details": attentionToDetailRef.current?.value,
      Spontaneity: spontaneityRef.current?.value,
      "Teamwork & Collaboration": teamworkRef.current?.value,
      Resilience: resilienceRef.current?.value,
      "Innovativeness & Creativity": innovativenessRef.current?.value,
      "Emotional intelligence": emotionalIntelligenceRef.current?.value,
    };

    const newUser: NewUser = {
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      first_name: firstNameRef.current?.value,
      last_name: lastNameRef.current?.value,
      tech_info: techInfoValue,
      personal_text: personalTextRef.current?.value || "",
      img: imageValue, // Updated for file upload
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
      if (selectedFile) {
        formData.append("img", selectedFile);
      } else {
        formData.append(
          "img",
          "https://res.cloudinary.com/danq3q4qv/image/upload/v1683035195/avatars/default-profile-picture-avatar-photo-placeholder-vector-illustration-700-205664584_z4jvlo.jpg"
        );
      }
      const response = await axios.post(
        // "http://localhost:5001/api/users/new",
        `${serverURL}/api/users/new`,

        formData
      );

      if (response.status === 200) {
        const data = response.data;
        if (data.status === "success") {
          console.log("we created a user:", data);
          setMsg("Registered successfully, please log in from the sidebar.");
          scrollToMsg();
          resetRefs();
          dispatch(toggleLoading());
        }
      }
      //eslint-disable-next-line
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Registration Error:", error.response.data.message);
        dispatch(toggleLoading());
        setMsg(error.response.data.message);
        scrollToMsg();
      } else {
        console.error("An unknown error occurred:", error);
        setMsg("Something went wrong, Please try again.");
        scrollToMsg();
      }
    }
  };

  return (
    <div className="reg-container">
      {loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="200px"
          width="200px"
          viewBox="0 0 200 200"
          className="pencil"
        >
          <defs>
            <clipPath id="pencil-eraser">
              <rect height="30" width="30" ry="5" rx="5"></rect>
            </clipPath>
          </defs>
          <circle
            transform="rotate(-113,100,100)"
            strokeLinecap="round"
            strokeDashoffset="439.82"
            strokeDasharray="439.82 439.82"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            r="70"
            className="pencilStroke"
          ></circle>
          <g transform="translate(100,100)" className="pencilRotate">
            <g fill="none">
              <circle
                transform="rotate(-90)"
                strokeDashoffset="402"
                strokeDasharray="402.12 402.12"
                strokeWidth="30"
                stroke="hsl(223,90%,50%)"
                r="64"
                className="pencilBody1"
              ></circle>
              <circle
                transform="rotate(-90)"
                strokeDashoffset="465"
                strokeDasharray="464.96 464.96"
                strokeWidth="10"
                stroke="hsl(223,90%,60%)"
                r="74"
                className="pencilBody2"
              ></circle>
              <circle
                transform="rotate(-90)"
                strokeDashoffset="339"
                strokeDasharray="339.29 339.29"
                strokeWidth="10"
                stroke="hsl(223,90%,40%)"
                r="54"
                className="pencilBody3"
              ></circle>
            </g>
            <g transform="rotate(-90) translate(49,0)" className="pencilEraser">
              <g className="pencilEraserSkew">
                <rect
                  height="30"
                  width="30"
                  ry="5"
                  rx="5"
                  fill="hsl(223,90%,70%)"
                ></rect>
                <rect
                  clipPath="url(#pencil-eraser)"
                  height="30"
                  width="5"
                  fill="hsl(223,90%,60%)"
                ></rect>
                <rect height="20" width="30" fill="hsl(223,10%,90%)"></rect>
                <rect height="20" width="15" fill="hsl(223,10%,70%)"></rect>
                <rect height="20" width="5" fill="hsl(223,10%,80%)"></rect>
                <rect
                  height="2"
                  width="30"
                  y="6"
                  fill="hsla(223,10%,10%,0.2)"
                ></rect>
                <rect
                  height="2"
                  width="30"
                  y="13"
                  fill="hsla(223,10%,10%,0.2)"
                ></rect>
              </g>
            </g>
            <g
              transform="rotate(-90) translate(49,-30)"
              className="pencilPoint"
            >
              <polygon
                points="15 0,30 30,0 30"
                fill="hsl(33,90%,70%)"
              ></polygon>
              <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,50%)"></polygon>
              <polygon
                points="15 0,20 10,10 10"
                fill="hsl(223,10%,10%)"
              ></polygon>
            </g>
          </g>
        </svg>
      )}
      <form className="reg-form my-24" onSubmit={handleSubmit}>
        <div className="first-questionnaire">
          <p className="register-header">Part A</p>
          <label>Username:</label>
          <input
            className="my-1"
            ref={usernameRef}
            type="text"
            required
            placeholder="John"
          />

          <label>Email:</label>
          <input
            className="my-1"
            ref={emailRef}
            type="email"
            required
            placeholder="john.doe@example.com"
          />
          <label>First Name:</label>
          <input
            className="my-1"
            ref={firstNameRef}
            type="text"
            required
            placeholder="John"
          />

          <label>Last Name:</label>
          <input
            className="my-1"
            ref={lastNameRef}
            type="text"
            required
            placeholder="Doe"
          />

          <label>Password:</label>
          <input
            className="my-1"
            ref={passwordRef}
            type="password"
            required
            minLength={6}
            placeholder="Min 6 characters"
          />

          <label>Skills:</label>
          <textarea
            className="mt-1"
            ref={skillsRef}
            required
            placeholder="JavaScript, TypeScript, React, Agile...."
          />

          <label>Education:</label>
          <textarea
            className="mt-1"
            ref={educationRef}
            required
            rows={3}
            placeholder="BA degree in art from the Berlin University of the Arts."
          />

          <label>Work Experience:</label>
          <textarea
            className="mt-1"
            ref={workExperienceRef}
            required
            rows={3}
            placeholder="Head of marketring at La Maison Berlin, Januar 2018 - Januar 2020. Senior back-end developer at BMW, April 2020 - October 2023."
          />

          <label>Personal Text:</label>
          <textarea
            className="mt-1 mb-1"
            placeholder="This part is optional! Feel free to tell us anything interesting about yourself, whether you like gardening or your favorite volunteering organization."
            ref={personalTextRef}
            rows={3}
          />

          {/* <label>Image:</label>
          <input className="my-1" ref={imgRef} type="file" /> */}
          <div className="file-input-container my-1">
            <label>Img:</label>
            <input
              type="file"
              id="fileInput"
              className="hidden-file-input"
              ref={imgRef}
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="custom-file-button">
              Choose a file
            </label>
            <span className="file-name">
              {selectedFileName || "No file chosen"}
            </span>
          </div>
        </div>

        <div className="second-questionnaire text-center">
          <p className="register-header">Part B</p>
          <p className="mb-2 italic">
            *Make sure you can see value after each headre!
          </p>
          <label ref={leadershipLabelRef}>Leadership: </label>
          <input
            className="my-3"
            ref={leadershipRef}
            type="range"
            required
            min="0"
            max="5"
            step="1"
            onChange={() => {
              if (leadershipLabelRef.current && leadershipRef.current) {
                leadershipLabelRef.current.textContent = `Leadership: ${leadershipRef.current.value}`;
              }
            }}
          />

          <label ref={adaptabilityLabelRef}>Adaptability & Flexibility: </label>
          <input
            className="my-3"
            ref={adaptabilityRef}
            type="range"
            required
            min="0"
            max="5"
            step="1"
            onChange={() => {
              if (adaptabilityLabelRef.current && adaptabilityRef.current) {
                adaptabilityLabelRef.current.textContent = `Adaptability & Flexibility:  ${adaptabilityRef.current.value}`;
              }
            }}
          />

          <label ref={proactivityLabelRef}>Proactivity & Initiative: </label>
          <input
            className="my-3"
            ref={proactivityRef}
            type="range"
            required
            min="0"
            max="5"
            step="1"
            onChange={() => {
              if (proactivityLabelRef.current && proactivityRef.current) {
                proactivityLabelRef.current.textContent = `Proactivity & Initiative: ${proactivityRef.current.value}`;
              }
            }}
          />

          <label ref={attentionToDetailLabelRef}>Attention to details: </label>
          <input
            className="my-3"
            ref={attentionToDetailRef}
            type="range"
            required
            min="0"
            max="5"
            step="1"
            onChange={() => {
              if (
                attentionToDetailLabelRef.current &&
                attentionToDetailRef.current
              ) {
                attentionToDetailLabelRef.current.textContent = `Attention to details: ${attentionToDetailRef.current.value}`;
              }
            }}
          />

          <label ref={spontaneityLabelRef}>Spontaneity: </label>
          <input
            className="my-3"
            ref={spontaneityRef}
            type="range"
            required
            min="0"
            max="5"
            step="1"
            onChange={() => {
              if (spontaneityLabelRef.current && spontaneityRef.current) {
                spontaneityLabelRef.current.textContent = `Spontaneity: ${spontaneityRef.current.value}`;
              }
            }}
          />

          <label ref={teamworkLabelRef}>Teamwork & Collaboration: </label>
          <input
            className="my-3"
            ref={teamworkRef}
            type="range"
            required
            min="0"
            max="5"
            step="1"
            onChange={() => {
              if (teamworkLabelRef.current && teamworkRef.current) {
                teamworkLabelRef.current.textContent = `Teamwork & Collaboration: ${teamworkRef.current.value}`;
              }
            }}
          />

          <label ref={resilienceLabelRef}>Resilience: </label>
          <input
            className="my-3"
            ref={resilienceRef}
            type="range"
            required
            min="0"
            max="5"
            step="1"
            onChange={() => {
              if (resilienceLabelRef.current && resilienceRef.current) {
                resilienceLabelRef.current.textContent = `Resilience: ${resilienceRef.current.value}`;
              }
            }}
          />

          <label ref={innovativenessLabelRef}>
            Innovativeness & Creativity:{" "}
          </label>
          <input
            className="my-3"
            ref={innovativenessRef}
            type="range"
            required
            min="0"
            max="5"
            step="1"
            onChange={() => {
              if (innovativenessLabelRef.current && innovativenessRef.current) {
                innovativenessLabelRef.current.textContent = `Innovativeness & Creativity: ${innovativenessRef.current.value}`;
              }
            }}
          />

          <label ref={emotionalIntelligenceLabelRef}>
            Emotional Intelligence:{" "}
          </label>
          <input
            className="my-3"
            ref={emotionalIntelligenceRef}
            type="range"
            required
            min="0"
            max="5"
            step="1"
            onChange={() => {
              if (
                emotionalIntelligenceLabelRef.current &&
                emotionalIntelligenceRef.current
              ) {
                emotionalIntelligenceLabelRef.current.textContent = `Emotional Intelligence: ${emotionalIntelligenceRef.current.value}`;
              }
            }}
          />

          <button className="my-6 bg-slate-50" type="submit">
            Register
          </button>

          {msg && (
            <div className="reg-error-div" ref={errorRef}>
              <h2 className="font-extrabold	">{msg}</h2>
              <AiOutlineCloseCircle
                className="close-error-reg mt-2"
                onClick={() => {
                  setMsg("");
                }}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Registration;
