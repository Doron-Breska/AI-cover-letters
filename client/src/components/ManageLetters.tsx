import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ManageLetters = () => {
  const letters = useSelector((state: RootState) => state.cover.letters);
  return (
    <>
      {letters.length === 0 ? (
        <p>no letters</p>
      ) : (
        letters.map((letter) => (
          <p key={letter.c_v_id} className="single-letter">
            {letter.job_title}
            {letter.content}
          </p>
        ))
      )}
    </>
  );
};

export default ManageLetters;
