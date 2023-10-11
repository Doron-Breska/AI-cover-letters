import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SingleLetter from "./SingleLetter";
import "../styles/ManageLetters.css";

const ManageLetters = () => {
  const letters = useSelector((state: RootState) => state.cover.letters);
  const sortedLetters = [...letters].sort((a, b) => b.c_v_id - a.c_v_id);

  return (
    <>
      {sortedLetters.length === 0 ? (
        <h1 className="text-3xl text-center mt-32">
          There are no saved letters
        </h1>
      ) : (
        <h1 className="text-3xl text-center mt-32">Saved letters</h1>
      )}
      <div className="flex my-32  pl-32 pr-32">
        {sortedLetters.length !== 0 &&
          sortedLetters.map((letter) => (
            <SingleLetter
              key={letter.c_v_id}
              c_v_id={letter.c_v_id}
              content={letter.content}
              company_name={letter.company_name}
              job_title={letter.job_title}
            />
          ))}
      </div>
    </>
  );
};

export default ManageLetters;
