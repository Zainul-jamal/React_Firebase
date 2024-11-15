import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Spin, Alert } from "antd";
import { UserOutlined, PictureOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Albums = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from the API
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/photos");
        setPhotos(response.data); // Set the fetched data to state
      } catch (error) {
        setError("Failed to fetch photos. Please try again.");
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message={error} type="error" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        {photos.map((photo) => (
          <Col key={photo.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={photo.title} src={photo.url} />}
              className="shadow-lg rounded-lg"
            >
              <Meta
                title={photo.title}
                description={
                  <div className="flex items-center gap-2">
                    <UserOutlined />
                    <span>{photo.albumId}</span>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Albums;
