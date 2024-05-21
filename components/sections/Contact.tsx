import ContactMeForm from "../ui/ContactMeForm";

const Contact = () => {
  return (
    <section id="Contact" className="section-container">
      <h1 className="section-heading">Contact Me</h1>
      <p className="section-subheading">Let&apos;s connect</p>

      <div className="px-4 mt-10 flex flex-col max-w-lg mx-auto">
        <ContactMeForm />
      </div>
    </section>
  );
};

export default Contact;
