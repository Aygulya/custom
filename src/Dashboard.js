
// // import { useEffect, useState } from "react";
// // import { db } from "./firebase";
// // import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
// // import { Table, Select, Button, message, InputNumber, Modal, Input } from "antd";
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// // import { Link } from "react-router-dom";

// // export default function Dashboard() {
// //   const [products, setProducts] = useState([]);
// //   const [currency, setCurrency] = useState("USD");
// //   const [conversionRate, setConversionRate] = useState(1);
// //   const [monthlyData, setMonthlyData] = useState({
// //     categories: {},
// //     totalExpenses: 0,
// //     totalProfit: 0,
// //   });
// //   const [monthFilter, setMonthFilter] = useState("all");
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [isEditing, setIsEditing] = useState(false);

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       const querySnapshot = await getDocs(collection(db, "products"));
// //       const productList = querySnapshot.docs.map((doc) => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       }));
// //       setProducts(productList);
// //       calculateData(productList);
// //     };
// //     fetchProducts();
// //   }, []);

// //   const calculateData = (products) => {
// //     let categories = {};
// //     let totalExpenses = 0;
// //     let totalProfit = 0;

// //     products.forEach((product) => {
// //       const priceInCurrency = product.currency === currency
// //         ? product.price
// //         : product.price * conversionRate;
// //       const date = new Date(product.dateAdded);
// //       const month = date.getMonth();
// //       const year = date.getFullYear();
// //       const category = product.category;
// //       console.log(product.dateAdded);

// //       // Расчет расходов по категории
// //       if (!categories[category]) {
// //         categories[category] = { expenses: 0, profit: 0 };
// //       }

// //       categories[category].expenses += priceInCurrency;
// //       totalExpenses += priceInCurrency;

// //       // Расчет прибыли по категории
// //       const profit = priceInCurrency * 0.2; // Примерная прибыль 20% от цены
// //       categories[category].profit += profit;
// //       totalProfit += profit;
// //     });

// //     // Форматируем данные для графика по категориям
// //     const formattedData = Object.keys(categories).map((category) => ({
// //       category,
// //       expenses: categories[category].expenses,
// //       profit: categories[category].profit,
// //     }));

// //     setMonthlyData({
// //       categories: formattedData,
// //       totalExpenses,
// //       totalProfit,
// //     });
// //   };

// //   const handleCurrencyChange = (value) => {
// //     const parsedRate = parseFloat(value.replace(",", "."));
// //     if (!isNaN(parsedRate) && parsedRate > 0) {
// //       setConversionRate(parsedRate);
// //       message.success(`Курс изменен на ${value}`);
// //     } else {
// //       message.error("Неверный формат курса");
// //     }
// //   };

// //   const handleMonthFilterChange = (value) => {
// //     setMonthFilter(value);
// //     const filteredData = monthFilter === "all"
// //       ? monthlyData.categories
// //       : monthlyData.categories.filter((data) => {
// //           const date = new Date(data.dateAdded);
// //           return date.getMonth() === parseInt(monthFilter);
// //       });
// //     setMonthlyData({ ...monthlyData, categories: filteredData });
// //   };

// //   const deleteProduct = async (id) => {
// //     try {
// //       await deleteDoc(doc(db, "products", id));
// //       setProducts(products.filter((product) => product.id !== id));
// //       message.success("Продукт удален!");
// //     } catch (error) {
// //       message.error("Ошибка при удалении продукта");
// //     }
// //   };

// //   const startEditing = (product) => {
// //     setEditingProduct(product);
// //     setIsEditing(true);
// //   };

// //   const handleEditProduct = async () => {
// //     if (!editingProduct.name || !editingProduct.price) {
// //       message.error("Все поля обязательны для заполнения");
// //       return;
// //     }

// //     try {
// //       const productRef = doc(db, "products", editingProduct.id);
// //       await updateDoc(productRef, {
// //         name: editingProduct.name,
// //         price: editingProduct.price,
// //         category: editingProduct.category,
// //         imageUrl: editingProduct.imageUrl,
// //       });

