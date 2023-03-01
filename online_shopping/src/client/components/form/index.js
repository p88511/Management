import AuthenticationForm from "./authentication_form";

export default function MyForm({
  user,
  setUser,
  panelStatus,
  setPanelStatus,
  cart,
  setIsMerged,
  setCart,
}) {
  return (
    <AuthenticationForm
      cart={cart}
      setIsMerged={setIsMerged}
      setCart={setCart}
      user={user}
      setUser={setUser}
      panelStatus={panelStatus}
      setPanelStatus={setPanelStatus}
    ></AuthenticationForm>
  );
}
