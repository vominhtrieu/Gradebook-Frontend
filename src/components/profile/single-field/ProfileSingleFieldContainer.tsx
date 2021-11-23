import { Card } from "antd";
import React from "react";

interface ProfileSingleFieldContainerProps {
  title: string;
  children: React.ReactNode;
}

export default function ProfileSingleFieldContainer({
  title,
  children,
}: ProfileSingleFieldContainerProps) {
  return (
    <Card
      style={{
        borderRadius: "8px",
        textTransform: "uppercase",
      }}
      title={title}
      bodyStyle={{
        maxWidth: "552px",
        margin: "0 auto",
        padding: "24px 0 ",
      }}
    >
      {/* <Space
        direction="vertical"
        style={{
          display: "flex",
        }}
      ></Space> */}
      {children}
    </Card>
  );
}
