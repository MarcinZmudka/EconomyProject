import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { getData } from "../Pie";
import { Typography } from "antd";

const options = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
};

type BarData = {
	value: Record<string, any>;
	title: string;
	className?: string;
};
const VerticalBar: FC<BarData> = ({ value, title, className }) => (
	<div className={className}>
		<Typography.Title>{title}</Typography.Title>
		<Bar data={getData(value)} options={options} type="" />
	</div>
);

export default VerticalBar;
