export type Results = {
	key: string;
	number: number;
	word: string;
	speech: string;
};
export type PieWrap = {
	results: Results[];
};
export type Speech = {
	type: string;
	value: number;
};
export type SpeechObj = {
	[key: string]: Speech;
};
