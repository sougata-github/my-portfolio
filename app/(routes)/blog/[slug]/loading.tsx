import Section from "@/components/Section";
import { Skeleton } from "@/components/ui/skeleton";

/*
  Route skeleton for a post, shown during client navigation from the list.

  It mirrors the real page band for band, header, cover, rail and measure,
  with the same paddings and the same cover aspect, so the content swaps in
  over the skeleton without anything moving. Blocks are square like every
  other surface on the site.
*/
const Line = ({ className }: { className?: string }) => (
  <Skeleton className={`h-3 rounded-none ${className ?? ""}`} />
);

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading post">
      <Section innerClassName="pt-6 pb-12 md:pb-16">
        <div className="flex items-center justify-between">
          <Line className="w-20" />
          <Line className="w-16" />
        </div>
        <Skeleton className="mt-16 h-10 w-3/4 rounded-none sm:mt-20 md:h-14" />
        <Line className="mt-6 w-full max-w-xl" />
        <Line className="mt-2 w-2/3 max-w-md" />
        <Line className="mt-8 w-40" />
      </Section>

      <Section>
        <div className="-mx-4 aspect-[21/9] border-b border-border bg-muted md:-mx-8 md:aspect-[24/9]" />

        <div className="md:grid md:grid-cols-[11rem_minmax(0,1fr)] lg:grid-cols-[13rem_minmax(0,1fr)]">
          <aside className="hidden border-r border-border pr-6 md:block">
            <div className="flex flex-col gap-3 py-10 md:py-12">
              <Line className="w-20" />
              <Line className="mt-2 w-24" />
              <Line className="w-16" />
              <Line className="w-28" />
              <Line className="w-20" />
              <Line className="w-24" />
            </div>
          </aside>

          <div className="min-w-0 py-10 md:py-12 md:pl-10">
            <div className="flex max-w-[68ch] flex-col gap-3">
              <Line className="w-full" />
              <Line className="w-11/12" />
              <Line className="w-4/5" />
              <div className="mt-6 border border-border">
                <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
                  <Line className="w-16" />
                  <Line className="w-8" />
                </div>
                <div className="flex flex-col gap-3 bg-muted/20 px-4 py-4">
                  <Line className="w-3/4" />
                  <Line className="w-1/2" />
                  <Line className="w-2/3" />
                </div>
              </div>
              <Line className="mt-6 w-full" />
              <Line className="w-5/6" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
