import FormItem from "antd/lib/form/FormItem";
import React from "react";
import "./ProfileSingleFieldButtonWrapper.css";

export default function ProfileSingleFieldButtonWrapper({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <FormItem className="profile-single-field-button-wrapper">
      {children}
    </FormItem>
  );
}
