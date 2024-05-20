import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { allProjectsData } from "@/lib/data";

import { ArrowUpRight } from "lucide-react";

const ProjectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="lg:text-xl text-sm text-light-2 font-medium hover:text-light-1 transition-all">
        View All
      </DialogTrigger>
      <DialogContent className="custom-scrollbar overflow-y-auto pt-8 pb-4 px-8 max-w-[500px] max-h-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-light-1 font-bold">
            All Projects
          </DialogTitle>
          <ul className="py-4 flex flex-col gap-4">
            {allProjectsData.map((project) => (
              <li key={project.id} className="py-4">
                <div className="flex flex-col gap-2 mb-4 text-left">
                  <div className="flex gap-4 items-center">
                    <h1 className="text-[16px] text-light-1 font-semibold">
                      {project.title}
                    </h1>
                    <Link
                      target="_blank"
                      href={project.srcCode}
                      className="px-2 py-1 bg-[#e8e8e8] text-[10px] font-medium text-light-2 rounded-lg"
                    >
                      github
                    </Link>
                  </div>
                  <p className="text-light-2 text-sm">{project.description}</p>
                </div>

                <Link
                  target="_blank"
                  href={project.href}
                  className="text-sm underline text-light-2 font-semibold flex gap-1 items-center"
                >
                  Live Site <ArrowUpRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
