import { useQuery } from "react-query";
import { Redirect, useParams } from "react-router";
import { Spin, Space } from "antd";
import "./index.css";
import { Layout } from "antd";
import { URL } from "../../Config";

const { Content } = Layout;

export const Check = () => {
	const { id } = useParams<{ id: string }>();
	const { data, refetch } = useQuery("check", async () => {
		const response = await fetch(`${URL}/api/v1/corpus/${id}`);
		const res = await response.json();
		console.log(res);
		if (res.status === "PROCESSING") {
			setTimeout(refetch, 2000);
			return null;
		}
		return res;
	});
	if (data) {
		return <Redirect to={`/analise/${id}`} />;
	}
	return (
		<Layout>
			<Content className="spinnerBox">
				<Space size="middle">
					<Spin size="large" />
				</Space>
			</Content>
		</Layout>
	);
};
