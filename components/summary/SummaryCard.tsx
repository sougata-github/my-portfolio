"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Linkedin, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FiGithub } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

interface Project {
  name: string;
  description: string;
  link: string;
  sourceLink: string;
}

interface Blog {
  title: string;
  description: string;
  link: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface SummaryData {
  title: string;
  about: string;
  experienceSummary: string;
  projects: Project[];
  blogs: Blog[];
  socialLinks: SocialLink[];
}

interface SummaryCardProps {
  data: SummaryData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <FiGithub className="size-4" />;
    case "linkedin":
      return <Linkedin className="size-4" />;
    case "twitter":
    case "x":
      return <RiTwitterXLine className="size-4" />;
    default:
      return <ArrowUpRight className="size-4" />;
  }
};

export const SummaryCardSkeleton = () => {
  return (
    <div className="w-full pt-4">
      <div className="flex items-center gap-2">
        <Loader className="size-4 animate-spin transition" />
        <p className="text-sm text-muted-foreground">Generating Summary</p>
      </div>
    </div>
  );
};

export function SummaryCard({ data }: SummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="dark:border p-4 pt-0 bg-transparent">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            {data.title}
          </CardTitle>
          <CardDescription className="text-sm text-foreground/70 leading-relaxed">
            {data.about}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Experience</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {data.experienceSummary}
            </p>
          </div>

          {data.projects.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-3">Projects</h3>
              <div className="space-y-3">
                {data.projects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start justify-between gap-4 p-3 rounded-lg bg-muted-foreground/10"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {project.name}
                      </p>
                      <p className="text-xs text-foreground/60 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        asChild
                      >
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="size-3.5" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        asChild
                      >
                        <Link
                          href={project.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiGithub className="size-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {data.blogs.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-3">Blogs</h3>
              <div className="space-y-2">
                {data.blogs.map((blog, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-3 rounded-lg bg-muted-foreground/10 group cursor-pointer"
                  >
                    <Link
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {blog.title}
                        </p>
                        <p className="text-xs text-foreground/60 line-clamp-1">
                          {blog.description}
                        </p>
                      </div>
                      <ArrowUpRight className="size-3.5 shrink-0 text-foreground/40" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {data.socialLinks.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-3">Connect</h3>
              <div className="flex flex-wrap gap-2">
                {data.socialLinks.map((social, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-2"
                      asChild
                    >
                      <Link
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getSocialIcon(social.platform.toLowerCase())}
                        <span className="text-xs">{social.platform}</span>
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
