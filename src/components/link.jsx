import linkIcon from "./../assets/linkIcon.svg";

export default function Link({ label }) {
  return (
    <button className="flex gap-1 text-dark font-heading font-bold text-xl cursor-pointer">
      <img src={linkIcon} alt="Link Icon" />
      <span>{label}</span>
    </button>
  );
}
