import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import {
	Drawer,
	Typography,
	DatePicker,
	InputNumber,
	Select,
	Space,
	Spin,
	Button,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { Children, Dispatch, FC } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import { URL } from "../../Config";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
	DateFilter,
	DomainType,
	Filters,
	FiltersWithNames,
	IntegerFilter,
} from "../../Pages/Analize";
import "./index.css";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

type DrawerType = {
	open: boolean;
	onClose: () => void;
};

export const DrawerWrapper: FC<DrawerType> = ({ open, onClose }) => {
	const history = useHistory();
	const [state, setState] = useLocalStorage<Record<string, Filters> | null>(
		"filters",
		null
	);
	const { corpus } = useParams<{ id: string; corpus: string }>();
	const { data, isLoading, isError } = useQuery("getInfo", async () => {
		const response = await fetch(`${URL}/api/v1/corpus/${corpus}`);

		return (await response.json()).filters as Record<string, Filters>;
	});
	if (data && !state) {
		const x = {} as Record<string, Filters>;
		Object.entries(data).forEach(([key, value]) => {
			x[key] = { ...value };
		});
		setState(x);
	}
	if (isLoading || isError || !state || !data) {
		return (
			<Content className="spinnerBox">
				<Space size="middle">
					<Spin size="large" />
				</Space>
			</Content>
		);
	}

	const filter = async () => {
		const res = await fetch(`${URL}/api/v1/analysis?corpus_id=${corpus}`, {
			method: "POST",
			body: JSON.stringify({ options: {}, filter_boundaries: state }),
		});
		const response = (await res.json()) as { id: string };
		history.push(`/analise/${corpus}/${response.id}`);
	};
	const reset = () => {
		const x = {} as Record<string, Filters>;
		Object.entries(data).forEach(([key, value]) => {
			x[key] = { ...value };
		});
		setState(x);
	};
	return (
		<Drawer
			title="Filtrowanko"
			placement={"bottom"}
			visible={open}
			onClose={onClose}
		>
			<Space>
				{generateKids(data, setState, state)}
				<Button
					type="primary"
					shape="round"
					icon={<SearchOutlined />}
					size="large"
					onClick={filter}
				/>
				<Button
					type="primary"
					shape="round"
					danger
					icon={<CloseOutlined />}
					size="large"
					onClick={reset}
				/>
			</Space>
		</Drawer>
	);
};

const getComponents =
	(
		onChange: Dispatch<React.SetStateAction<Record<string, Filters> | null>>,
		state: Record<string, Filters> | null
	) =>
	(filter: FiltersWithNames) => {
		switch (filter.type) {
			case "integer":
				return (
					<TitleWrapper title={filter.name} key={filter.name}>
						<IntegerWrapper
							value={state && state[filter.name]}
							id={filter.name}
							min={filter.first}
							max={filter.last}
							handleChange={onChange}
							className=""
						/>
					</TitleWrapper>
				);
			case "date":
				return (
					<TitleWrapper title={filter.name} key={filter.name}>
						<DateWrapper
							value={state && state[filter.name]}
							handleChange={onChange}
							className=""
							id={filter.name}
							min={""}
							max={""}
						/>
					</TitleWrapper>
				);
			case "string":
				return (
					<TitleWrapper title={filter.name} key={filter.name}>
						<DomainWrapper
							value={state && state[filter.name]}
							handleChange={onChange}
							className=""
							id={filter.name}
						>
							{filter.domain}
						</DomainWrapper>
					</TitleWrapper>
				);

			default:
				return "ASD";
		}
	};

const TitleWrapper: FC<{ title: string }> = (props) => {
	return (
		<div className="filterBox">
			<Typography.Title level={4} className="fullWidth">
				{props.title}
			</Typography.Title>
			{props.children}
		</div>
	);
};

type Wrapper = {
	id: string;
	handleChange: Dispatch<React.SetStateAction<Record<string, Filters> | null>>;
	className: string;
	min?: number | string;
	max?: number | string;
	value: null | Filters;
};

const DateWrapper: FC<Wrapper> = ({ handleChange, className, id, value }) => {
	return (
		<div className={className}>
			<Typography.Title level={5} className="fullWidth">
				Wybierz zakres dat
			</Typography.Title>
			<RangePicker
				value={[
					moment((value as DateFilter).first, "YYYY-MM-DD"),
					moment((value as DateFilter).last, "YYYY-MM-DD"),
				]}
				onChange={(value) => {
					handleChange((prev) => {
						if (!prev) {
							return prev;
						}
						if (!value || !value[0] || !value[1]) {
							return prev;
						}
						const item = prev[id] as DateFilter;
						item.first = value[0].toISOString();
						item.last = value[1].toISOString();
						return { ...prev, [id]: prev[id] };
					});
				}}
			/>
		</div>
	);
};

const IntegerWrapper: FC<Wrapper> = ({
	className,
	handleChange,
	min,
	max,
	id,
	value,
}) => {
	return (
		<div className={className}>
			<Typography.Title level={5} className="fullWidth">
				Od - do
			</Typography.Title>
			<InputNumber
				min={min}
				max={max}
				value={(value as IntegerFilter).first}
				style={{ width: "50%" }}
				onChange={(value) => {
					handleChange((prev) => {
						if (!prev) {
							return prev;
						}
						const item = prev[id] as IntegerFilter;
						item.first = value as number;
						return { ...prev, [id]: prev[id] };
					});
				}}
			/>
			<InputNumber
				min={min}
				max={max}
				value={(value as IntegerFilter).last}
				style={{ width: "50%" }}
				onChange={(value) => {
					handleChange((prev) => {
						if (!prev) {
							return prev;
						}
						const item = prev[id] as IntegerFilter;
						item.last = value as number;
						return { ...prev, [id]: prev[id] };
					});
				}}
			/>
		</div>
	);
};

const DomainWrapper: FC<Wrapper> = ({
	handleChange,
	className,
	children,
	id,
	value,
}) => {
	return (
		<div>
			<Typography.Title level={5} className="fullWidth">
				Select Domain
			</Typography.Title>
			<Select
				mode="multiple"
				style={{ width: "100%" }}
				placeholder="Please select"
				className={className}
				value={(value as DomainType).domain}
				onChange={(value) => {
					handleChange((prev) => {
						if (!prev) {
							return prev;
						}
						const item = prev[id] as DomainType;
						item.domain = value as string[];
						return { ...prev, [id]: prev[id] };
					});
				}}
			>
				{Children.map(children, (item) => (
					<Option key={item as string} value={item as string}>
						{item}
					</Option>
				))}
			</Select>
		</div>
	);
};

export const generateKids = (
	values: Record<string, Filters>,
	setState: Dispatch<React.SetStateAction<Record<string, Filters> | null>>,
	state: Record<string, Filters> | null
) => {
	return Object.entries(values)
		.map(([key, value]) => {
			return { ...value, name: key } as FiltersWithNames;
		})
		.map(getComponents(setState, state));
};
