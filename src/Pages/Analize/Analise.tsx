import { Layout, Radio } from "antd";
import { createElement, useState } from "react";
import { GetTager } from "../../components/GetTager";
const { Header, Content } = Layout;

const tools = ["Tager", "Topics", "Ner", "TermoPL"];

const getComponent = (number: number) => {
	switch (number) {
		case 0:
			return GetTager;
		case 1:
		case 2:
		case 3:
			return "div";
		default:
			return "div";
	}
};

export const Analise = () => {
	const [tool, setTool] = useState(0);

	return (
		<Layout className="layout" style={{ minHeight: "100vh" }}>
			<Header>
				<div>
					<Radio.Group value={tool}>
						{tools.map((item, index) =>
							createElement(Radio.Button, {
								key: index,
								type: index === tool ? "primary" : "default",
								children: item,
								value: index,
								onClick: () => setTool(index),
							})
						)}
					</Radio.Group>
				</div>
			</Header>
			<Content className="center">{createElement(getComponent(tool))}</Content>
		</Layout>
	);
};
