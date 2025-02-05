
// import { useState } from "react";
// import { db } from "./firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { Form, Input, InputNumber, Select, Button, Upload, message  } from "antd";
// import { UploadOutlined,  } from "@ant-design/icons";
// const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
// const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
// const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;

// export default function AddProduct() {
//   const [form] = Form.useForm();
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const uploadImageToCloudinary = async (file) => {
//     if (!file) {
//       throw new Error("No file selected for upload");
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "custom"); // Ensure this preset exists in Cloudinary

//     try {
//       const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Cloudinary error response:", errorData);
//         throw new Error(`Cloudinary upload failed: ${response.statusText}`);
//       }

//       const data = await response.json();
//       if (data.error) {
//         console.error("Cloudinary error message:", data.error.message);
//         throw new Error(`Cloudinary error: ${data.error.message}`);
//       }

//       console.log("Cloudinary upload successful:", data);
//       return data.secure_url;
//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     let imageUrl = "";

//     if (image) {
//       try {
//         imageUrl = await uploadImageToCloudinary(image);
//       } catch (error) {
//         setLoading(false);
//         return; // Stop execution if there's an error during image upload
//       }
//     }

//     try {
//       await addDoc(collection(db, "products"), {
//         date: values.date,
//         category: values.category,
//         name: values.name,
//         price: values.price,
//         currency: values.currency,
//         exchangeRate: values.exchangeRate || null,
//         imageUrl: imageUrl,
//       });
//       form.resetFields();
//       setImage(null);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error saving product to Firestore:", error);
//       setLoading(false);
//     }
//   };
//   const [conversionRate, setConversionRate] = useState(1);

//   // Обработчик изменения курса
//   const handleCurrencyChange = (value) => {
//     // Заменяем запятую на точку и парсим курс
//     const parsedRate = parseFloat(value.replace(",", "."));
//     if (!isNaN(parsedRate) && parsedRate > 0) {
//       setConversionRate(parsedRate);
//       message.success(`Курс изменен на ${value}`);
//     } else {
//       message.error("Неверный формат курса");
//     }
//   };
//   return (
//     <div>
//       <h2>➕ Добавить товар</h2>
//       <Form form={form} layout="vertical" onFinish={handleSubmit}>
//       <Form.Item label="Дата" name="date" rules={[{ required: true, message: "Выберите дату" }]}> 
//           <DatePicker style={{ width: "100%" }} />
//         </Form.Item>
//         <Form.Item label="Категория" name="category" rules={[{ required: true, message: "Выберите категорию" }]}>
//           <Select>
//             <Select.Option value="краска">Краска</Select.Option>
//             <Select.Option value="инструменты">Инструменты</Select.Option>
//             <Select.Option value="мебель">Мебель</Select.Option>
//             <Select.Option value="реклама">Реклама</Select.Option>
//             <Select.Option value="дополнительно">Дополнительно</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item label="Название товара" name="name" rules={[{ required: true, message: "Введите название" }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item label="Цена" name="price" rules={[{ required: true, message: "Введите цену" }]}>
//           <InputNumber min={0} style={{ width: "100%" }} />
//         </Form.Item>

//         <Form.Item label="Валюта" name="currency" rules={[{ required: true, message: "Выберите валюту" }]}>
//           <Select>
//             <Select.Option value="GEL">GEL</Select.Option>
//             <Select.Option value="USD">USD</Select.Option>
//             <Select.Option value="EUR">EUR</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item label="Курс (если необходимо)" name="exchangeRate">
//         <InputNumber
//           style={{ width: 120 }}
//           defaultValue={1}
//           onBlur={(e) => handleCurrencyChange(e.target.value)}
//           formatter={(value) => value.replace(".", ",")}
//           parser={(value) => value.replace(",", ".")}
//         />
//         </Form.Item>

//         <Form.Item label="Фото">
//           <Upload beforeUpload={(file) => { setImage(file); return false; }}>
//             <Button icon={<UploadOutlined />}>Загрузить фото</Button>
//           </Upload>
//           {image && <p>📷 {image.name}</p>}
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>Добавить</Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }
import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { Form, Input, InputNumber, Select, Button, Upload, message, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET;

export default function AddProduct() {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImageToCloudinary = async (file) => {
    if (!file) {
      throw new Error("No file selected for upload");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "custom"); // Ensure this preset exists in Cloudinary

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary error response:", errorData);
        throw new Error(`Cloudinary upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        console.error("Cloudinary error message:", data.error.message);
        throw new Error(`Cloudinary error: ${data.error.message}`);
      }

      console.log("Cloudinary upload successful:", data);
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    let imageUrl = "";

    const formattedDate = values.date ? values.date.toDate() : null;
    if (image) {
      try {
        imageUrl = await uploadImageToCloudinary(image);
      } catch (error) {
        setLoading(false);
        return; // Stop execution if there's an error during image upload
      }
    }

    try {
      await addDoc(collection(db, "products"), {
        date: formattedDate,
        category: values.category,
        name: values.name,
        price: values.price,
        currency: values.currency,
        exchangeRate: values.exchangeRate || null,
        imageUrl: imageUrl,
      });
      form.resetFields();
      setImage(null);
      setLoading(false);
      message.success("Товар добавлен успешно!");
    } catch (error) {
      console.error("Error saving product to Firestore:", error);
      setLoading(false);
      message.error("Ошибка при добавлении товара!");
    }
  };

  const [conversionRate, setConversionRate] = useState(1);

  // Обработчик изменения курса
  const handleCurrencyChange = (value) => {
    const parsedRate = parseFloat(value.replace(",", "."));
    if (!isNaN(parsedRate) && parsedRate > 0) {
      setConversionRate(parsedRate);
      message.success(`Курс изменен на ${value}`);
    } else {
      message.error("Неверный формат курса");
    }
  };

  return (
    <div>
      <h2>➕ Добавить товар</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Дата" name="date" rules={[{ required: true, message: "Выберите дату" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Категория" name="category" rules={[{ required: true, message: "Выберите категорию" }]}>
          <Select>
            <Select.Option value="краска">Краска</Select.Option>
            <Select.Option value="инструменты">Инструменты</Select.Option>
            <Select.Option value="мебель">Мебель</Select.Option>
            <Select.Option value="реклама">Реклама</Select.Option>
            <Select.Option value="дополнительно">Дополнительно</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Название товара" name="name" rules={[{ required: true, message: "Введите название" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Цена" name="price" rules={[{ required: true, message: "Введите цену" }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Валюта" name="currency" rules={[{ required: true, message: "Выберите валюту" }]}>
          <Select>
            <Select.Option value="GEL">GEL</Select.Option>
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="EUR">EUR</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Курс (если необходимо)" name="exchangeRate">
          <InputNumber
            style={{ width: 120 }}
            defaultValue={1}
            onBlur={(e) => handleCurrencyChange(e.target.value)}
            formatter={(value) => value.replace(".", ",")}
            parser={(value) => value.replace(",", ".")}
          />
        </Form.Item>

        <Form.Item label="Фото">
          <Upload beforeUpload={(file) => { setImage(file); return false; }}>
            <Button icon={<UploadOutlined />}>Загрузить фото</Button>
          </Upload>
          {image && <p>📷 {image.name}</p>}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Добавить</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
