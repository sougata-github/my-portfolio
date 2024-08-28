import Connect from "@/components/Connect";
import Skills from "@/components/stack/Skills";
import PrimaryStack from "@/components/stack/PrimaryStack";

const page = () => {
  return (
    <section className="section-container">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col">
          {" "}
          <h1 className="heading-text">Stack</h1>
          <p className="secondary-text">Tool and technologies I use.</p>
        </div>
        <Skills />
      </div>
      <PrimaryStack />
      <Connect />
    </section>
  );
};

export default page;
