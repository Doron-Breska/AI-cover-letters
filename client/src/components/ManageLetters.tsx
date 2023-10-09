import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SingleLetter from "./SingleLetter";

const ManageLetters = () => {
  const letters = useSelector((state: RootState) => state.cover.letters);
  const sortedLetters = [...letters].sort((a, b) => b.c_v_id - a.c_v_id);

  return (
    <div className="letters-container">
      {sortedLetters.length === 0 ? (
        <p>no letters</p>
      ) : (
        sortedLetters.map((letter) => (
          <SingleLetter
            key={letter.c_v_id}
            c_v_id={letter.c_v_id}
            content={letter.content}
            company_name={letter.company_name}
            job_title={letter.job_title}
          />
        ))
      )}
    </div>
  );
};

export default ManageLetters;
