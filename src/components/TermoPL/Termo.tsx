import { FC } from "react";
import { LineChart } from "../LineChart";
import { PieWrapper } from "../Pie";
import { TermoTable } from "../TermoTable";

export type TermoType = {
	word: string[];
	original: string;
	rank: number;
	cvalue: number;
	length: number;
};

const getTermoPie = (termo: TermoType[]) => {
	const obj = {} as Record<string, number>;
	termo.forEach(({ length }) => {
		if (!obj[`${length}`]) {
			obj[`${length}`] = 0;
		}
		obj[`${length}`] += 1;
	});
	return obj;
};

const countFreq = (termo: TermoType[]) => {
	const obj = {} as Record<string, number>;
	termo.forEach(({ cvalue }) => {
		const value = Math.round(cvalue);
		if (!obj[value]) {
			obj[value] = 0;
		}
		obj[value]++;
	});
	const cvalue = Object.entries(obj).map(([key, value]) => ({
		key,
		value,
	}));

	return cvalue;
};

export const Termo: FC<{ value: TermoType[] }> = ({ value }) => {
	return (
		<>
			<div>
				<TermoTable value={value} />
			</div>
			<div>
				<PieWrapper
					title="Stosunek wystąpień do długości"
					value={getTermoPie(value)}
				/>
			</div>
			<div>
				<LineChart
					title="Liczba wystąpień danej wartości cvalue"
					value={countFreq(value)}
					className="VerticalBar"
				/>
			</div>
		</>
	);
};
