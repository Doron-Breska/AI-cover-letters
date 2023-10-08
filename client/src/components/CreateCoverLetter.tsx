import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../slices/loaderSlice";
import "../styles/LoaderLetter.css";

interface CreateLetter {
  company_name: string;
  job_title: string;
  description: string;
}
const CreateCoverLetter = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const token = localStorage.getItem("token");
  const [newLetter, setNewLetter] = useState<string>("");
  const loading = useSelector((state: RootState) => state.loader.loading);
  const dispatch = useDispatch();

  const userId = user?.user_id;
  const companyRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const resetInputs = () => {
    if (companyRef.current) companyRef.current.value = "";
    if (titleRef.current) titleRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
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
        resetInputs();
        setNewLetter(response.data.message);
      } else {
        console.error("User ID is not available");
      }
    } catch (error) {
      console.error("Error updating user:", error);
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
      {newLetter && <p>{newLetter}</p>}
    </>
  );
};

export default CreateCoverLetter;
