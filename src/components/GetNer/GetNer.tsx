import { Layout } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Spin, Space } from "antd";
import { URL } from "../../Config";
import { AllGroups } from "./interfaces";
import {
	countAllTypes,
	groupTypes,
	summaryCategory,
} from "../../Utils/getCategory";
import { PieWrapper } from "../Pie";
import "./index.css";
import VerticalBar from "../Bar/Bar";
import { NerTable } from "../NerTable";

const { Content } = Layout;

export type NerType = {
	word: string[];
	base: string;
	category: string;
	speech: AllGroups[]; //"rzeczownik" | "przysłówek" | "przymiotnik";
	count: number;
};
export const GetNer = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading, refetch } = useQuery<NerType[]>("ner", async () => {
		const response = await fetch(`${URL}/api/v1/analysis/ner?corpus_id=${id}`, {
			method: "POST",
		});
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
	if (!data) {
		return <div>A</div>;
	}
	const allTypes = countAllTypes(data as NerType[]);
	const categoriesCount = summaryCategory(data as NerType[]);
	const groupedTypes = groupTypes(allTypes);
	console.log({ allTypes, categoriesCount, groupedTypes });
	return (
		<>
			<NerTable value={data as NerType[]} />
			<VerticalBar
				value={allTypes}
				title="Zestawienie części mowy"
				className="VerticalBar"
			/>

			<div className="PieBox">
				<PieWrapper
					value={categoriesCount}
					title="Kategorie części mowy"
					className="Pie"
				/>
				{Object.entries(groupedTypes).map(([key, values]) => (
					<PieWrapper value={values} title={key} className="Pie" />
				))}
			</div>
		</>
	);
};
