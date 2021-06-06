import { FilterOutlined } from "@ant-design/icons";
import { Button, Layout, Radio, Space, Spin, Tooltip } from "antd";
import { createElement, FC, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { DrawerWrapper } from "../../components/Drawer";
import { GetNer, NerType } from "../../components/GetNer";
import { GetTager, TagerType } from "../../components/GetTager";
import { Termo } from "../../components/TermoPL";
import { URL } from "../../Config";
const { Header, Content } = Layout;

const tools = ["Tager", "Topics", "Ner", "TermoPL"];

const getComponent = (number: number): [FC<any>, string] => {
	switch (number) {
		case 0:
			return [GetTager, "tagger"];
		case 2:
			return [GetNer, "ner"];
		case 3:
			return [Termo, "termo"];
		case 1:
			return [Termo, "tager"];
		default:
			return [Termo, "ner"];
	}
};
type Results = {
	[key: string]: any;
	tagger: TagerType;
	ner: NerType;
};
export const Analise = () => {
	const [tool, setTool] = useState(0);
	const [open, setOpen] = useState(false);
	const onClose = () => setOpen(false);
	const { id } = useParams<{ id: string }>();
	const handleOpen = () => setOpen((prev) => !prev);
	const { data, isLoading, isError } = useQuery(id, async () => {
		const response = await fetch(`${URL}/api/v1/analysis/${id}`);

		return (await response.json()).result as Results;
	});
	if (isLoading || isError) {
		return (
			<Content className="spinnerBox">
				<Space size="middle">
					<Spin size="large" />
				</Space>
			</Content>
		);
	}
	return (
		<Layout className="layout" style={{ minHeight: "100vh" }}>
			<Header>
				<div>
					<Tooltip title="filtruj" className="mlr15">
						<Button
							type="primary"
							shape="circle"
							icon={<FilterOutlined />}
							onClick={handleOpen}
						/>
					</Tooltip>
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
			<Content className="center">
				{createElement(getComponent(tool)[0], {
					value: (data as Results)[getComponent(tool)[1]],
				})}
			</Content>
			<DrawerWrapper open={open} onClose={onClose} />
		</Layout>
	);
};
