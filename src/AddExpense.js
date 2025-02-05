import { Form, InputNumber, DatePicker, Select, Button, Input } from "antd";
import React from "react";
import { useState } from "react";

export default function AddExpense() {
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSubmit = (values) => {
    console.log("Новый расход:", values);
  };

  return (
    <div>
      <h2>➕ Форма добавления нового расхода</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Дата" name="date" rules={[{ required: true, message: "Выберите дату" }]}> 
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Категория" name="category" rules={[{ required: true, message: "Выберите категорию" }]}> 
          <Select onChange={setSelectedCategory}>
            <Select.Option value="Краска">Краска</Select.Option>
            <Select.Option value="Инструменты">Инструменты</Select.Option>
            <Select.Option value="Мебель">Мебель</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Подкатегория" name="subcategory" rules={[{ required: true, message: "Введите подкатегорию" }]}> 
          <Input placeholder="Введите подкатегорию вручную" />
        </Form.Item>

        <Form.Item label="Сумма" name="amount" rules={[{ required: true, message: "Введите сумму" }]}> 
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Добавить расход</Button>
        </Form.Item>
      </Form>
    </div>
  );
}