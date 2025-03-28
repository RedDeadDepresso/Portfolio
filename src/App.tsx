import { Navbar } from "./components/navbar";
import { About } from "./components/about";
import { Projects } from "./components/projects";
import CV from "./components/cv";
import { CV_URL } from "./data";

function App() {
	return (
		<>
			<Navbar />
			<div className="container mx-auto space-y-12 py-12 px-4">
				<About />
				<Projects />
				{CV_URL && <CV />}
			</div>
		</>
	);
}

export default App;
