// src/components/Posts.js
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { db } from "../Api_router/Firebase"; // Firebase config (if using Firebase)
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"));
    setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const handleAddPost = async () => {
    const values = await form.validateFields();
    await addDoc(collection(db, "posts"), values);
    fetchPosts();
    setIsModalOpen(false);
  };

  const handleEditPost = async (record) => {
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDeletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    fetchPosts();
  };

  return (
    <div>
      <Button type="primary" className="mb-4" onClick={() => setIsModalOpen(true)}>Add Post</Button>
      <Table dataSource={posts} rowKey="id" className="shadow rounded-lg">
        <Table.Column title="Title" dataIndex="title" key="title" />
        <Table.Column title="Content" dataIndex="content" key="content" />
        <Table.Column title="Actions" key="actions" render={(text, record) => (
          <>
            <Button onClick={() => handleEditPost(record)} className="mr-2">Edit</Button>
            <Button danger onClick={() => handleDeletePost(record.id)}>Delete</Button>
          </>
        )} />
      </Table>

      <Modal
        title="Add/Edit Post"
        open={isModalOpen}
        onOk={handleAddPost}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Posts;
