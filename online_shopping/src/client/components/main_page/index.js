import ProductsController from "./products_controller";
import ProductsGallary from "./products_gallary";
import CreateOrEditProduct from "./create_product";
import { PANEL_STATUS } from "../constants";
import ProductDetail from "./product_detail";

export default function MainPage({
  ip,
  cart,
  setCart,
  user,
  products,
  setProducts,
  panelStatus,
  setPanelStatus,
  editId,
  setEditId,
  sortStatus,
  setSortStatus,
  detailId,
  setDetailId,
  setIsOnDetailPage,
  isOnDetailPage,
  setHasError,
}) {
  if (sortStatus === "last_added") {
    products.sort(function (a, b) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  } else if (sortStatus === "low_to_high") {
    products.sort(function (a, b) {
      return Number(a.price) - Number(b.price);
    });
  } else {
    products.sort(function (a, b) {
      return Number(b.price) - Number(a.price);
    });
  }

  const pageSwitchHelper = (panelStatus) => {
    if (panelStatus === PANEL_STATUS.MAIN_PAGE) {
      return (
        <>
          <ProductsController
            user={user}
            panelStatus={panelStatus}
            setPanelStatus={setPanelStatus}
            sortStatus={sortStatus}
            setSortStatus={setSortStatus}
          ></ProductsController>
          <ProductsGallary
            ip={ip}
            detailId={detailId}
            setDetailId={setDetailId}
            cart={cart}
            setCart={setCart}
            user={user}
            setEditId={setEditId}
            products={products}
            panelStatus={panelStatus}
            setPanelStatus={setPanelStatus}
            setProducts={setProducts}
            setIsOnDetailPage={setIsOnDetailPage}
          ></ProductsGallary>
        </>
      );
    } else if (panelStatus === PANEL_STATUS.PRODUCT_DETAIL) {
      return (
        <ProductDetail
          setHasError={setHasError}
          setIsOnDetailPage={setIsOnDetailPage}
          user={user}
          cart={cart}
          setCart={setCart}
          products={products}
          detailId={detailId}
          setPanelStatus={setPanelStatus}
          setEditId={setEditId}
          setProducts={setProducts}
        ></ProductDetail>
      );
    } else {
      return (
        <>
          <CreateOrEditProduct
            editId={editId}
            setProducts={setProducts}
            products={products}
            panelStatus={panelStatus}
            setPanelStatus={setPanelStatus}
            isOnDetailPage={isOnDetailPage}
          ></CreateOrEditProduct>
        </>
      );
    }
  };

  return pageSwitchHelper(panelStatus);
}
