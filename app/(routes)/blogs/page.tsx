import PageTransition from "@/components/animations/PageTransition";

const page = () => {
  return (
    <PageTransition>
      <section className="section-container">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <h1 className="heading-text">Blogs</h1>
            <p className="secondary-text">My blog posts.</p>
          </div>
          {/* Blog List */}
        </div>
      </section>
    </PageTransition>
  );
};

export default page;