// //       const updatedProducts = products.map((prod) =>
// //         prod.id === editingProduct.id ? editingProduct : prod
// //       );
// //       setProducts(updatedProducts);
// //       setIsEditing(false);
// //       setEditingProduct(null);
// //       message.success("Продукт обновлен!");
// //     } catch (error) {
// //       message.error("Ошибка при редактировании продукта");
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     let date;
    
// //     // Проверка, является ли значение Timestamp
// //     if (dateString && dateString.toDate) {
// //       date = dateString.toDate(); // Конвертация Firestore Timestamp в JavaScript Date
// //     } else {
// //       date = new Date(dateString); // Если это обычная строка, обрабатываем как Date
// //     }
    
// //     if (isNaN(date.getTime())) {  // Проверка на невалидную дату
// //       return 'Invalid Date';
// //     }
  
// //     return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;
// //   };
  
// //   const columns = [
// //     { title: "Фото", dataIndex: "imageUrl", key: "imageUrl", render: (imageUrl) => <img src={imageUrl} alt="Фото продукта" style={{ width: 50, height: 50 }} /> },
// //     { title: "Категория", dataIndex: "category", key: "category" },
// //     { title: "Название", dataIndex: "name", key: "name" },
// //     {
// //       title: "Цена",
// //       dataIndex: "price",
// //       key: "price",
// //       render: (price) => {
// //         const priceInSelectedCurrency = price * conversionRate;
// //         return `${priceInSelectedCurrency.toFixed(2)} ${currency}`;
// //       },
// //     },
// //     { title: "Валюта", dataIndex: "currency", key: "currency" },
// //     { title: "Курс (момент покупки)", dataIndex: "exchangeRate", key: "exchangeRate", render: (rate) => rate || "—" },
// //     { title: "Дата добавления", dataIndex: "dateAdded", key: "dateAdded", render: (date) => formatDate(date) },
// //     {
// //       title: "Действия",
// //       key: "actions",
// //       render: (text, record) => (
// //         <div>
// //           <Button type="link" onClick={() => startEditing(record)}>Редактировать</Button>
// //           <Button type="link" danger onClick={() => deleteProduct(record.id)}>Удалить</Button>
// //         </div>
// //       ),
// //     },
// //   ];
  


// //   return (
// //     <div>
// //       <h2>📊 Товары</h2>
// //       <div style={{ marginBottom: 20 }}>
// //         <Select defaultValue={currency} onChange={setCurrency} style={{ width: 120 }}>
// //           <Select.Option value="USD">USD</Select.Option>
// //           <Select.Option value="GEL">GEL</Select.Option>
// //         </Select>
// //         <InputNumber
// //           style={{ width: 120, marginLeft: 10 }}
// //           defaultValue={1}
// //           onBlur={(e) => handleCurrencyChange(e.target.value)}
// //           formatter={(value) => value.replace(".", ",")}
// //           parser={(value) => value.replace(",", ".")}
// //         />
// //       </div>

// //       <div style={{ marginBottom: 20 }}>
// //         <Select
// //           defaultValue="all"
// //           onChange={handleMonthFilterChange}
// //           style={{ width: 200 }}
// //         >
// //           <Select.Option value="all">Все время</Select.Option>
// //           <Select.Option value="0">Январь</Select.Option>
// //           <Select.Option value="1">Февраль</Select.Option>
// //           <Select.Option value="2">Март</Select.Option>
// //           <Select.Option value="3">Апрель</Select.Option>
// //           <Select.Option value="4">Май</Select.Option>
// //           <Select.Option value="5">Июнь</Select.Option>
// //           <Select.Option value="6">Июль</Select.Option>
// //           <Select.Option value="7">Август</Select.Option>
// //           <Select.Option value="8">Сентябрь</Select.Option>
// //           <Select.Option value="9">Октябрь</Select.Option>
// //           <Select.Option value="10">Ноябрь</Select.Option>
// //           <Select.Option value="11">Декабрь</Select.Option>
// //         </Select>
// //       </div>

