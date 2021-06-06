import { QueryClient, QueryClientProvider } from "react-query";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { Analise } from "./Pages/Analize";
import { Check } from "./Pages/Check";
import Landing from "./Pages/Landing/Landing";
const client = new QueryClient();

export const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route path="/main">
					<Landing />
				</Route>
				<Route path="/analise/:corpus/:id">
					<QueryClientProvider client={client}>
						<Analise />
					</QueryClientProvider>
				</Route>
				<Route path="/check/:id">
					<QueryClientProvider client={client}>
						<Check />
					</QueryClientProvider>
				</Route>
				<Route path="/analise">{/* <Analise /> */}</Route>
				<Redirect to="/main" />
			</Switch>
		</Router>
	);
};
