import { FC } from "react";
import "./index.css";

type ITool = {
	text: string | number;
	name: string;
};

export const Tool: FC<ITool> = ({ text, name }) => {
	return (
		<div className="tool-wrapper">
			<div className="tool-text-box">
				<div className="tool-text">{text}</div>
			</div>
			<div className="tool-name">{name}</div>
		</div>
	);
};