// //       <Table dataSource={products} columns={columns} rowKey="id" />
// //       <Link to="/add-product">
// //         <Button type="primary" style={{ marginTop: 20 }}>
// //           Добавить товар
// //         </Button>
// //       </Link>

// //       <h3>📈 График расходов и прибыли</h3>
// //       <BarChart width={800} height={400} data={monthlyData.categories}>
// //         <CartesianGrid strokeDasharray="3 3" />
// //         <XAxis dataKey="category" />
// //         <YAxis />
// //         <Tooltip />
// //         <Legend />
// //         <Bar dataKey="expenses" fill="#8884d8" name="Расходы" />
// //         <Bar dataKey="profit" fill="#82ca9d" name="Прибыль" />
// //       </BarChart>

// //       <div>
// //         <h4>Общие расходы: {monthlyData.totalExpenses.toFixed(2)} {currency}</h4>
// //         <h4>Общая прибыль: {monthlyData.totalProfit.toFixed(2)} {currency}</h4>
// //       </div>

// //       {/* Модальное окно для редактирования */}
// //       <Modal
// //         title="Редактировать товар"
// //         visible={isEditing}
// //         onCancel={() => setIsEditing(false)}
// //         onOk={handleEditProduct}
// //       >
// //         <Input
// //           placeholder="Название"
// //           value={editingProduct?.name}
// //           onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
// //         />
// //         <Input
// //           placeholder="Цена"
// //           value={editingProduct?.price}
// //           onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
// //           type="number"
// //         />
// //         <Input
// //           placeholder="URL изображения"
// //           value={editingProduct?.imageUrl}
// //           onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
// //         />
// //         <Input
// //           placeholder="Категория"
// //           value={editingProduct?.category}
// //           onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
// //         />
// //       </Modal>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { db } from "./firebase";
// import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
// import { Table, Select, Button, message, InputNumber, Modal, Input } from "antd";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [currency, setCurrency] = useState("USD");
//   const [conversionRate, setConversionRate] = useState(1);
//   const [monthlyData, setMonthlyData] = useState({
//     categories: [],
//     totalExpenses: 0,
//     totalProfit: 0,
//   });
//   const [monthFilter, setMonthFilter] = useState("all");
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const querySnapshot = await getDocs(collection(db, "products"));
//       const productList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productList);
//       calculateData(productList);
//     };
//     fetchProducts();
//   }, []);

// //   const calculateData = (products) => {
// //     let categories = {};
// //     let totalExpenses = 0;
// //     let totalProfit = 0;

// //     products.forEach((product) => {
// //       const priceInCurrency =
// //         product.currency === currency ? product.price : product.price * conversionRate;
// //       const date = new Date(product.dateAdded.seconds * 1000); // Преобразование Firestore Timestamp
// //       const month = date.getMonth();
// //       const year = date.getFullYear();
// //       const category = product.category;

// //       // Расчет расходов по категории
// //       if (!categories[category]) {
// //         categories[category] = { expenses: 0, profit: 0, month: month, year: year };
// //       }

// //       categories[category].expenses += priceInCurrency;
// //       totalExpenses += priceInCurrency;

// //       // Расчет прибыли по категории
// //       const profit = priceInCurrency * 0.2; // Примерная прибыль 20% от цены
// //       categories[category].profit += profit;
// //       totalProfit += profit;
// //     });

// //     // Форматируем данные для графика по категориям
// //     const formattedData = Object.keys(categories).map((category) => ({
// //       category,
// //       expenses: categories[category].expenses,
// //       profit: categories[category].profit,
// //     }));

// //     setMonthlyData({
// //       categories: formattedData,
// //       totalExpenses,
// //       totalProfit,
// //     });
// //   };
// const calculateData = (products) => {
//     let categories = {};
//     let totalExpenses = 0;
//     let totalProfit = 0;
  
