import { Typography } from "antd";
import { FC } from "react";
import { Line } from "react-chartjs-2";

const getData = (data: Record<string, number | string>[]) => ({
	labels: data.map(({ key }) => key),
	datasets: [
		{
			label: "CVALUE",
			data: data.map(({ value }) => value),
			fill: false,
			backgroundColor: "rgb(255, 99, 132)",
			borderColor: "rgba(255, 99, 132, 0.2)",
		},
	],
});

type LineType = {
	className?: string;
	value: Record<string, number | string>[];
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
	console.log({ value });
	return (
		<div className={className}>
			<Typography.Title level={3} className="center">
				{title}
			</Typography.Title>
			<Line data={getData(value)} type={""} options={options} />
		</div>
	);
};
