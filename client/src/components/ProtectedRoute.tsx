import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      {user !== null ? (
        props.children
      ) : (
        <div className="restricted-page">
          <div className="reg-error-div">
            <h2 className="font-extrabold">
              This page is restricted,
              <br />
              LogIn / Register to discover more.
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
