import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getLetters } from "../slices/coverLetterSlice";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaShareAltSquare } from "react-icons/fa";
import { serverURL } from "../utils/serverURL";
import "../styles/ManageLetters.css";

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
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [deleted, setDeleted] = useState<boolean>(false);

  const updateLettersAeeatRedux = () => {
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

  const deleteLetter = async () => {
    try {
      const response = await axios.delete(`${serverURL}/api/c-l/${c_v_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    <div
      className={
        deleted ? "single-letter p-4 pr-4 disappear" : "single-letter p-4 pr-4"
      }
    >
      <p>
        <span className="underline italic font-medium">Company name:</span>
        <br />
        {company_name}
      </p>
      <p>
        <span className="underline italic font-medium">Job title:</span>

        <br />
        {job_title}
      </p>

      <span className="underline italic font-medium">Content:</span>

      <br />
      <p className="letter-content mt-2"> {content}</p>
      <div className="text-center  letter-btn-container">
        <RiDeleteBin2Fill
          className="letter-btn"
          onClick={() => {
            setDeleted(true);
            deleteLetter();
          }}
        />
        <FaShareAltSquare
          className="letter-btn share-btn"
          onClick={() => {
            const mailtoLink = `mailto:?body=${encodeURIComponent(content)}`;
            window.location.href = mailtoLink;
          }}
        />
      </div>
    </div>
  );
};

export default SingleLetter;
