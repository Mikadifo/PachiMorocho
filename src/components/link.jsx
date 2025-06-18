import linkIcon from "./../assets/linkIcon.svg";
import "./link.css";

export default function Link({ label }) {
  return (
    <button className="link">
      <img src={linkIcon} alt="Link Icon" />
      <span>{label}</span>
    </button>
  );
}
