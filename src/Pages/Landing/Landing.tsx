import { Layout } from "antd";
import { Tools } from "../../components/Tools";
import { Signs } from "../../components/Signs";
import { Upload } from "../../components/Upload";
import { SearchWrapp } from "../../components/Search";
const { Footer, Content } = Layout;

function Landing() {
	return (
		<Layout className="layout">
			<Content className="center search">
				<div style={{ width: "40vw" }}>
					<div className="title">Porównywarka Wielokorpusowa</div>
					<div className="subTitle mtb45 no-line-height">
						Projekt stworzony na zajęcia z ZIWG
					</div>

					<Upload />

					<div className="subTitle no-line-height mtb45">
						Należy wybrać pliki, które chcesz przeanalizować - paczka ZIP.
						Korpusem jest dowolna paczka plików z różnymi tekstami
					</div>
					<div className="subTitle mtb45 no-line-height">
						<SearchWrapp />
					</div>
				</div>
			</Content>
			<Content>
				<Tools />
			</Content>
			<Footer>
				<Signs />
			</Footer>
		</Layout>
	);
}

export default Landing;
