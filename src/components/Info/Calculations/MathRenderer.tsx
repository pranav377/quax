import { MathComponent } from "mathjax-react";

export default function MathRenderer(props: { equation: string }) {
  return <MathComponent tex={String.raw` ${props.equation} `} />;
}
