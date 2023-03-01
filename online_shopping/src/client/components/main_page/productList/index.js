import ProductCard from "../product_card";
import "./index.css";
const { v4: uuidv4 } = require("uuid");


export default function ProductList({
  ip,
  user,
  panelStatus,
  setPanelStatus,
  products,
  setProductID,
  setEditId,
  setProducts,
  cart, 
  setCart,
  detailId, 
  setDetailId,
  setIsOnDetailPage,
}) {
  return (
    <div className="product_list">
      {products.map((product, index) => {
        return (
          <ProductCard
            ip={ip}
            detailId={detailId}
            setDetailId={setDetailId}
            cart={cart}
            setCart={setCart}
            user={user}
            key={uuidv4()}
            imgUrl={product.imgUrl}
            name={product.name}
            detail={product.detail}
            category={product.category}
            price={product.price}
            createdAt={product.createdAt}
            updatedAt={product.updatedAt}
            id={product.id}
            quantity={product.quantity}
            panelStatus={panelStatus}
            setPanelStatus={setPanelStatus}
            setProductID={setProductID}
            setEditId={setEditId}
            setProducts={setProducts}
            setIsOnDetailPage={setIsOnDetailPage}
          ></ProductCard>
        );
      })}
    </div>
  );
}
