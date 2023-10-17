import { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../slices/loaderSlice";
import "../styles/LoaderProfile.css";
import "../styles/UpdateUser.css";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

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

const UpdateUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loader.loading);

  const [msg, setMsg] = useState<string | null>(null);
  const errorRef1 = useRef<HTMLDivElement>(null);

  const scrollToMsg = () => {
    errorRef1.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [msg2, setMsg2] = useState<string | null>(null);
  const errorRef2 = useRef<HTMLDivElement>(null);

  const scrollToMsg2 = () => {
    errorRef2.current?.scrollIntoView({ behavior: "smooth" });
  };

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

    try {
      if (!userId) {
        throw new Error("User ID is not available");
      }

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

      if (response.data.status === "Success") {
        console.log("User updated successfully:", response.data);
        updateUserObjectRedux();
        resetInputs();
        setMsg("User has been updated successfully!");
        scrollToMsg();
      } else {
        console.error("Error from server ", response.data.message);
        setMsg(response.data.message);
        resetInputs();
        scrollToMsg();
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Server Errorrrrrr:", error.response.data.message);
        setMsg(error.response.data.message);
        scrollToMsg();
        resetInputs();
      } else {
        console.error("General Error updating user:", error);
        setMsg("Something went wrong, pls try again.");
        resetInputs();
        scrollToMsg();
      }
    } finally {
      dispatch(toggleLoading());
    }
  };

  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(toggleLoading());

    const formData = new FormData();

    const personalInfo: PersonalInfo = {
      Leadership: "",
      "Adaptability & Flexibility": "",
      "Proactivity & Initiative": "",
      "Attention to details": "",
      Spontaneity: "",
      "Teamwork & Collaboration": "",
      Resilience: "",
      "Innovativeness & Creativity": "",
      "Emotional intelligence": "",
    };
    if (leadershipRef.current?.value)
      personalInfo.Leadership = leadershipRef.current?.value;
    if (adaptabilityRef.current?.value)
      personalInfo["Adaptability & Flexibility"] =
        adaptabilityRef.current?.value;
    if (proactivityRef.current?.value)
      personalInfo["Proactivity & Initiative"] = proactivityRef.current?.value;
    if (attentionToDetailRef.current?.value)
      personalInfo["Attention to details"] =
        attentionToDetailRef.current?.value;
    if (spontaneityRef.current?.value)
      personalInfo.Spontaneity = spontaneityRef.current?.value;
    if (teamworkRef.current?.value)
      personalInfo["Teamwork & Collaboration"] = teamworkRef.current?.value;
    if (resilienceRef.current?.value)
      personalInfo.Resilience = resilienceRef.current?.value;
    if (innovativenessRef.current?.value)
      personalInfo["Innovativeness & Creativity"] =
        innovativenessRef.current?.value;
    if (emotionalIntelligenceRef.current?.value)
      personalInfo["Emotional intelligence"] =
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
        if (response.status === 200) {
          console.log("User updated successfully:", response.data);
          dispatch(toggleLoading());
          updateUserObjectRedux();
          setMsg2("User has been updated successfully!");
          scrollToMsg2();
          resetInputs();
        } else {
          console.log("error-msg:", response.data.message);
          setMsg2(response.data.message);
          scrollToMsg2();
          resetInputs();
          dispatch(toggleLoading());
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setMsg("Something went wrong, pls try again.");
      dispatch(toggleLoading());
      scrollToMsg2();
    }
  };

  return (
    <>
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
            stroke-linecap="round"
            stroke-dashoffset="439.82"
            stroke-dasharray="439.82 439.82"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            r="70"
            className="pencil__stroke"
          ></circle>
          <g transform="translate(100,100)" className="pencil__rotate">
            <g fill="none">
              <circle
                transform="rotate(-90)"
                stroke-dashoffset="402"
                stroke-dasharray="402.12 402.12"
                stroke-width="30"
                stroke="hsl(223,90%,50%)"
                r="64"
                className="pencil__body1"
              ></circle>
              <circle
                transform="rotate(-90)"
                stroke-dashoffset="465"
                stroke-dasharray="464.96 464.96"
                stroke-width="10"
                stroke="hsl(223,90%,60%)"
                r="74"
                className="pencil__body2"
              ></circle>
              <circle
                transform="rotate(-90)"
                stroke-dashoffset="339"
                stroke-dasharray="339.29 339.29"
                stroke-width="10"
                stroke="hsl(223,90%,40%)"
                r="54"
                className="pencil__body3"
              ></circle>
            </g>
            <g
              transform="rotate(-90) translate(49,0)"
              className="pencil__eraser"
            >
              <g className="pencil__eraser-skew">
                <rect
                  height="30"
                  width="30"
                  ry="5"
                  rx="5"
                  fill="hsl(223,90%,70%)"
                ></rect>
                <rect
                  clip-path="url(#pencil-eraser)"
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
              className="pencil__point"
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
      {/* <form className="update-form my-24" onSubmit={handleSubmit}> */}
      <div className="update-form my-24">
        <form className="first-questionnaire-update" onSubmit={handleSubmit}>
          <p className="register-header">Part A</p>

          <label>Username: </label>
          <input
            className="my-1"
            ref={usernameRef}
            type="text"
            placeholder={user! && user.username}
          />

          <label>Email: </label>
          <input
            className="my-1"
            ref={emailRef}
            type="email"
            placeholder={user! && user.email}
          />

          <label>First Name: </label>
          <input
            className="my-1"
            ref={firstNameRef}
            type="text"
            placeholder={user! && user.first_name}
          />

          <label>Last Name: </label>
          <input
            className="my-1"
            ref={lastNameRef}
            type="text"
            placeholder={user! && user.last_name}
          />

          <label>Password: </label>
          <input
            className="my-1"
            ref={passwordRef}
            type="password"
            placeholder="Min 6 characters"
          />

          <label>Tech Info: </label>

          <textarea
            className="mt-1"
            ref={techInfoRef}
            placeholder={user! && user.tech_info}
          />

          <label>Personal Text: </label>
          <textarea
            className="mt-1"
            ref={personalTextRef}
            placeholder={
              user && user.personal_text
                ? user.personal_text
                : "This part is optional! Feel free to tell us anything interesting about yourself, whether you like gardening or your favorite volunteering organization."
            }
          />
          <div className="img-update-con">
            <div className="img-el1">
              <label>Image URL: </label>
              <input className="my-1" ref={imgRef} type="file" name="img" />
            </div>
            <div className="img-el2">
              <img src={user?.img}></img>
            </div>
          </div>

          <div className="text-center">
            <button className=" bg-slate-50 my-6" type="submit">
              Update
            </button>
          </div>
          {msg && (
            <div className="reg-error-div" ref={errorRef1}>
              <h2 className="font-extrabold	">{msg}</h2>
              <AiOutlineCloseCircle
                className="close-error-reg mt-2"
                onClick={() => {
                  setMsg("");
                }}
              />
            </div>
          )}
        </form>

        <form
          className="second-questionnaire-update text-center"
          onSubmit={handleSubmit2}
        >
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
            Update
          </button>
          {msg2 && (
            <div className="reg-error-div" ref={errorRef2}>
              <h2 className="font-extrabold	">{msg2}</h2>
              <AiOutlineCloseCircle
                className="close-error-reg mt-2"
                onClick={() => {
                  setMsg2("");
                }}
              />
            </div>
          )}
        </form>
      </div>
      {/* </form> */}
    </>
  );
};

export default UpdateUser;
