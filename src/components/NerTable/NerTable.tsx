import { Table, Tag } from "antd";
import { FC } from "react";
import { NerType } from "../GetNer";
import { AllGroupsConstant } from "../GetNer/interfaces";
import "./index.css";

export type dataType = {
	[key: string]: number;
};

const columns = [
	{
		title: "Słowo",
		dataIndex: "base",
		key: "base",
		width: "20%",
	},
	{
		title: "Części mowy",
		dataIndex: "speech",
		key: "speech",
		render: (speech: string[]) => (
			<>
				{speech.map((word) => (
					<Tag key={word}>{word.toUpperCase()}</Tag>
				))}
			</>
		),
		filters: Object.values(AllGroupsConstant)
			.flat()
			.map((item) => ({ text: item, value: item })),
		onFilter: (value: any, record: any) => record.speech.includes(value),
	},
	{
		title: "Liczba",
		dataIndex: "count",
		key: "count",
		sorter: (a: any, b: any) => b.count - a.count,
		sortDirections: ["descend"] as ["ascend" | "descend"],
	},
];

export const NerTable: FC<{ value: NerType[] }> = ({ value }) => {
	const data = value.map((item) => {
		const speech = new Set(item.speech);
		return { ...item, speech: Array.from(speech) };
	});
	return (
		<div className="nerTable mtb25">
			<Table className="fullWidth" columns={columns} dataSource={data} />
		</div>
	);
};
