import { MdOutlineSmsFailed } from "react-icons/md";
import { PANEL_STATUS } from "../constants";
import { Button } from "antd";

import "./index.css";
export const Fallback = ({ setPanelStatus }) => {
  return (
    <>
      <div className="fail-all">
        <MdOutlineSmsFailed className="mdOutlineSmsFailed" />
        <h1 className="opps">Oops! </h1>
        <p style={{ fontSize: "20px", marginTop: "20px" }}>Page Not Found</p>
        {/* <Button
          className="SignUp_Button"
          type="text"
          onClick={() => setPanelStatus(PANEL_STATUS.SIGN_IN)}
        >
          Sign in
        </Button> */}
      </div>
    </>
  );
};
