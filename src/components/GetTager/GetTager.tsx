import { Layout, Form, Button } from "antd";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { Spin, Space } from "antd";
import { Tager } from "../Tager";
import { URL } from "../../Config";
import { FC, useState } from "react";
import { InputNumber } from "antd";

const { Content } = Layout;
const { Item } = Form;

export type TagerType = {
	word: string;
	speech: string; //"rzeczownik" | "przysłówek" | "przymiotnik";
	count: number;
}[];
export const GetTager = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading, refetch } = useQuery("tager", async () => {
		const response = await fetch(
			`${URL}/api/v1/analysis/tager?corpus_id=${id}`,
			{ method: "POST", body: JSON.stringify(["subst", "adj", "adv"]) }
		);
		if (response.status === 200) {
			return response.json();
		}
		const { detail } = await response.json();
		if (detail === "Not Found") {
			setTimeout(refetch, 2000);
		}
		return response.json();
	});
	if (isLoading) {
		return (
			<Content className="spinnerBox">
				<Space size="middle">
					<Spin size="large" />
				</Space>
			</Content>
		);
	}
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
	const arrayOfResults = (data as TagerType)
		.sort((a, b) => b.count - a.count)
		.map((item) => {
			const speech = getSpeech(item.speech);
			return { ...item, speech };
		});
	console.log({ data, arrayOfResults });
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
