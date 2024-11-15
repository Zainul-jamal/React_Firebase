import React, { useEffect, useState } from "react";
import { Card, Button, Avatar, Typography, Spin } from "antd";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Api_router/Firebase"; // Import Firestore config
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "SignUp_Data"));
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "SignUp_Data", userId));
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <Card
          key={user.id}
          className="shadow-md hover:shadow-lg"
          cover={
            <div className="flex justify-center pl-12 p-4">
              <Avatar
                size={80}
                icon={<UserOutlined />}
                src={user.avatar || null} // Use default icon if no avatar is provided
              />
            </div>
          }
        >
          <Title level={4} className="text-center">
            {user.names || "Anonymous"}
          </Title>
          <Text type="secondary" className="block text-center mb-4">
            {user.email}
          </Text>
          <Button
            type="primary"
            danger
            block
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default User;
