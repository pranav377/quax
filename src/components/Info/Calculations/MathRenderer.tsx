import { MathJax } from "better-react-mathjax";

export default function MathRenderer(props: { equation: string }) {
  return (
    <MathJax hideUntilTypeset="first">{`$$ ${props.equation} $$`}</MathJax>
  );
}
