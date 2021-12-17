import { Input } from "antd";
import React, { useState } from "react";

export default function PrivateCommentBox() {
  const [comment, setComment] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setComment(e.target.value);

  return (
    <Input.TextArea
      value={comment}
      onChange={handleOnChange}
      placeholder="Private comment"
      autoSize
    />
  );
}
