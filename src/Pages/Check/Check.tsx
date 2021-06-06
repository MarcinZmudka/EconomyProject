import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import { Spin, Space, Typography } from "antd";
import "./index.css";
import { Layout } from "antd";
import { URL } from "../../Config";

const { Content } = Layout;

export const Check = () => {
	const history = useHistory();
	const { id } = useParams<{ id: string }>();
	const { data, refetch } = useQuery("check", async () => {
		const response = await fetch(`${URL}/api/v1/corpus/${id}`);
		const res = await response.json();
		if (res.status === "PROCESSING") {
			setTimeout(refetch, 2000);
			return null;
		}
		return res.filters;
	});
	console.log({ data });
	if (data) {
		fetch(`${URL}/api/v1/analysis/?corpus_id=${id}`, {
			method: "POST",
			body: JSON.stringify({ options: {}, filter_boundaries: data }),
		})
			.then((res) => res.json())
			.then((item) => {
				history.push(`/analise/${item.corpus_id}/${item.id}`);
			});
	}
	return (
		<Layout>
			<Content className="spinnerBox">
				<Space size="middle">
					<Typography.Title level={3}>Processing</Typography.Title>
					<Spin size="large" />
				</Space>
			</Content>
		</Layout>
	);
};
