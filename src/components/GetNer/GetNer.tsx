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
import { FC } from "react";

export type NerType = {
	word: string[];
	base: string;
	category: string;
	speech: AllGroups[]; //"rzeczownik" | "przysłówek" | "przymiotnik";
	count: number;
};
export const GetNer: FC<{ value: NerType[] }> = ({ value }) => {
	const allTypes = countAllTypes(value);
	const categoriesCount = summaryCategory(value);
	const groupedTypes = groupTypes(allTypes);
	console.log({ allTypes, categoriesCount, groupedTypes });
	return (
		<>
			<NerTable value={value} />
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
