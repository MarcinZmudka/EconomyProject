import { Typography } from "antd";
import { FC } from "react";
import { Line } from "react-chartjs-2";
const colors = [
	{
		backgroundColor: "rgb(255, 99, 132)",
		borderColor: "rgba(255, 99, 132, 0.2)",
	},
	{
		backgroundColor: "rgb(54, 162, 235)",
		borderColor: "rgba(54, 162, 235, 0.2)",
	},
	{
		backgroundColor: "rgb(155, 99, 132)",
		borderColor: "rgba(155, 99, 132, 0.2)",
	},
];

const getData = (data: Record<string, number | string>[][]) => ({
	labels: Array.apply(null, Array(100)).map((item, index) => index),
	datasets: data.map((item, index) => ({
		label: ["context", "freq_s", "freq_in"][index],
		data: item.map(({ value }) => value),
		fill: false,
		...colors[index],
	})),
});

type LineType = {
	className?: string;
	value: Record<string, number | string>[][];
	title: string;
};

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
export const LineChart: FC<LineType> = ({ className, title, value }) => {
	return (
		<div className={className}>
			<Typography.Title level={3} className="center">
				{title}
			</Typography.Title>
			<Line data={getData(value)} type={""} options={options} />
		</div>
	);
};
