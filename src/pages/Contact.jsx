export default function Contact() {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Submitting");
  };

  return (
    <div className="p-16 flex flex-col items-center gap-16 text-dark justify-center w-full">
      <h1 className="font-bold font-heading text-[28px]">Contact</h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
        <label htmlFor="name" className="flex flex-col">
          <span className="text-xl font-bold font-heading mb-2">Name:</span>
          <input
            type="text"
            id="name"
            placeholder="Isabella Nguyen"
            className="p-3 bg-dark text-white"
          />
        </label>
        <label htmlFor="email" className="flex flex-col">
          <span className="text-xl font-bold font-heading mb-2">Email:</span>
          <input
            type="email"
            id="email"
            placeholder="isabella@example.ocm"
            className="p-3 bg-dark text-white"
          />
        </label>
        <label htmlFor="message" className="flex flex-col">
          <span className="text-xl font-bold font-heading mb-2">Message:</span>
          <textarea
            id="message"
            placeholder="Feel free to share thoughts, feedback, or inquiries here..."
            rows={6}
            className="p-3 bg-dark text-white"
          />
        </label>

        <button
          type="submit"
          className="text-white bg-main py-3 px-12 w-fit self-center cursor-pointer hover:opacity-80 mt-8"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