//     products.forEach((product) => {
//       const priceInCurrency =
//         product.currency === currency ? product.price : product.price * conversionRate;
  
//       // Проверяем наличие поля dateAdded и его тип
//       let date;
//       if (product.dateAdded && product.dateAdded.seconds) {
//         date = new Date(product.dateAdded.seconds * 1000); // Преобразуем Timestamp в Date
//       } else {
//         date = new Date(); // Если нет данных о дате, используем текущую дату
//       }
  
//       const month = date.getMonth();
//       const year = date.getFullYear();
//       const category = product.category;
  
//       // Расчет расходов по категории
//       if (!categories[category]) {
//         categories[category] = { expenses: 0, profit: 0, month: month, year: year };
//       }
  
//       categories[category].expenses += priceInCurrency;
//       totalExpenses += priceInCurrency;
  
//       // Расчет прибыли по категории
//       const profit = priceInCurrency * 0.2; // Примерная прибыль 20% от цены
//       categories[category].profit += profit;
//       totalProfit += profit;
//     });
  
//     // Форматируем данные для графика по категориям
//     const formattedData = Object.keys(categories).map((category) => ({
//       category,
//       expenses: categories[category].expenses,
//       profit: categories[category].profit,
//     }));
  
//     setMonthlyData({
//       categories: formattedData,
//       totalExpenses,
//       totalProfit,
//     });
//   };
  
//   const handleCurrencyChange = (value) => {
//     const parsedRate = parseFloat(value.replace(",", "."));
//     if (!isNaN(parsedRate) && parsedRate > 0) {
//       setConversionRate(parsedRate);
//       message.success(`Курс изменен на ${value}`);
//     } else {
//       message.error("Неверный формат курса");
//     }
//   };

//   const handleMonthFilterChange = (value) => {
//     setMonthFilter(value);
//     const filteredData =
//       value === "all"
//         ? monthlyData.categories
//         : monthlyData.categories.filter((data) => {
//             const date = new Date(data.dateAdded);
//             return date.getMonth() === parseInt(value);
//           });
//     setMonthlyData({ ...monthlyData, categories: filteredData });
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await deleteDoc(doc(db, "products", id));
//       setProducts(products.filter((product) => product.id !== id));
//       message.success("Продукт удален!");
//     } catch (error) {
//       message.error("Ошибка при удалении продукта");
//     }
//   };

//   const startEditing = (product) => {
//     setEditingProduct(product);
//     setIsEditing(true);
//   };

//   const handleEditProduct = async () => {
//     if (!editingProduct.name || !editingProduct.price) {
//       message.error("Все поля обязательны для заполнения");
//       return;
//     }

//     try {
//       const productRef = doc(db, "products", editingProduct.id);
//       await updateDoc(productRef, {
//         name: editingProduct.name,
//         price: editingProduct.price,
//         category: editingProduct.category,
//         imageUrl: editingProduct.imageUrl,
//       });

//       const updatedProducts = products.map((prod) =>
//         prod.id === editingProduct.id ? editingProduct : prod
//       );
//       setProducts(updatedProducts);
//       setIsEditing(false);
//       setEditingProduct(null);
//       message.success("Продукт обновлен!");
//     } catch (error) {
//       message.error("Ошибка при редактировании продукта");
//     }
//   };

//   const formatDate = (dateString) => {
//     let date;

//     // Проверка, является ли значение Timestamp
//     if (dateString && dateString.toDate) {
//       date = dateString.toDate(); // Конвертация Firestore Timestamp в JavaScript Date
//     } else {
//       date = new Date(dateString); // Если это обычная строка, обрабатываем как Date
//     }

//     if (isNaN(date.getTime())) {
//       // Проверка на невалидную дату
//       return "Invalid Date";
//     }

