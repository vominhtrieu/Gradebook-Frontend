import React from "react";
import {Typography} from "antd";

const {Title, Text, Paragraph} = Typography;

export default function IntroductionSection({name, description, totalStudent}: any) {
    return (
        <>
            <Title level={2}>{name}</Title>
            <Paragraph>{description}</Paragraph>
            <Paragraph><Text strong={true}>Total Student: </Text>{totalStudent}</Paragraph>
        </>
    )
}