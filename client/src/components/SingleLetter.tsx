import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getLetters } from "../slices/coverLetterSlice";

interface SingleLetterProps {
  c_v_id: number;
  content: string;
  company_name: string;
  job_title: string;
}

const SingleLetter: React.FC<SingleLetterProps> = ({
  c_v_id,
  content,
  company_name,
  job_title,
}) => {
  //   const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

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

  const deleteLetter = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/c-l/${c_v_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.status === "Success") {
        updateLettersAeeatRedux();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error deleting the letter (front):", error);
    }
  };

  return (
    <div className="single-letter">
      <p>
        Company name:
        <br />
        {company_name}
      </p>
      <p>
        Job title:
        <br />
        {job_title}
      </p>
      <p>
        Content:
        <br />
        {content}
      </p>
      <button
        onClick={() => {
          deleteLetter();
        }}
      >
        Delete Letter
      </button>
    </div>
  );
};

export default SingleLetter;
