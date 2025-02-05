import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      } catch (err) {
        setError("Ошибка при загрузке товаров.");
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>🛒 Товары</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} width="200" />
          ) : (
            <p>Изображение не доступно</p>
          )}
          <p>Цена: {product.price}₽</p>
        </div>
      ))}
    </div>
  );
}
