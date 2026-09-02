import { EMAIL } from "@/constants";

/*
  Name and year on the left, the email on the right. The social marks live
  in the contact section above, so the footer only has to say who and how.
*/
const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 border-border px-4 py-5 md:border-x md:px-8">
        <p className="label">Sougata Das {new Date().getFullYear()}</p>
        {/*
          Mono and muted like the nav, but not through .label: an uppercased
          email address reads as shouting and is harder to copy by eye.
        */}
        <a
          href={`mailto:${EMAIL}`}
          className="font-mono text-[11px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          {EMAIL}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
