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


interface ProjectProps {
    name: string,
    description: string,
    html_url: string
    fork: boolean,
    topics: string[],
    homepage: string
}

export function Projects() {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        async function fetchProjects() {
            const url =
                "https://api.github.com/users/RedDeadDepresso/repos";
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
    <section
      id="projects"
      className="container py-24 sm:py-32 space-y-8 mx-auto"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {errorMessage && <p className="text-xl text-red-500">{errorMessage}</p>}
      {!errorMessage && projects
        .filter(({ fork, topics }) => !(fork && topics.length === 0))
        .map(({ name, description, html_url, topics, homepage }: ProjectProps) => (
          <Card key={name}>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <div className="flex flex-wrap md:justify-center gap-4">
                {topics.map((topic: string) => (
                <div key={topic}>
                    <Badge
                    variant="secondary"
                    className="text-sm"
                    >
                    {topic}
                    </Badge>
                </div>
                ))}
            </div>

            <CardFooter className="flex justify-end align-bottom gap-4">
                {homepage && <a href={homepage} className={buttonVariants({ variant: "default" })}>View Live</a>}
                <a href={html_url} className={buttonVariants({ variant: "default" })}>View Code</a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};