//     return `${date.getDate().toString().padStart(2, "0")}-${(
//       date.getMonth() + 1
//     )
//       .toString()
//       .padStart(2, "0")}-${date.getFullYear()}`;
//   };

//   const columns = [
//     {
//       title: "Фото",
//       dataIndex: "imageUrl",
//       key: "imageUrl",
//       render: (imageUrl) => (
//         <img src={imageUrl} alt="Фото продукта" style={{ width: 50, height: 50 }} />
//       ),
//     },
//     { title: "Категория", dataIndex: "category", key: "category" },
//     { title: "Название", dataIndex: "name", key: "name" },
//     {
//       title: "Цена",
//       dataIndex: "price",
//       key: "price",
//       render: (price) => {
//         const priceInSelectedCurrency = price * conversionRate;
//         return `${priceInSelectedCurrency.toFixed(2)} ${currency}`;
//       },
//     },
//     { title: "Валюта", dataIndex: "currency", key: "currency" },
//     {
//       title: "Курс (момент покупки)",
//       dataIndex: "exchangeRate",
//       key: "exchangeRate",
//       render: (rate) => rate || "—",
//     },
//     { title: "Дата добавления", dataIndex: "dateAdded", key: "dateAdded", render: (date) => formatDate(date) },
//     {
//       title: "Действия",
//       key: "actions",
//       render: (text, record) => (
//         <div>
//           <Button type="link" onClick={() => startEditing(record)}>
//             Редактировать
//           </Button>
//           <Button type="link" danger onClick={() => deleteProduct(record.id)}>
//             Удалить
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <h2>📊 Товары</h2>
//       <div style={{ marginBottom: 20 }}>
//         <Select defaultValue={currency} onChange={setCurrency} style={{ width: 120 }}>
//           <Select.Option value="USD">USD</Select.Option>
//           <Select.Option value="GEL">GEL</Select.Option>
//         </Select>
//         <InputNumber
//           style={{ width: 120, marginLeft: 10 }}
//           defaultValue={1}
//           onBlur={(e) => handleCurrencyChange(e.target.value)}
//           formatter={(value) => value.replace(".", ",")}
//           parser={(value) => value.replace(",", ".")}
//         />
//       </div>

//       <div style={{ marginBottom: 20 }}>
//         <Select defaultValue="all" onChange={handleMonthFilterChange} style={{ width: 200 }}>
//           <Select.Option value="all">Все время</Select.Option>
//           <Select.Option value="0">Январь</Select.Option>
//           <Select.Option value="1">Февраль</Select.Option>
//           <Select.Option value="2">Март</Select.Option>
//           <Select.Option value="3">Апрель</Select.Option>
//           <Select.Option value="4">Май</Select.Option>
//           <Select.Option value="5">Июнь</Select.Option>
//           <Select.Option value="6">Июль</Select.Option>
//           <Select.Option value="7">Август</Select.Option>
//           <Select.Option value="8">Сентябрь</Select.Option>
//           <Select.Option value="9">Октябрь</Select.Option>
//           <Select.Option value="10">Ноябрь</Select.Option>
//           <Select.Option value="11">Декабрь</Select.Option>
//         </Select>
//       </div>

//       <Table dataSource={products} columns={columns} rowKey="id" />
//       <Link to="/add-product">
//         <Button type="primary" style={{ marginTop: 20 }}>
//           Добавить товар
//         </Button>
//       </Link>

//       <h3>📈 График расходов и прибыли</h3>
//       <BarChart width={800} height={400} data={monthlyData.categories}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="category" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="expenses" fill="#8884d8" name="Расходы" />
//         <Bar dataKey="profit" fill="#82ca9d" name="Прибыль" />
//       </BarChart>

//       <div>
//         <h4>Общие расходы: {monthlyData.totalExpenses.toFixed(2)} {currency}</h4>
//         <h4>Общая прибыль: {monthlyData.totalProfit.toFixed(2)} {currency}</h4>
//       </div>

