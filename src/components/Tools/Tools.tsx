import { Typography } from "antd";
import { Tool } from "../Tool";
import "./index.css";

const tools = [
	"Analizator morfo-syntaktyczny",
	"Rozpoznawanie nazw własnych i wyrażeń temporalnych",
	"TermoPL",
	"Modelowanie tematyczne",
];

const color = ["#57CF6B", "#CCB09B", "#56E3AD", "#E3C68C"];

export const Tools = () => {
	return (
		<div>
			<Typography.Title level={2} className="center mtb25">
				Wykorzystane narzędzia
			</Typography.Title>
			<div className="tools">
				{tools.map((tool, index) => (
					<Tool name={tool} key={tool} color={color[index]} />
				))}
			</div>
		</div>
	);
};
