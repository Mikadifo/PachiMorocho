import linkIcon from "./../assets/linkIcon.svg";

export default function Link({ label }) {
  return (
    <button className="flex gap-1 text-dark font-heading font-bold text-xl cursor-pointer group">
      <img
        src={linkIcon}
        alt="Link Icon"
        className="transition-transform duration-300 group-hover:rotate-12"
      />
      <span className="group-hover:opacity-80">{label}</span>
    </button>
  );
}
