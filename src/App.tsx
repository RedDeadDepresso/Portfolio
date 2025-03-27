import { Navbar } from "./components/navbar";
import { About } from "./components/about";
import { Projects } from "./components/projects";

function App() {
	return (
		<>
			<Navbar />
			<div className="container mx-auto space-y-12 py-12 px-4">
				<About />
				<Projects />
			</div>
		</>
	);
}

export default App;
