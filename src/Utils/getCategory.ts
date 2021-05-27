import { NerType } from "../components/GetNer";
import { AllGroupsConstant, GroupObj } from "../components/GetNer/interfaces";

export const countAllTypes = (ner: NerType[]) => {
	const obj = {} as GroupObj;
	ner.forEach(({ speech }) => {
		speech.forEach((type) => {
			if (!obj[type]) {
				obj[type] = 0;
			}
			obj[type]++;
		});
	});
	return obj;
};

export const groupTypes = (obj: GroupObj) => {
	const x = {} as Record<string, Record<string, number>>;
	Object.entries(obj).forEach(([key, value]) => {
		Object.entries(AllGroupsConstant).forEach(([keyGroup, group]) => {
			if (group.includes(key)) {
				if (!x[keyGroup]) {
					x[keyGroup] = {};
				}
				x[keyGroup][key] = value;
			}
		});
	});
	return x;
};

type Category = {
	[key: string]: number;
};

export const summaryCategory = (ner: NerType[]) => {
	const obj = {} as Category;
	ner.forEach(({ category }) => {
		if (!obj[category]) {
			obj[category] = 0;
		}
		obj[category]++;
	});
	return obj;
};
