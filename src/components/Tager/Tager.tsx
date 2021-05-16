import { Table } from "antd";
import { FC } from "react";
import { PieWrapper } from "../Pie";
import { Card, Col, Row } from "antd";
import "./index.css";
import { Summary } from "../Summary";

type dataType = {
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
			{ text: "czasownik", value: "czasownik" },
			{ text: "rzeczownik", value: "rzeczownik" },
		],
		onFilter: (value: any, record: any) => record.speech.indexOf(value) === 0,
	},
	{
		title: "Liczba",
		dataIndex: "number",
		key: "number",
		sorter: (a: any, b: any) => b.number - a.number,
		sortDirections: ["descend"] as ["ascend" | "descend"],
	},
];

export const Tager: FC<{ data: dataType }> = ({ data }) => {
	const arrayOfResults = Object.entries(data)
		.sort((a, b) => b[1] - a[1])
		.map(([key, number], index) => ({
			key,
			number,
			word: key,
			speech: index % 2 ? "rzeczownik" : "czasownik",
		}));
	return (
		<div>
			<div className="center mtb25">
				<Summary data={arrayOfResults} />
			</div>
			<div className="center mtb25">
				<Table
					className="Table"
					dataSource={arrayOfResults}
					columns={columns}
				/>
			</div>
			<div>
				<PieWrapper results={arrayOfResults} />
			</div>
		</div>
	);
};
