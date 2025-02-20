import "./Title.css";

interface TitleProps {
  children: string;
  size?: "h1" | "h2" | "h3" | "h4";
}

export default function Title({ children, size = "h1" }: TitleProps) {
  return <h1 className={`title title-${size}`}>{children}</h1>;
}
