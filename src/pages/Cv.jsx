import cv from "./../data/morochoCV.pdf";

export default function Cv() {
  return (
    <iframe src={cv} width="100%" height="800px" style={{ border: "none" }} />
  );
}
