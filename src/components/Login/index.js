/** @format */
import firebase, { auth } from "firebase/config";
import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { addDocument } from "firebase/services";
import { generateKeywords } from "firebase/services";

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();

export default function Login() {
  const handleFbLogin = async () => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(
        fbProvider
      );
      if (additionalUserInfo?.isNewUser) {
        addDocument("users", {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: additionalUserInfo.providerId,
          keywords: generateKeywords(user.displayName),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Row justify='center' style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Login with Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFbLogin}>
            Login with Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
