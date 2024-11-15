import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Spin } from "antd";
import { UserOutlined, CommentOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Comments = () => {
  const [comments, setComments] = useState([]); // State to store comments data
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    // Fetch comments data from API when component mounts
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setComments(response.data); // Set the fetched comments to state
        setLoading(false); // Turn off loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      {loading ? (
        // Show loading spinner if data is still being fetched
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        // Display the list of comments once data is loaded
        <Row gutter={[16, 16]}>
          {comments.map((comment) => (
            <Col
              key={comment.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={4}
              className="flex justify-center"
            >
              <Card
                hoverable
                className="w-full"
                cover={
                  <div className="bg-blue-500 text-white flex items-center justify-center h-32">
                    <CommentOutlined style={{ fontSize: "30px" }} />
                  </div>
                }
              >
                <Meta
                  title={comment.name}
                  description={comment.body}
                />
                <p className="text-gray-500 text-sm mt-2">
                  <UserOutlined /> {comment.email}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Comments;
