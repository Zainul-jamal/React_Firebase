import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Spin } from "antd";
import { PictureOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Photos = () => {
  const [photos, setPhotos] = useState([]); // State to store photos data
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    // Fetch photos data from API when component mounts
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setPhotos(response.data); // Set the fetched photos to state
        setLoading(false); // Turn off loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Photos</h2>

      {loading ? (
        // Show loading spinner if data is still being fetched
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        // Display the list of photos once data is loaded
        <Row gutter={[16, 16]}>
          {photos.map((photo) => (
            <Col
              key={photo.id}
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
                cover={<img alt={photo.title} src={photo.url} />}
              >
                <Meta
                  title={photo.title}
                  description={`Album ID: ${photo.albumId}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Photos;
  