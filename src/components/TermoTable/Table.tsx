import { Table } from "antd";
import { FC } from "react";
import { TermoType } from "../TermoPL";

export type dataType = {
	[key: string]: number;
};

const columns = [
	{
		title: "Słowo",
		dataIndex: "word",
		key: "word",
		width: "20%",
		sorter: (a: TermoType, b: TermoType) =>
			a.word
				.reduce((prev, curr) => `${prev} ${curr}`)
				.localeCompare(b.word.reduce((prev, curr) => `${prev} ${curr}`)),
		sortDirections: ["ascend", "descend"] as ["ascend", "descend"],
		render: (text: any, record: TermoType) =>
			record.word.reduce((prev, curr) => `${prev} ${curr}`),
	},
	{
		title: "Baza",
		dataIndex: "original",
		key: "original",
		width: "20%",
	},
	{
		title: "cvalue",
		dataIndex: "cvalue",
		key: "calue",
		sorter: (a: any, b: any) => b.cvalue - a.cvalue,
		sortDirections: ["ascend", "descend"] as ["ascend", "descend"],
		width: "20%",
	},
	{
		title: "Ranking",
		dataIndex: "rank",
		key: "rank",
		width: "20%",
		sorter: (a: any, b: any) => b.rank - a.rank,
		sortDirections: ["ascend", "descend"] as ["ascend", "descend"],
	},
	{
		title: "Długość",
		dataIndex: "length",
		key: "length",
		width: "20%",
		sorter: (a: any, b: any) => b.length - a.length,
		sortDirections: ["ascend", "descend"] as ["ascend", "descend"],
	},
];

export const TermoTable: FC<{ value: TermoType[] }> = ({ value }) => {
	return (
		<div className="nerTable mtb25">
			<Table
				className="fullWidth"
				columns={columns}
				dataSource={value.map((item) => ({ ...item, key: item.original }))}
			/>
		</div>
	);
};
