import { Button } from "antd";
import { PANEL_STATUS } from "../constants";

export default function SignupWrapper({ setPanelStatus }) {
  return (
    <div className="SignUp_Wrapper">
      <div>Already have an account?</div>
      <Button
        className="SignUp_Button"
        type="text"
        onClick={() => setPanelStatus(PANEL_STATUS.SIGN_IN)}
      >
        Sign in
      </Button>
      <Button
        className="Forgot_Password_Button"
        type="text"
        onClick={() => {
          setPanelStatus(PANEL_STATUS.UPDATE_PASSWORD);
        }}
      >
        Forgot_password?
      </Button>
    </div>
  );
}
