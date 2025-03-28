import { CV_URL } from "@/data";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function CV() {
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	return (
		<section id="cv" className="space-y-8">
			<h2 className="text-3xl lg:text-4xl font-bold text-center">CV</h2>
			<div style={{ height: "100vh" }}>
				<Worker
					workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
				>
					<Viewer fileUrl={CV_URL} plugins={[defaultLayoutPluginInstance]} defaultScale={SpecialZoomLevel.PageFit} />
				</Worker>
			</div>
		</section>
	);
}

export default CV;
