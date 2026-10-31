const CLASSES = ["a", "b", "c", "d", "e"];

export default function Logo({ parts, href = "#hero" }) {
  return (
    <a className="logo" href={href} aria-label="CRAFT Lab home">
      {parts.map((src, index) => (
        <img key={src} className={CLASSES[index]} src={src} alt="" />
      ))}
    </a>
  );
}
