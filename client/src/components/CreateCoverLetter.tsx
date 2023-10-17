import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../slices/loaderSlice";
import "../styles/LoaderLetter.css";
import { getLetters } from "../slices/coverLetterSlice";
import "../styles/CreateCoverLetter.css";
// import { BsSave2Fill } from "react-icons/bs";
import { FaShareAltSquare } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

interface LetterToSave {
  user_id: number;
  job_title: string;
  company_name: string;
  content: string;
}

interface CreateLetter {
  company_name: string;
  job_title: string;
  description: string;
}

const CreateCoverLetter = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const token = localStorage.getItem("token");
  const loading = useSelector((state: RootState) => state.loader.loading);
  const dispatch = useDispatch();
  const userId = user?.user_id;
  const [newLetter, setNewLetter] = useState<string>("");
  const [hasSaved, setHasSaved] = useState<boolean>(false);

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

  const updateLettersAeeatRedux = () => {
    axios
      .get("http://localhost:5001/api/c-l/user/", {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(toggleLoading());
    const infoForNewLetter: CreateLetter = {
      company_name: "",
      job_title: "",
      description: "",
    };
    if (companyRef.current?.value)
      infoForNewLetter.company_name = companyRef.current?.value;
    if (titleRef.current?.value)
      infoForNewLetter.job_title = titleRef.current?.value;
    if (descriptionRef.current?.value)
      infoForNewLetter.description = descriptionRef.current?.value;

    try {
      if (userId) {
        const response = await axios.post(
          `http://localhost:5001/api/c-l/new/`,
          infoForNewLetter,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("this is the cover letter:", response.data.message);
        dispatch(toggleLoading());
        setNewLetter(response.data.message);
        setHasSaved(false);
        setJt(titleRef.current!.value);
        setCn(companyRef.current!.value);
        setCon(response.data.message);
        resetInputs();
      } else {
        console.error("User ID is not available");
      }
    } catch (error) {
      console.error("Error with creating a letter:", error);
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
        `http://localhost:5001/api/c-l/save`,
        saveLetterData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        console.log("Letter saved successfully!", response.data);
        setHasSaved(true);
        updateLettersAeeatRedux();
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
            />
          </div>
          <button className="my-2 bg-white" type="submit">
            Create Cover Letter
          </button>
        </form>
        {newLetter && (
          <div className="text-center">
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
                {!hasSaved && (
                  <FaSave className="letter-btn" onClick={saveLetter} />
                )}
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
