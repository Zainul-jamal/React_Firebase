import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Dropdown, Avatar, message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { auth } from "../Api_router/Firebase"; // Import Firebase authentication
import { signOut } from "firebase/auth"; // Import signOut method
import { Link, Routes, Route, useNavigate } from "react-router-dom"; // Removed useParams import
import Posts from "./Posts";
import Comments from "./Comments";
import Albums from "./Albums";
import Photos from "./Photos";
import Todos from "./Todos";
import User from "./User";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [avatarUrl, setAvatarUrl] = useState(null); // State to store the avatar URL
  const [collapsed, setCollapsed] = useState(false); // State to control the sidebar collapse
  const navigate = useNavigate();

  // Fetch the current user's avatar from Firebase when the component mounts
  useEffect(() => {
    const user = auth.currentUser;
    if (user && user.photoURL) {
      setAvatarUrl(user.photoURL); // Set the avatar URL if user has it
    }
  }, []);

  // Handle Firebase logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out from Firebase
      console.log("User logged out");
      navigate("/login"); // Redirect to Login page after logging out
    } catch (error) {
      console.error("Error logging out:", error);
      message.error("Failed to log out. Please try again.");
    }
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar Menu */}
      <Sider
        width={200}
        className="site-layout-background fixed left-0 top-0 bottom-0"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/posts">Posts</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/comments">Comments</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/albums">Albums</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/photos">Photos</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/todos">Todos</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/users">Users</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        {/* Header with Avatar and User Menu */}
        <Header className="flex justify-between items-center px-4 bg-blue-500 text-white">
          <div className="text-xl font-bold">Dashboard</div> {/* Removed params */}
          <div className="flex items-center gap-4">
            {/* Display Avatar */}
            <Avatar size="large" icon={<UserOutlined />} src={avatarUrl} />
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Button type="text" className="text-white">
                Log Out
              </Button>
            </Dropdown>
          </div>
        </Header>

        {/* Content Section */}
        <Content className="p-4">
          <Routes>
            <Route path="/posts" element={<Posts />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/users" element={<User />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
