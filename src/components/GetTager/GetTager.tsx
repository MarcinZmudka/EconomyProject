import { Layout } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Spin, Space } from "antd";
import { Tager } from "../Tager";
import { URL } from "../../Config";
const { Content } = Layout;

export const GetTager = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading, refetch } = useQuery("analise", async () => {
		const response = await fetch(
			`${URL}/api/v1/analysis/tager?corpus_id=${id}`
		);
		if (response.status === 200) {
			return response.json();
		}
		const { detail } = await response.json();
		if (detail === "Not Found") {
			setTimeout(refetch, 2000);
		}
		return response.json();
	});
	if (isLoading) {
		return (
			<Content className="spinnerBox">
				<Space size="middle">
					<Spin size="large" />
				</Space>
			</Content>
		);
	}
	return <Tager data={data} />;
};
