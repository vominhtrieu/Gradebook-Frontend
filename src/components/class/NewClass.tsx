import React, { useContext, useState } from "react";
import { Form, Input, Modal, Spin, Upload } from "antd";
import Compress from "react-image-file-resizer";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { postData } from "../../handlers/api";
import { message } from "antd";
import { MainContext } from "../../contexts/main";

function compressImage(file: Blob, callback: any) {
  try {
    Compress.imageFileResizer(
      file,
      1080,
      1080,
      "JPEG",
      80,
      0,
      uri => {
        callback(null, uri);
      },
      "base64"
    );
  } catch {
    callback(new Error("File is not supported"), null);
  }
}

export default function NewClass({ visible, setVisible }: any) {
  const [form] = useForm();
  const [selectedCover, setSelectedCover] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const mainContext = useContext(MainContext);

  function onSubmit() {
    const data = form.getFieldsValue();
    data.cover = selectedCover;
    setSubmitting(true);
    postData("/classrooms/", data)
      .then(data => {
        if (data.name.length > 0) {
          setVisible(false);
          mainContext.setReloadNeeded(true);
          form.resetFields();
          setSelectedCover(null);
          setSubmitting(false);
          return message.success("Class is created");
        } else {
          setSubmitting(false);
          return message.error("Something went wrong!");
        }
      })
      .catch(_ => {
        setSubmitting(false);
        return message.error("Something went wrong!");
      });
  }

  function onCancel() {
    setVisible(false);
  }

  function handleChange(e: any) {
    if (loadingImage || e.file.status !== "uploading") {
      return;
    }
    setLoadingImage(true);
    compressImage(e.file.originFileObj, (err: any, url: any) => {
      if (err) {
        setLoadingImage(false);
        return message.error("File is not supported");
      } else {
        setLoadingImage(false);
        setSelectedCover(url);
      }
    });
  }

  return (
    <Modal
      title={"New Class"}
      visible={visible}
      okButtonProps={{ disabled: submitting }}
      okText={
        submitting ? (
          <>
            <Spin style={{ marginRight: 5 }} /> Submit
          </>
        ) : (
          "Submit"
        )
      }
      onOk={onSubmit}
      onCancel={onCancel}
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
        <Form.Item
          name="name"
          label={"Class name"}
          rules={[
            { required: true, message: "Please input your username!" },
            {
              min: 3,
              message: "Class name can not be shorter than 3 characters!",
            },
            {
              max: 255,
              message: "Class name can not be longer than 255 characters!",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea autoSize={true} maxLength={255} />
        </Form.Item>
        <Form.Item name="cover" label="Cover image">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            accept="image/*"
            customRequest={_ => {}}
            showUploadList={false}
            style={{ width: "100%" }}
            onChange={handleChange}
            disabled={loadingImage}
          >
            {loadingImage ? (
              <Spin />
            ) : selectedCover ? (
              <img src={selectedCover} alt="cover" style={{ width: "100%" }} />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
