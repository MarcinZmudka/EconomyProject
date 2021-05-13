import { FileOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { FC } from "react";
import "./index.css";

type ITool = {
	color: string;
	name: string;
};

export const Tool: FC<ITool> = ({ color, name }) => {
	return (
		<div className="tool-wrapper">
			<div className="center mtb25">
				<FileOutlined style={{ fontSize: "50px", color }} />
			</div>
			<Typography.Title className="center" level={5}>
				{name}
			</Typography.Title>
		</div>
	);
};
