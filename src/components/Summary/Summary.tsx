import { Card, Typography } from "antd";
import { FC } from "react";

type Summ = {
	data: {
		key: string;
		number: number;
		word: string;
		speech: string;
	}[];
};
type speechObjType = {
	[key: string]: number;
};
export const Summary: FC<Summ> = ({ data }) => {
	const numberOfWords = data.reduce((prev, { number }) => prev + number, 0);
	const speechObj = {} as speechObjType;
	data.forEach(({ speech, number }) => {
		if (!speechObj[speech]) {
			return (speechObj[speech] = number);
		}
		speechObj[speech] += number;
	});
	return (
		<Card
			title="Podsumowanie danych"
			bordered={false}
			hoverable
			style={{ width: "400px" }}
		>
			<Typography>{`Liczba słów: ${numberOfWords}`}</Typography>
			{Object.entries(speechObj).map(([speech, number]) => {
				return (
					<Typography
						key={speech}
					>{`Liczba ${speech}ów: ${number}`}</Typography>
				);
			})}
		</Card>
	);
};
