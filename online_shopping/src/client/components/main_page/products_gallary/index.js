import ProductList from "../productList";
import Pagination from "../pagination";
import { useState } from "react";
import "./index.css";

export default function ProductsGallary({
  ip,
  user,
  panelStatus,
  setPanelStatus,
  products,
  setEditId,
  setProducts,
  cart,
  setCart,
  detailId,
  setDetailId,
  setIsOnDetailPage,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentProducts = products.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="product-title">
        <h2 style={{ marginTop: "80px" }}>Products</h2>
      </div>
      <ProductList
        ip={ip}
        detailId={detailId}
        setDetailId={setDetailId}
        cart={cart}
        setCart={setCart}
        user={user}
        setEditId={setEditId}
        products={currentProducts}
        panelStatus={panelStatus}
        setPanelStatus={setPanelStatus}
        setProducts={setProducts}
        setIsOnDetailPage={setIsOnDetailPage}
      ></ProductList>
      <Pagination
        totalPosts={products.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
    </>
  );
}
