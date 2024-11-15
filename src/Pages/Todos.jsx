// src/components/Todos.js
import React, { useState, useEffect } from "react";
import { db } from "../Api_router/Firebase"; // Import Firebase config
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Table, Button, Modal, Form, Input, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [form] = Form.useForm();

  // Fetch todos from Firestore
  const fetchTodos = async () => {
    const snapshot = await getDocs(collection(db, "todos"));
    setTodos(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAddTodo = async () => {
    try {
      const values = await form.validateFields();
      await addDoc(collection(db, "todos"), { ...values, completed: false });
      fetchTodos();
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Edit todo
  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
    form.setFieldsValue(todo);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  // Update todo
  const handleUpdateTodo = async () => {
    try {
      const values = await form.validateFields();
      const todoRef = doc(db, "todos", currentTodo.id);
      await updateDoc(todoRef, values);
      fetchTodos();
      setIsEditMode(false);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Toggle completion status
  const handleToggleComplete = async (todo) => {
    const todoRef = doc(db, "todos", todo.id);
    await updateDoc(todoRef, { completed: !todo.completed });
    fetchTodos();
  };

  return (
    <div className="p-4">
      <Button type="primary" onClick={() => { setIsModalVisible(true); setIsEditMode(false); form.resetFields(); }} className="mb-4">
        Add Todo
      </Button>
      <Table dataSource={todos} rowKey="id" className="shadow rounded-lg">
        <Table.Column title="Title" dataIndex="title" key="title" />
        <Table.Column title="Description" dataIndex="description" key="description" />
        <Table.Column
          title="Completed"
          dataIndex="completed"
          key="completed"
          render={(text, record) => (
            <Checkbox checked={record.completed} onChange={() => handleToggleComplete(record)}>
              {record.completed ? "Yes" : "No"}
            </Checkbox>
          )}
        />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record) => (
            <div className="flex gap-2">
              <Button icon={<EditOutlined />} onClick={() => handleEditTodo(record)} />
              <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteTodo(record.id)} />
            </div>
          )}
        />
      </Table>

      <Modal
        title={isEditMode ? "Edit Todo" : "Add Todo"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={isEditMode ? handleUpdateTodo : handleAddTodo}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the title!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input the description!" }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Todos;
