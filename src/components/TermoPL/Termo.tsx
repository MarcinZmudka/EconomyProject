import { LineChart } from "../LineChart";
import { PieWrapper } from "../Pie";
import data from "./data.json";

type TermoType = {
	word: string;
	base: string;
	rank: number;
	cvalue: number;
	freq_s: number;
	freq_in: number;
	context: number;
	length: number;
};

const getTermoPie = (termo: TermoType[]) => {
	const obj = {} as Record<string, number>;
	termo.forEach(({ freq_s, length }) => {
		if (!obj[length]) {
			obj[length] = 0;
		}
		obj[length] += freq_s;
	});
	return obj;
};

type FreqObk = {
	freq_s: Record<string, number>;
	freq_in: Record<string, number>;
	context: Record<string, number>;
};

const countFreq = (termo: TermoType[]) => {
	const obj = { freq_s: {}, freq_in: {}, context: {} } as FreqObk;
	termo.forEach(({ freq_in, freq_s, context }) => {
		if (!obj.context[context]) {
			obj.context[context] = 0;
		}
		if (!obj.freq_s[freq_s]) {
			obj.freq_s[freq_s] = 0;
		}
		if (!obj.freq_in[freq_in]) {
			obj.freq_in[freq_in] = 0;
		}
		obj.context[context] += 1;
		obj.freq_in[freq_in] += 1;
		obj.freq_s[freq_s] += 1;
	});
	const context = Object.entries(obj.context).map(([key, value]) => ({
		key,
		value,
	}));
	const freq_s = Object.entries(obj.freq_s).map(([key, value]) => ({
		key,
		value,
	}));
	const freq_in = Object.entries(obj.freq_in).map(([key, value]) => ({
		key,
		value,
	}));
	return [context, freq_s, freq_in];
};

export const Termo = () => {
	return (
		<>
			<div>
				<PieWrapper
					title="Stosunek wystąpień do długości"
					value={getTermoPie(data)}
				/>
			</div>
			<div>
				<LineChart
					title="Liczba wystąpień danej częstotliwości"
					value={countFreq(data)}
					className="VerticalBar"
				/>
			</div>
		</>
	);
};
