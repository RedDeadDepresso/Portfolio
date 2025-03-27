import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { Card } from "./ui/card";
import { GITHUB_USERNAME } from "@/data";

export function About() {
	const [avatar, setAvatar] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		async function fetchAboutAvatar() {
			const url = `https://api.github.com/users/${GITHUB_USERNAME}`;
			try {
				const response = await fetch(url);
				if (!response.ok) {
					setErrorMessage(`Response status: ${response.status}`);
				}
				const json = await response.json();
				setAvatar(json.avatar_url);

				const link = document.createElement("link");
				link.rel = "icon";
				document.getElementsByTagName("head")[0].appendChild(link);
				link.href = json.avatar_url;
				document.title = `Portfolio - ${GITHUB_USERNAME}`;
			} catch (error) {
				if (error instanceof Error) {
					setErrorMessage(error.message);
				} else {
					setErrorMessage("An unknown error occurred.");
				}
			}
		}

		async function fetchAboutContent() {
			const url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_USERNAME}/master/README.md`;
			try {
				const response = await fetch(url);
				if (!response.ok) {
					setErrorMessage(`Response status: ${response.status}`);
				}
				const text = await response.text();
				setContent(text);
			} catch (error) {
				if (error instanceof Error) {
					setErrorMessage(error.message);
				} else {
					setErrorMessage("An unknown error occurred.");
				}
			}
		}
		fetchAboutAvatar();
		fetchAboutContent();
	}, []);

	return (
		<section id="about" className="space-y-8">
			<h2 className="text-3xl lg:text-4xl font-bold text-center">
				{`Hi, I'm ${GITHUB_USERNAME}!`}
			</h2>
			<Card className="py-12">
				<div className="flex flex-col md:flex-row px-12 gap-12">
					{avatar && (
						<img
							src={avatar}
							alt="avatar"
							className="w-[300px] h-[300px] object-contain rounded-lg mx-auto"
						/>
					)}
					{!avatar && (
						<Skeleton className="w-[300px] h-[300px] object-contain rounded-lg mx-auto" />
					)}
					<div className="bg-green-0 flex flex-col justify-between">
						<div className="pb-6">
							{content && (
								<>
									<MarkdownRenderer>{content}</MarkdownRenderer>
								</>
							)}
							{errorMessage && (
								<p className="text-xl text-red-500 mt-4">{errorMessage}</p>
							)}
							{!content && (
								<Skeleton className="text-xl text-muted-foreground mt-4"></Skeleton>
							)}
						</div>
					</div>
				</div>
			</Card>
		</section>
	);
}
