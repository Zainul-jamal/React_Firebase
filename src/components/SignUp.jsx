import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import { auth, db } from "../Api_router/Firebase"; // Import Firebase auth and Firestore
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const { Title } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError("");
    try {
      // Create a new user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);

      // Update the user's profile in Firebase Auth
      await updateProfile(userCredential.user, {
        displayName: values.name,
      });

      // Save user data to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: values.name,
        email: values.email,
        createdAt: new Date().toISOString(),
      });

      form.resetFields();
      navigate("/dashboard"); // Redirect to dashboard after successful signup
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in or use a different email.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
      console.error("Error creating user:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <Title level={2} className="text-center mb-6">Sign Up</Title>

        {error && <Alert message={error} type="error" className="mb-4" showIcon />}

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="example@example.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="******" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
