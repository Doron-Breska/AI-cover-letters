import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../slices/loaderSlice";
import "../styles/LoaderLetter.css";
import { getLetters } from "../slices/coverLetterSlice";

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
  const descriptionRef = useRef<HTMLInputElement>(null);

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
      console.error("Error updating user:", error);
    }
  };

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
      {user && user.username}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name: </label>
          <input ref={companyRef} type="text" required />
        </div>
        <div>
          <label>Job Title: </label>
          <input ref={titleRef} type="text" required />
        </div>
        <div>
          <label>Description: </label>
          <input ref={descriptionRef} type="text" required />
        </div>
        <button type="submit">Update</button>
      </form>
      <hr />
      <hr />
      <hr />
      <hr />
      {newLetter && (
        <>
          <h3>this is the new cover letter:</h3>
          <p className="cover-letter-paragraph">{newLetter}</p>
          {!hasSaved && (
            <>
              <button onClick={saveLetter}>SaveLetter</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CreateCoverLetter;
