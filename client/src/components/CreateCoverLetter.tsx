import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../slices/loaderSlice";
import "../styles/LoaderLetter.css";
import { getLetters } from "../slices/coverLetterSlice";
import "../styles/CreateCoverLetter.css";
import { FaShareAltSquare } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { serverURL } from "../utils/serverURL";
import OpenAI from "openai";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface LetterToSave {
  user_id: number;
  job_title: string;
  company_name: string;
  content: string;
}
type Evaluation = {
  Leadership: string;
  "Adaptability & Flexibility": string;
  "Proactivity & Initiative": string;
  "Attention to details": string;
  Spontaneity: string;
  "Teamwork & Collaboration": string;
  Resilience: string;
  "Innovativeness & Creativity": string;
  "Emotional intelligence": string;
};

const CreateCoverLetter = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const token = localStorage.getItem("token");
  const loading = useSelector((state: RootState) => state.loader.loading);
  const dispatch = useDispatch();
  const userId = user?.user_id;
  const [newLetter, setNewLetter] = useState<string>("");
  const [hasSaved, setHasSaved] = useState<boolean>(false);
  const [creatingLetter, setCreatingLetter] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const errorRef = useRef<HTMLDivElement>(null);

  const [jt, setJt] = useState<string>("");
  const [cn, setCn] = useState<string>("");
  const [con, setCon] = useState<string>("");

  const companyRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);

  const resetInputs = () => {
    if (companyRef.current) companyRef.current.value = "";
    if (titleRef.current) titleRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
  };

  const updateLettersRedux = () => {
    axios
      .get(`${serverURL}/api/c-l/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "Success") {
          dispatch(getLetters(data.data));
        }
      })
      .catch((error) => {
        console.error("Error fetching cover letters:", error);
      });
  };

  const scrollToHeading = () => {
    headingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openAi = async (
    userInfo: string,
    jobOffer: string,
    personalityEvaluation: Evaluation
  ) => {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `The user has shared their professional details: ${userInfo}. This is how the user ranked his personality characteristics :${personalityEvaluation}. Use the information to create a cover letter WITHOUT including thecharacteristics ranks.`,
          },
          { role: "user", content: `Job Offer: ${jobOffer}` },
          { role: "assistant", content: "Dear Hiring Manager," },
        ],
      });

      if (response.choices && response.choices.length > 0) {
        const content = response.choices[0].message.content;
        return content;
      } else {
        throw new Error("No choices available in the response from OpenAI");
      }
      //eslint-disable-next-line
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        throw new Error("Exceeded OpenAI budget limit.");
      } else {
        throw new Error("Error creating cover letter");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingLetter(true);
    dispatch(toggleLoading());

    const userInfo = user!.tech_info;
    const userPersonality = user!.personal_info as Evaluation;
    const jobOffer = `company name: ${companyRef.current!.value}.job title: ${
      titleRef.current!.value
    } description: ${descriptionRef.current!.value}`;

    try {
      const newLetterContent = await openAi(
        userInfo,
        jobOffer,
        userPersonality
      );
      setNewLetter(newLetterContent!);
      setJt(titleRef.current!.value);
      setCn(companyRef.current!.value);
      setCon(newLetterContent!);
      dispatch(toggleLoading());
      setHasSaved(false);
      resetInputs();
      setCreatingLetter(false);
      //eslint-disable-next-line
    } catch (error: any) {
      if (error.message === "Exceeded OpenAI budget limit.") {
        setErrorMsg("My OpenAI budget exceeded, Try again in few days.");
        dispatch(toggleLoading());
        setCreatingLetter(false);
      } else {
        setErrorMsg(
          "Something went wrong with creating the letter, Please try again."
        );
        dispatch(toggleLoading());
        setCreatingLetter(false);
      }
    }
  };

  useEffect(() => {
    if (newLetter) {
      scrollToHeading();
    }
  }, [newLetter]);

  const saveLetter = async () => {
    const saveLetterData: LetterToSave = {
      user_id: userId!,
      job_title: jt,
      company_name: cn,
      content: con,
    };

    try {
      const response = await axios.post(
        `${serverURL}/api/c-l/save`,
        saveLetterData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        updateLettersRedux();
      } else {
        console.error("Failed to save the letter.");
      }
    } catch (error) {
      console.error("Error saving letter:", error);
    }
  };

  return (
    <>
      {loading && (
        <div className="typewriter">
          <div className="slide">
            <i></i>
          </div>
          <div className="paper"></div>
          <div className="keyboard"></div>
        </div>
      )}

      <h1 className="text-3xl text-center mt-24 font-bold">
        Fill out the form <br /> to create a cover letter
      </h1>
      <div className="create-letter-form-container">
        <form className="create-letter-form" onSubmit={handleSubmit}>
          <div>
            <label>Company Name: </label>
            <input
              className="my-2 test create-letter-input"
              ref={companyRef}
              type="text"
              required
              data-testid="companyNameInput"
            />
          </div>
          <div>
            <label>Job Title: </label>
            <br />
            <input
              className="my-2 create-letter-input"
              ref={titleRef}
              type="text"
              required
              data-testid="jobTitleInput"
            />
          </div>
          <div>
            <label>Description: </label>
            <br />
            <textarea
              className="my-2 create-letter-input"
              ref={descriptionRef}
              rows={8}
              required
              data-testid="descriptionTextarea"
            />
          </div>
          <button
            className="my-2 bg-white"
            type="submit"
            disabled={creatingLetter}
          >
            Create Cover Letter
          </button>
          {errorMsg && (
            <div className="reg-error-div" ref={errorRef}>
              <h2 className="font-extrabold	">{errorMsg}</h2>
              <AiOutlineCloseCircle
                className="close-error-reg mt-2"
                onClick={() => {
                  setErrorMsg("");
                }}
              />
            </div>
          )}
        </form>
        {newLetter && (
          <div
            className="text-center"
            id="letterContainer"
            data-testid="letterContainer"
          >
            <h3
              className="text-2xl text-center mb-10 mt-20 font-bold"
              ref={headingRef}
            >
              this is the new cover letter:
            </h3>
            <div className="cover-letter-paragraph">
              {newLetter}
              <br />

              <div className="letter-btn-container">
                <FaSave
                  className={hasSaved ? "letter-btn disappear" : "letter-btn"}
                  onClick={() => {
                    setHasSaved(true);
                    saveLetter();
                  }}
                />
                <FaShareAltSquare
                  className="letter-btn"
                  onClick={() => {
                    const mailtoLink = `mailto:?body=${encodeURIComponent(
                      newLetter
                    )}`;
                    window.location.href = mailtoLink;
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateCoverLetter;
