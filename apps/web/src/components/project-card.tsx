import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";
import {
  IconArrowRight,
  IconBrandCloudflare,
  IconBrandNextjs,
  IconBrandOpenai,
  IconBrandPlanetscale,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandVercel,
  IconCloudRain,
  IconLetterN,
} from "@tabler/icons-react";
import Link from "next/link";
import { cloneElement } from "react";
import { Button } from "ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "ui/components/ui/card";
import { Separator } from "ui/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "ui/components/ui/tooltip";

export function ProjectCard({
  title,
  links,
  technology,
  slug,
  children,
}: {
  title?: string;
  slug?: string;
  technology?: {
    vercel?: boolean;
    react?: boolean;
    next?: boolean;
    drizzle?: boolean;
    planetscale?: boolean;
    neon?: boolean;
    cloudflare?: boolean;
    ai?: boolean;
    tailwind?: boolean;
  };
  links?: {
    type: "github" | "link";
    content?: string;
  }[];
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <Card className="min-h-max w-full min-w-[250px] p-6 relative h-max">
      <CardContent className="p-0 pt-0">
        {title ? (
          <>
            <CardTitle className="text-xl flex flex-row flex-wrap gap-2 justify-between items-center pb-1">
              <span className="w-max">{title}</span>
              <div className="w-max flex flex-row flex-nowrap gap-2">
                {links?.map(link => {
                  if (link.content === undefined) return null;
                  return (
                    <Tooltip key={link.type}>
                      <TooltipTrigger asChild>
                        <Link href={link.content} target="blank">
                          <Button size="icon" variant="outline">
                            {link.type === "github" && (
                              <GitHubLogoIcon className="w-4 h-4" />
                            )}
                            {link.type === "link" && (
                              <Link2Icon className="w-4 h-4" />
                            )}
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        {link.type === "github" && "View on GitHub"}
                        {link.type === "link" && "View deployment"}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </CardTitle>
            <Separator className="my-3" />
          </>
        ) : null}
        {children}
        {technology ? (
          <CardFooter className="relative bottom-0 p-0 mt-6 font-medium min-h-max flex-col justify-normal items-start">
            Tech Stack:
            <div className="mt-2 gap-1 flex flex-col flex-wrap w-full">
              {Object.keys(technology)
                .sort()
                .map(
                  (
                    item:
                      | "vercel"
                      | "react"
                      | "next"
                      | "drizzle"
                      | "planetscale"
                      | "neon"
                      | "cloudflare"
                      | "ai"
                      | "tailwind"
                  ) => {
                    if (technology[item] === true) {
                      return (
                        <Technology
                          icon={dict[item].icon}
                          key={dict[item].name}
                        >
                          {dict[item].name}
                        </Technology>
                      );
                    }
                    return null;
                  }
                )}
            </div>
            <Link
              className="flex flex-row flex-nowrap items-center gap-1 hover:gap-2 transition-[gap] ease-in-out  mt-6"
              href={`/projects/${slug}`}
            >
              Learn More <IconArrowRight className="w-4 h-4" />
            </Link>
          </CardFooter>
        ) : null}
      </CardContent>
    </Card>
  );
}

interface Technology {
  icon: React.ReactElement;
  name: string;
}

function Technology({
  icon,
  children,
}: {
  icon: React.ReactElement;
  children: React.ReactNode;
}): JSX.Element {
  const newIcon = cloneElement(icon, { className: "w-4 h-4" });

  return (
    <div className="flex flex-row flex-nowrap gap-2 items-center w-max font-normal">
      {newIcon}
      {children}
    </div>
  );
}

const dict: {
  vercel: Technology;
  react: Technology;
  next: Technology;
  drizzle: Technology;
  planetscale: Technology;
  neon: Technology;
  cloudflare: Technology;
  ai: Technology;
  tailwind: Technology;
} = {
  vercel: {
    icon: <IconBrandVercel />,
    name: "Vercel",
  },
  react: {
    icon: <IconBrandReact />,
    name: "React",
  },
  next: {
    icon: <IconBrandNextjs />,
    name: "Next.JS",
  },
  drizzle: {
    icon: <IconCloudRain />,
    name: "Drizzle ORM",
  },
  planetscale: {
    icon: <IconBrandPlanetscale />,
    name: "Planetscale",
  },
  neon: {
    icon: <IconLetterN />,
    name: "Neon",
  },
  cloudflare: {
    icon: <IconBrandCloudflare />,
    name: "Cloudflare",
  },
  ai: {
    icon: <IconBrandOpenai />,
    name: "AI",
  },
  tailwind: {
    icon: <IconBrandTailwind />,
    name: "Tailwind CSS",
  },
};
