import { Input } from "antd";
import { useHistory } from "react-router";

const { Search } = Input;
export const SearchWrapp = () => {
	const history = useHistory();
	const onSearch = (value: string) => {
		if (value === "") {
			return;
		}
		history.push(`/check/${value}`);
	};
	return (
		<Search
			placeholder="id analizy"
			allowClear
			enterButton="Zobacz analizę"
			size="large"
			onSearch={onSearch}
		/>
	);
};
