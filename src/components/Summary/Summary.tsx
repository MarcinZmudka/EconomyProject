import { Card, Typography } from "antd";
import { FC } from "react";
import { TagerType } from "../GetTager";

type speechObjType = {
	[key: string]: number;
};
export const Summary: FC<{ data: TagerType }> = ({ data }) => {
	const numberOfWords = data.reduce((prev, { count }) => prev + count, 0);
	const speechObj = {} as speechObjType;
	data.forEach(({ speech, count }) => {
		if (!speechObj[speech]) {
			return (speechObj[speech] = count);
		}
		speechObj[speech] += count;
	});
	return (
		<Card
			title="Podsumowanie danych"
			bordered={false}
			hoverable
			style={{ width: "400px" }}
		>
			<Typography>{`Liczba słów: ${numberOfWords}`}</Typography>
			<Typography>{`Liczba unikalnych słów: ${data.length}`}</Typography>
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
