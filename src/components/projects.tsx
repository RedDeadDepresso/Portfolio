import { Badge } from "./ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";
import { GITHUB_USERNAME } from "@/data";

interface ProjectProps {
	name: string;
	description: string;
	html_url: string;
	fork: boolean;
	topics: string[];
	homepage: string;
}

export function Projects() {
	const [projects, setProjects] = useState<ProjectProps[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		async function fetchProjects() {
			const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
			try {
				const response = await fetch(url);
				if (!response.ok) {
					setErrorMessage(`Response status: ${response.status}`);
				}
				const json = await response.json();
				setProjects(json);
			} catch (error) {
				if (error instanceof Error) {
					setErrorMessage(error.message);
				} else {
					setErrorMessage("An unknown error occurred.");
				}
			}
		}
		fetchProjects();
	}, []);

	return (
		<section id="projects" className="space-y-8">
			<h2 className="text-3xl lg:text-4xl font-bold text-center">Projects</h2>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{errorMessage && <p className="text-xl text-red-500">{errorMessage}</p>}
				{!errorMessage &&
					projects
						.filter(({ topics }) => topics.length !== 0)
						.map(({ name, description, html_url, topics, homepage }: ProjectProps) => (
							<Card key={name}>
								<CardHeader>
									<CardTitle>{name}</CardTitle>
								</CardHeader>

								<CardContent className="flex flex-col items-center gap-4">
									<img
										src={`/repos/${name}.png`}
										alt=""
										className="h-[300px] rounded-lg"
										onError={(e) => (e.currentTarget.src = "/repos/unavailable.svg")}
									/>

									<p>{description}</p>

									<div className="flex flex-wrap md:justify-center gap-4">
										{topics.map((topic: string) => (
											<div key={topic}>
												<Badge variant="secondary" className="text-sm">
													{topic}
												</Badge>
											</div>
										))}
									</div>
								</CardContent>

								<CardFooter className="flex justify-end items-end gap-4 h-full">
									{homepage && (
										<a href={homepage} className={buttonVariants({ variant: "default" })}>
											Demo
										</a>
									)}
									<a href={html_url} className={buttonVariants({ variant: "default" })}>
										Code
									</a>
								</CardFooter>
							</Card>
						))}
			</div>
		</section>
	);
}
