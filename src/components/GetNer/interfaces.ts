export type NumberGroup = "sg" | "pl";
export type CaseGroup = "nom" | "gen" | "dat" | "acc" | "inst" | "loc" | "voc";
export type GenderGroup = "m1" | "m2" | "m3" | "f" | "n";
export type PersonGroup = "pri" | "sec" | "ter";
export type DeegreeGroup = "pos" | "com" | "sup";
export type AspectGroup = "imperf" | "perf";
export type NegationGroup = "aff" | "neg";
export type AccentabilityGroup = "akc" | "nakc";
export type PostPreGroup = "praep" | "npraep";
export type AccGroup = "congr" | "rec";
export type AggGroup = "nagl" | "agl";
export type VocGroup = "wok" | "nwok";
export type FullstoGroup = "pun" | "npun";

export type AllGroups =
	| NumberGroup
	| CaseGroup
	| GenderGroup
	| PersonGroup
	| DeegreeGroup
	| AspectGroup
	| NegationGroup
	| AccentabilityGroup
	| PostPreGroup
	| AccGroup
	| AggGroup
	| VocGroup
	| FullstoGroup;

export type GroupObj = {
	[Propperty in AllGroups]: number;
};

export const NumberGroupConstant = ["sg", "pl"];
export const CaseGroupConstant = [
	"nom",
	"gen",
	"dat",
	"acc",
	"inst",
	"loc",
	"voc",
];
export const GenderGroupConstant = ["m1", "m2", "m3", "f", "n"];
export const PersonGroupConstant = ["pri", "sec", "ter"];
export const DeegreeGroupConstant = ["pos", "com", "sup"];
export const AspectGroupConstant = ["imperf", "perf"];
export const NegationGroupConstant = ["aff", "neg"];
export const AccentabilityGroupConstant = ["akc", "nakc"];
export const PostPreGroupConstant = ["praep", "npraep"];
export const AccGroupConstant = ["congr", "rec"];
export const AggGroupConstant = ["nagl", "agl"];
export const VocGroupConstant = ["wok", "nwok"];
export const FullstoGroupConstant = ["pun", "npun"];

export const AllGroupsConstant = {
	NumberGroup: NumberGroupConstant,
	CaseGroup: CaseGroupConstant,
	GenderGroup: GenderGroupConstant,
	PersonGroup: PersonGroupConstant,
	DeegreeGroup: DeegreeGroupConstant,
	AspectGroup: AspectGroupConstant,
	NegationGroup: NegationGroupConstant,
	AccentabilityGroup: AccentabilityGroupConstant,
	PostPreGroup: PostPreGroupConstant,
	AccGroup: AccGroupConstant,
	AggGroup: AggGroupConstant,
	VocGroup: VocGroupConstant,
	FullstoGroup: FullstoGroupConstant,
};
