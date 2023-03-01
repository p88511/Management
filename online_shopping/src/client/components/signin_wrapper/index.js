import { Button } from "antd";
import { PANEL_STATUS } from "../constants";

export default function SigninWrapper({ setPanelStatus }) {
  return (
    <>
      <div className="Signin_Wrapper">
        <div>Dont' have an account?</div>
        <Button
          className="SignUp_Button"
          type="text"
          onClick={() => setPanelStatus(PANEL_STATUS.SIGN_UP)}
        >
          Sign up
        </Button>
      </div>
    </>
  );
}
