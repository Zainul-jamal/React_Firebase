// src/components/Login.js
import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Api_router/Firebase"; // Import Firebase auth config
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
      console.error("Error logging in:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <Title level={2} className="text-center mb-6">Log In</Title>

        {error && <Alert message={error} type="error" className="mb-4" showIcon />}

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Please enter a valid email address" }]}
          >
            <Input placeholder="example@example.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="******" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Log In
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