//       {/* Модальное окно для редактирования */}
//       <Modal
//         title="Редактировать товар"
//         visible={isEditing}
//         onCancel={() => setIsEditing(false)}
//         onOk={handleEditProduct}
//       >
//         <Input
//           placeholder="Название"
//           value={editingProduct?.name}
//           onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
//         />
//         <Input
//           placeholder="Цена"
//           value={editingProduct?.price}
//           onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
//           type="number"
//         />
//         <Input
//           placeholder="URL изображения"
//           value={editingProduct?.imageUrl}
//           onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
//         />
//         <Input
//           placeholder="Категория"
//           value={editingProduct?.category}
//           onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
//         />
//       </Modal>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Table, Select, Button, message, InputNumber, Modal, Input } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);
  const [monthlyData, setMonthlyData] = useState({
    categories: [],
    totalExpenses: 0,
    totalProfit: 0,
  });
  const [monthFilter, setMonthFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      calculateData(productList);
    };
    fetchProducts();
  }, []);

  const calculateData = (products) => {
    let categories = {};
    let totalExpenses = 0;
    let totalProfit = 0;

    products.forEach((product) => {
      const priceInCurrency =
        product.currency === currency ? product.price : product.price * conversionRate;

      let date;
      if (product.dateAdded && product.dateAdded.seconds) {
        date = new Date(product.dateAdded.seconds * 1000);
      } else {
        date = new Date();
      }

      const month = date.getMonth();
      const year = date.getFullYear();
      const category = product.category;

      if (!categories[category]) {
        categories[category] = { expenses: 0, profit: 0, month: month, year: year };
      }

      categories[category].expenses += priceInCurrency;
      totalExpenses += priceInCurrency;

      const profit = priceInCurrency * 0.2;
      categories[category].profit += profit;
      totalProfit += profit;
    });

    const formattedData = Object.keys(categories).map((category) => ({
      category,
      expenses: categories[category].expenses,
      profit: categories[category].profit,
    }));

    setMonthlyData({
      categories: formattedData,
      totalExpenses,
      totalProfit,
    });
  };

  const handleCurrencyChange = (value) => {
    const parsedRate = parseFloat(value.replace(",", "."));
    if (!isNaN(parsedRate) && parsedRate > 0) {
      setConversionRate(parsedRate);
      message.success(`Курс изменен на ${value}`);
    } else {
      message.error("Неверный формат курса");
    }
  };

  const handleMonthFilterChange = (value) => {
    setMonthFilter(value);
    const filteredData =
      value === "all"
        ? monthlyData.categories
        : monthlyData.categories.filter((data) => {
            const date = new Date(data.dateAdded);
            return date.getMonth() === parseInt(value);
          });
    setMonthlyData({ ...monthlyData, categories: filteredData });
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((product) => product.id !== id));
      message.success("Продукт удален!");
    } catch (error) {
      message.error("Ошибка при удалении продукта");
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleEditProduct = async () => {
    if (!editingProduct.name || !editingProduct.price) {
      message.error("Все поля обязательны для заполнения");
      return;
    }

    try {
      const productRef = doc(db, "products", editingProduct.id);
      await updateDoc(productRef, {
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        imageUrl: editingProduct.imageUrl,
      });

      const updatedProducts = products.map((prod) =>
        prod.id === editingProduct.id ? editingProduct : prod
      );
      setProducts(updatedProducts);
      setIsEditing(false);
      setEditingProduct(null);
      message.success("Продукт обновлен!");
    } catch (error) {
      message.error("Ошибка при редактировании продукта");
    }
  };

  const formatDate = (dateString) => {
    let date;

    // Проверка, является ли значение Timestamp
    if (dateString && dateString.toDate) {
      date = dateString.toDate(); // Конвертация Firestore Timestamp в JavaScript Date
    } else {
      date = new Date(dateString); // Если это обычная строка, обрабатываем как Date
    }

    if (isNaN(date.getTime())) {
      // Проверка на невалидную дату
      return "Invalid Date";
    }

    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  const columns = [
    {
      title: "Фото",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <img src={imageUrl} alt="Фото продукта" style={{ width: 50, height: 50 }} />
      ),
    },
    { title: "Категория", dataIndex: "category", key: "category" },
    { title: "Название", dataIndex: "name", key: "name" },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        const priceInSelectedCurrency = price * conversionRate;
        return `${priceInSelectedCurrency.toFixed(2)} ${currency}`;
      },
    },
    { title: "Валюта", dataIndex: "currency", key: "currency" },
    {
      title: "Курс (момент покупки)",
      dataIndex: "exchangeRate",
      key: "exchangeRate",
      render: (rate) => rate || "—",
    },
    { title: "Дата добавления", dataIndex: "dateAdded", key: "dateAdded", render: (date) => formatDate(date) },
    {
      title: "Действия",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => startEditing(record)}>
            Редактировать
          </Button>
          <Button type="link" danger onClick={() => deleteProduct(record.id)}>
            Удалить
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>📊 Товары</h2>
      <div style={{ marginBottom: 20 }}>
        <Select defaultValue={currency} onChange={setCurrency} style={{ width: 120 }}>
          <Select.Option value="USD">USD</Select.Option>
          <Select.Option value="GEL">GEL</Select.Option>
        </Select>
        <InputNumber
          style={{ width: 120, marginLeft: 10 }}
          defaultValue={1}
          onBlur={(e) => handleCurrencyChange(e.target.value)}
          formatter={(value) => value.replace(".", ",")}
          parser={(value) => value.replace(",", ".")}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <Select defaultValue="all" onChange={handleMonthFilterChange} style={{ width: 200 }}>
          <Select.Option value="all">Все время</Select.Option>
          <Select.Option value="0">Январь</Select.Option>
          <Select.Option value="1">Февраль</Select.Option>
          <Select.Option value="2">Март</Select.Option>
          <Select.Option value="3">Апрель</Select.Option>
          <Select.Option value="4">Май</Select.Option>
          <Select.Option value="5">Июнь</Select.Option>
          <Select.Option value="6">Июль</Select.Option>
          <Select.Option value="7">Август</Select.Option>
          <Select.Option value="8">Сентябрь</Select.Option>
          <Select.Option value="9">Октябрь</Select.Option>
          <Select.Option value="10">Ноябрь</Select.Option>
          <Select.Option value="11">Декабрь</Select.Option>
        </Select>
      </div>

      <Table dataSource={products} columns={columns} rowKey="id" />
      <Link to="/add-product">
        <Button type="primary" style={{ marginTop: 20 }}>
          Добавить товар
        </Button>
      </Link>

      <h3>📈 График расходов и прибыли</h3>
      <BarChart width={800} height={400} data={monthlyData.categories}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expenses" fill="#8884d8" />
        <Bar dataKey="profit" fill="#82ca9d" />
      </BarChart>

      <Modal
        title="Редактировать продукт"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={handleEditProduct}
      >
        <div>
          <Input
            value={editingProduct?.name}
            onChange={(e) =>
              setEditingProduct((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Название"
          />
          <Input
            type="number"
            value={editingProduct?.price}
            onChange={(e) =>
              setEditingProduct((prev) => ({ ...prev, price: parseFloat(e.target.value) }))
            }
            placeholder="Цена"
            style={{ marginTop: 10 }}
          />
          <Input
            value={editingProduct?.category}
            onChange={(e) =>
              setEditingProduct((prev) => ({ ...prev, category: e.target.value }))
            }
            placeholder="Категория"
            style={{ marginTop: 10 }}
          />
          <Input
            value={editingProduct?.imageUrl}
            onChange={(e) =>
              setEditingProduct((prev) => ({ ...prev, imageUrl: e.target.value }))
            }
            placeholder="URL изображения"
            style={{ marginTop: 10 }}
          />
        </div>
      </Modal>
    </div>
  );
}
