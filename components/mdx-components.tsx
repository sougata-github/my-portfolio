import Image from "next/image";
// import { HTMLAttributes } from "react";
import * as runtime from "react/jsx-runtime";
import MoreCode from "./blog/MoreCode";
import { cn } from "@/lib/utils";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  MoreCode,
};

interface MdxProps {
  code: string;
  className?: string;
}

export function MDXContent({ code, className }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <div className={cn("mt-2", className)}>
      <Component components={components} />
    </div>
  );
}
