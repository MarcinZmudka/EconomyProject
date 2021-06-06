import { Form, Button } from "antd";
import { Tager } from "../Tager";
import { FC, useState } from "react";
import { InputNumber } from "antd";

const { Item } = Form;

export type TagerType = {
	word: string;
	speech: string; //"rzeczownik" | "przysłówek" | "przymiotnik";
	count: number;
}[];
export const GetTager: FC<{ value: TagerType }> = ({ value }) => {
	const getSpeech = (speech: string) => {
		switch (speech) {
			case "adv":
				return "przysłówek";
			case "adj":
				return "przymiotnik";
			default:
				return "rzeczownik";
		}
	};
	const arrayOfResults = (value as TagerType)
		.sort((a, b) => b.count - a.count)
		.map((item) => {
			const speech = getSpeech(item.speech);
			return { ...item, speech };
		});
	return <FilterTager data={arrayOfResults} />;
};
type MinMax = {
	[key: string]: number | undefined;
};

export type tagerData = {
	count: number;
	word: string;
	speech: string;
};

const FilterTager: FC<{ data: TagerType }> = ({ data }) => {
	const [{ min, max }, setNumber] = useState<MinMax>({
		min: undefined,
		max: undefined,
	});
	const [form] = Form.useForm();

	const onReset = () => {
		form.resetFields();
		setNumber({ min: undefined, max: undefined });
	};

	return (
		<div>
			<div className="center mtb25">
				<Form
					layout="inline"
					form={form}
					onFieldsChange={([{ name, value }]) => {
						const old = { min, max };
						old[name as "min" | "max"] = value;
						setNumber(old);
					}}
				>
					<Item name="min" label="min">
						<InputNumber />
					</Item>
					<Item
						name="max"
						label="max"
						rules={[
							{
								validator: (_, value) => {
									if (min && value < min) {
										return Promise.reject("Zbyt mała wartość");
									}
									return Promise.resolve();
								},
							},
						]}
					>
						<InputNumber />
					</Item>
					<Item name="button">
						<Button htmlType="button" onClick={onReset}>
							Reset
						</Button>
					</Item>
				</Form>
			</div>
			<Tager
				data={data
					.filter(({ count }) => (min ? count > min : true))
					.filter(({ count }) => (max ? count < max : true))}
			/>
		</div>
	);
};
