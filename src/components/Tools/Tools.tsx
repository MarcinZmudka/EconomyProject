import { Tool } from "../Tool";
import "./index.css";

const tools = [
	"Analizator morfo-syntaktyczny",
	"Rozpoznawanie nazw własnych i wyrażeń temporalnych",
	"TermoPL",
	"Modelowanie tematyczne",
];

export const Tools = () => {
	return (
		<div>
			<div className="tools-nabar">Wykorzystane narzędzia</div>
			<div className="tools">
				{tools.map((tool, index) => (
					<Tool name={tool} key={tool} text={index + 1} />
				))}
			</div>
		</div>
	);
};
