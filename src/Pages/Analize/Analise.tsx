import { Layout, Menu } from "antd";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { URL } from "../../Config";
import { Spin, Space } from "antd";
import { Tager } from "../../components/Tager";
const { Header, Footer, Sider, Content } = Layout;

export const Analise = () => {
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
			<Layout>
				<Content className="spinnerBox">
					<Space size="middle">
						<Spin size="large" />
					</Space>
				</Content>
			</Layout>
		);
	}
	return (
		<Layout className="layout">
			<Content className="center">
				<Tager data={data} />
			</Content>
		</Layout>
	);
};
