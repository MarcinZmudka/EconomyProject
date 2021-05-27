import { Table } from "antd";
import { FC } from "react";
import { PieWrapperTager } from "../Pie";
import "./index.css";
import { Summary } from "../Summary";
import { TagerType } from "../GetTager";

export type dataType = {
	[key: string]: number;
};

const columns = [
	{
		title: "Słowo",
		dataIndex: "word",
		key: "word",
		width: "50%",
	},
	{
		title: "Część mowy",
		dataIndex: "speech",
		key: "speech",
		filters: [
			{ text: "przymiotnik", value: "przymiotnik" },
			{ text: "rzeczownik", value: "rzeczownik" },
			{ text: "przysłówek", value: "przysłówek" },
		],
		onFilter: (value: any, record: any) => record.speech.indexOf(value) === 0,
	},
	{
		title: "Liczba",
		dataIndex: "count",
		key: "count",
		sorter: (a: any, b: any) => b.count - a.count,
		sortDirections: ["descend"] as ["ascend" | "descend"],
	},
];

export const Tager: FC<{ data: TagerType }> = ({ data }) => {
	return (
		<div>
			<div className="center mtb25">
				<Summary data={data} />
			</div>
			<div className="center mtb25">
				<Table
					className="Table"
					dataSource={data.map((item) => ({ ...item, key: item.word }))}
					columns={columns}
				/>
			</div>
			<div>
				<PieWrapperTager results={data} />
			</div>
		</div>
	);
};
