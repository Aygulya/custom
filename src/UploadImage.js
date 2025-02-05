import { useState } from "react";
import { db } from "./firebase"; // Импорт Firestore
import { collection, addDoc } from "firebase/firestore";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
  const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;

  // Проверка, что переменные окружения заданы
  if (!cloudName || !apiKey || !apiSecret) {
    console.error("Cloudinary credentials are missing.");
    setError("Ошибка конфигурации Cloudinary. Проверьте переменные окружения.");
    return null; // Прерываем рендеринг компонента, если переменные не заданы
  }

  const uploadFile = async () => {
    if (!image) {
      setError("Пожалуйста, выберите изображение для загрузки.");
      return;
    }

    setLoading(true); // Начинаем загрузку
    setError(""); // Очищаем ошибки

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "custom"); // Укажите ваш preset
    formData.append("cloud_name", cloudName);

    console.log(cloudName, apiKey, apiSecret); // Логируем конфигурацию

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Cloudinary Response:", data); // Логируем полный ответ для проверки

      // Проверка на успешный ответ от Cloudinary
      if (!response.ok) {
        setError(`Ошибка от Cloudinary: ${data.error.message}`);
        console.error("Ошибка от Cloudinary:", data.error.message);
        return;
      }

      if (!data.secure_url) {
        setError("Ошибка: URL изображения не был получен.");
        console.error("Ошибка: URL изображения не был получен.");
        return;
      }

      const uploadedImageUrl = data.secure_url;
      setImageUrl(uploadedImageUrl);

      // Сохраняем в Firestore только если imageUrl валидное
      if (uploadedImageUrl) {
        try {
          await addDoc(collection(db, "products"), {
            name: "Название товара",
            imageUrl: uploadedImageUrl, // Сохраняем корректный imageUrl
            price: 1000,
          });

          console.log("Ссылка на изображение сохранена в Firestore:", uploadedImageUrl);
        } catch (firestoreError) {
          setError(`Ошибка при добавлении в Firestore: ${firestoreError.message}`);
          console.error("Ошибка при добавлении в Firestore:", firestoreError);
        }
      } else {
        setError("Ошибка загрузки изображения на Cloudinary: URL не получен.");
        console.error("Ошибка загрузки на Cloudinary:", data);
      }
    } catch (err) {
      setError(`Что-то пошло не так при загрузке файла: ${err.message}`);
      console.error("Ошибка при загрузке файла:", err);
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  return (
    <div>
      <h2>📷 Загрузить изображение</h2>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*" // Допускаем только изображения
      />
      <button onClick={uploadFile} disabled={loading}>
        {loading ? "Загрузка..." : "Загрузить"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
