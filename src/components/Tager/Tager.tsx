import { FC } from "react";

type dataType = {
	[key: string]: number;
};

export const Tager: FC<{ data: dataType }> = ({ data }) => {
	const arrayOfResults = Object.entries(data).sort((a, b) => b[1] - a[1]);
	console.log(arrayOfResults);
	return (
		<div>
			{arrayOfResults.slice(0, 10).map(([key, number]) => {
				return <div key={key}>{`${key} - ${number}`}</div>;
			})}
		</div>
	);
};
