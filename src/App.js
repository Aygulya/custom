import { Routes, Route, NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DashboardOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import Dashboard from "./Dashboard";
import AddProduct from "./AddProduct";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import EditProduct from "./EditProduct";
import { useNavigate } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

export default function App() {
  const cld = new Cloudinary({ cloud: { cloudName: 'dzkgtbs1v' } });
  
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
        .image('cld-sample-5')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio


  return (
    
    <Layout style={{ minHeight: "100vh" }}>
      
      <Sider collapsible>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <NavLink to="/">Главная</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusCircleOutlined />}>
            <NavLink to="/add-product">Добавить товар</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: 20 }}>
          📦 Панель управления товарами
        </Header>
        <Content style={{ margin: "16px" }}>
        <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/add-product" element={<AddProduct />} />
  <Route path="/edit-product/:id" element={<EditProduct />} />  {/* Указываем параметр :id */}
</Routes>
          {/* <AdvancedImage cldImg={img}/> */}
        </Content>
      </Layout>
    </Layout>
  );
}
