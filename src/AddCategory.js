import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddCategory() {
  const [category, setCategory] = useState("");

  const addCategory = async () => {
    try {
      await addDoc(collection(db, "categories"), { name: category });
      console.log("Категория добавлена");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>📂 Добавить категорию</h2>
      <input type="text" placeholder="Название категории" onChange={(e) => setCategory(e.target.value)} />
      <button onClick={addCategory}>Добавить</button>
    </div>
  );
}
