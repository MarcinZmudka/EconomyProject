export type Filters = DateFilter | IntegerFilter | DomainType;

export type DateFilter = {
	type: "date";
	first: string;
	last: string;
};
export type IntegerFilter = {
	type: "integer";
	first: number;
	last: number;
};
export type DomainType = {
	type: "string";
	domain: string[];
};

type Name = { name: string };
export type DateFilterWithName = DateFilter & Name;
export type IntegerFilterWithName = IntegerFilter & Name;
export type DomainTypeWithName = DomainType & Name;
export type FiltersWithNames =
	| DateFilterWithName
	| IntegerFilterWithName
	| DomainTypeWithName;
