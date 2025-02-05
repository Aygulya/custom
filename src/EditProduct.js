import { useParams, useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const EditProduct = () => {
  const { id } = useParams();  // Получаем id товара из URL
  const navigate = useNavigate();  // Хук для навигации
  const [product, setProduct] = useState(null);
  const [conversionRate, setConversionRate] = useState(1);
  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, 'products', id);
      const productDoc = await getDoc(productRef);
      if (productDoc.exists()) {
        setProduct(productDoc.data());
      } else {
        console.log('Product not found');
      }
    };

    fetchProduct();
  }, [id]);
  const handleCurrencyChange = (value) => {
    // Заменяем запятую на точку и парсим курс
    const parsedRate = parseFloat(value.replace(",", "."));
    if (!isNaN(parsedRate) && parsedRate > 0) {
      setConversionRate(parsedRate);
      message.success(`Курс изменен на ${value}`);
    } else {
      message.error("Неверный формат курса");
    }
  };
  const handleSubmit = async (values) => {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, values);
    // После успешного обновления, перенаправляем пользователя на другую страницу
    navigate('/');  // Переход на главную страницу или страницу с продуктами
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>Редактировать товар</h2>
      <Form initialValues={product} onFinish={handleSubmit}>
        <Form.Item label="Название" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Цена" name="price">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Валюта" name="currency">
          <Select>
            <Select.Option value="GEL">GEL</Select.Option>
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="EUR">EUR</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Курс" name="exchangeRate">
        <InputNumber
          style={{ width: 120 }}
          defaultValue={1}
          onBlur={(e) => handleCurrencyChange(e.target.value)}
          formatter={(value) => value.replace(".", ",")}
          parser={(value) => value.replace(",", ".")}
        />
        </Form.Item>
        <Form.Item label="Фото">
          <Upload beforeUpload={(file) => false} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Загрузить фото</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Сохранить</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
