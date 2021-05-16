import { Button, Typography } from "antd";
import { createRef, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { URL } from "../../Config";
import "./index.css";

const { Title } = Typography;

export const Upload = () => {
	const ref = createRef<HTMLInputElement>();
	const [id, setId] = useState<string | null>(null);
	return (
		<>
			<div className="center-upload no-line-height mtb25">
				<input
					ref={ref}
					multiple
					type="file"
					hidden
					onInput={(event) => {
						const { files } = event.currentTarget;
						if (!files) {
							return;
						}
						console.log(files);
						const fileArray = Array.from(files);
						const file = new FormData();
						fileArray.forEach((item) => {
							if (item.name.includes(".json")) {
								file.append("metadata", item);
							}
							if (item.name.includes(".zip")) {
								file.append("zipfile", item);
							}
						});
						console.log(file);
						fetch(`${URL}/api/v1/corpus/`, {
							method: "POST",
							body: file,
						})
							.then((res) => {
								if (res.status === 200) {
									return res.json();
								}
							})
							.then((res) => {
								if (!res) {
									return;
								}
								setId(res.id);
							});
					}}
				/>
				<Button onClick={() => ref.current?.click()} icon={<UploadOutlined />}>
					Wgraj korpus
				</Button>
			</div>
			{id && (
				<Title className="text-center" level={3}>
					id: {id}
				</Title>
			)}
		</>
	);
};
