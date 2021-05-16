import { Typography } from "antd";
import { FC } from "react";
import { Pie } from "react-chartjs-2";
import { PieWrap, Results, SpeechObj } from "./types.intefaces";

const getData = (results: SpeechObj) => ({
	labels: Object.keys(results),
	datasets: [
		{
			label: "# of Votes",
			data: Object.values(results).map(({ value }) => value),
			backgroundColor: [
				"rgba(255, 99, 132, 0.2)",
				"rgba(54, 162, 235, 0.2)",
				"rgba(255, 206, 86, 0.2)",
				"rgba(75, 192, 192, 0.2)",
				"rgba(153, 102, 255, 0.2)",
				"rgba(255, 159, 64, 0.2)",
			],
			borderColor: [
				"rgba(255, 99, 132, 1)",
				"rgba(54, 162, 235, 1)",
				"rgba(255, 206, 86, 1)",
				"rgba(75, 192, 192, 1)",
				"rgba(153, 102, 255, 1)",
				"rgba(255, 159, 64, 1)",
			],
			borderWidth: 1,
		},
	],
});

const getNumberOfSpeeches = (results: Results[]) => {
	const org = {} as SpeechObj;
	const wzg = {} as SpeechObj;
	results.forEach(({ speech, number }) => {
		if (org[speech]) {
			org[speech].value++;
			wzg[speech].value += number;
		} else {
			org[speech] = { type: speech, value: 1 };
			wzg[speech] = { type: speech, value: number };
		}
	});
	return [org, wzg];
};

export const PieWrapper: FC<PieWrap> = ({ results }) => {
	const [org, wzg] = getNumberOfSpeeches(results);
	return (
		<div>
			<div style={{ display: "inline-block", width: "1000px" }}>
				<div style={{ width: "49%", display: "inline-block" }}>
					<Typography.Title level={3} className="center">
						Wystąpienia części mowy
					</Typography.Title>
					<Pie data={getData(org)} type={""} />
				</div>
				<div style={{ width: "49%", display: "inline-block" }}>
					<Typography.Title level={3} className="center">
						Wystąpienia części mowy z uwzględniania liczby wystąpień danego
						słowa
					</Typography.Title>
					<Pie data={getData(wzg)} type={""} />
				</div>
			</div>
		</div>
	);
};
