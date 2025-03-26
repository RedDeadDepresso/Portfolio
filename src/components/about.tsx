import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"
import { Card } from "./ui/card";

export function About() {
	const [avatar, setAvatar] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		async function fetchAboutAvatar() {
			const url =
				"https://api.github.com/users/RedDeadDepresso";
			try {
				const response = await fetch(url);
				if (!response.ok) {
					setErrorMessage(`Response status: ${response.status}`);
				}
				const json = await response.json();
				setAvatar(json.avatar_url);
			} catch (error) {
				if (error instanceof Error) {
					setErrorMessage(error.message);
				} else {
					setErrorMessage("An unknown error occurred.");
				}
			}
		}

		async function fetchAboutContent() {
			const url =
				"https://raw.githubusercontent.com/RedDeadDepresso/RedDeadDepresso/master/README.md";
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
		<section id="about" className="container m-auto px-4 py-8">
			<Card className="py-12">
				<div className="px-6 flex flex-col md:flex-row gap-8 md:gap-12">
					{avatar && <img src={avatar} alt="avatar" className="w-[300px] h-[300px] object-contain rounded-lg max-sm:mx-auto" />}
					{!avatar && <Skeleton className="w-[300px] h-[300px] object-contain rounded-lg max-sm:mx-auto" />}
					<div className="bg-green-0 flex flex-col justify-between">
						<div className="pb-6">
							{content && 
							<>
							<MarkdownRenderer>{content}</MarkdownRenderer>
							</>
							}
							{errorMessage && <p className="text-xl text-red-500 mt-4">{errorMessage}</p>}
							{!content && (
								<Skeleton className="text-xl text-muted-foreground mt-4">
								</Skeleton>
							)}
						</div>
					</div>
				</div>
			</Card>
		</section>
	);
}
