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
		sorter: (a: any, b: any) => a.word.localeCompare(b.word),
		sortDirections: ["ascend", "descend"] as ["ascend", "descend"],
	},
	{
		title: "Baza",
		dataIndex: "base",
		key: "base",
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
		title: "freq_s",
		dataIndex: "freq_s",
		key: "freq_s",
		width: "20%",
		sorter: (a: any, b: any) => b.freq_s - a.freq_s,
		sortDirections: ["ascend", "descend"] as ["ascend", "descend"],
	},
	{
		title: "freq_in",
		dataIndex: "freq_in",
		key: "freq_in",
		width: "20%",
		sorter: (a: any, b: any) => b.freq_in - a.freq_in,
		sortDirections: ["ascend", "descend"] as ["ascend", "descend"],
	},
];

export const TermoTable: FC<{ value: TermoType[] }> = ({ value }) => {
	return (
		<div className="nerTable mtb25">
			<Table className="fullWidth" columns={columns} dataSource={value} />
		</div>
	);
};
