import React from "react";
import {Typography} from "antd";

const {Title, Text, Paragraph} = Typography;

export default function IntroductionSection() {
    return (
        <>
            <Title level={2}>Class Name Ahihi</Title>
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt ullamcorper
                risus, nec
                efficitur ipsum volutpat non. Phasellus ultricies turpis iaculis magna faucibus facilisis.
                Vivamus lobortis a eros vel bibendum. Etiam feugiat imperdiet varius. Ut aliquet purus
                maximus
                augue rutrum sodales non non purus. Donec ut metus ac enim pulvinar condimentum. Duis
                fermentum
                massa justo, sed pulvinar ligula lobortis in. Nam facilisis orci dolor, ut ultrices nulla
                suscipit ut. Maecenas at metus mi. Sed rutrum non urna vel tincidunt. Morbi rhoncus lobortis
                lectus a elementum. Vestibulum pulvinar diam neque, at sodales mi consequat interdum.
                Praesent
                quis vestibulum nisi, eu elementum velit. Vivamus pulvinar orci sit amet nulla egestas, non
                ultrices elit porttitor.</Paragraph>
            <Paragraph><Text strong={true}>Creator: </Text>ABC</Paragraph>
            <Paragraph><Text strong={true}>Created at: </Text>dd/mm/yyyy</Paragraph>
        </>
    )
}