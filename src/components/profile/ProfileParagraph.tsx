import { Typography } from "antd";
import { ParagraphProps } from "antd/lib/typography/Paragraph";

interface ProfileParagraphProps extends ParagraphProps {
  title: "Email" | "Joined date" | "Number of classrooms you have joined";
}

export default function ProfileParagraph({ ...props }: ProfileParagraphProps) {
  return (
    <Typography.Paragraph
      {...props}
      style={{
        marginBottom: 0,
        marginTop: "3px",
      }}
    >
      <b>{props.title}: </b> {props.children}
    </Typography.Paragraph>
  );
}
