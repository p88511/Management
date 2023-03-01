import { Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import MyForm from "../form";
import { PANEL_STATUS } from "../constants";

export default function Authentication({
  user,
  setUser,
  visible,
  setVisible,
  panelStatus,
  setPanelStatus,
  cart,
  setIsMerged,
  setCart,
}) {
  const titleHandler = (panelStatus) => {
    if (panelStatus === PANEL_STATUS.SIGN_IN) {
      return "Sign in to your account";
    } else if (panelStatus === PANEL_STATUS.SIGN_UP) {
      return "Sign up an account";
    } else {
      return "Update your password";
    }
  };
  return (
    <>
      {/* <Modal
        width={450}
        bodyStyle={
          panelStatus === PANEL_STATUS.UPDATE_PASSWORD
            ? { height: 200 }
            : { height: 300 }
        }
        closeIcon={<CloseCircleOutlined />}
        title={titleHandler(panelStatus)}
        visible={visible}
        footer={null}
        mask={false}
        onCancel={() => setVisible(false)}
      > */}
      <MyForm
        cart={cart}
        setCart={setCart}
        setIsMerged={setIsMerged}
        user={user}
        setUser={setUser}
        panelStatus={panelStatus}
        setPanelStatus={setPanelStatus}
      ></MyForm>
      {/* </Modal> */}
    </>
  );
}
