import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { theme } from "../../theme";

const progressAnimation = keyframes`
  from {
    --progress: 0;
  }
  to {
    --progress: 100;
  }
`;

const Svg = styled("svg")<{
  size: number;
  duration: number;
}>`
  --size: ${(props) => props.size}px;
  --half-size: calc(var(--size) / 2);
  --stroke-width: 2px;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--progress) * var(--circumference)) / 100);
  animation: ${progressAnimation} ${(props) => props.duration}s linear 0s 1
    forwards;

  @property --progress {
    syntax: "<number>";
    inherits: false;
    initial-value: 0;
  }
`;

const Circle = styled("circle")`
  cx: var(--half-size);
  cy: var(--half-size);
  r: var(--radius);
  stroke-width: var(--stroke-width);
  fill: none;
  stroke-linecap: round;
`;

const BgCircle = styled(Circle)`
  stroke: transparent;
`;

const FgCircle = styled(Circle)`
  transform: rotate(-90deg);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: ${theme.palette.primary.main};
`;

export const CircleProgress = (props: {
  size: number;
  duration: number;
  onAnimationEnd: () => void;
}) => {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox={`0 0 ${props.size} ${props.size}`}
      size={props.size}
      duration={props.duration}
      onAnimationEnd={props.onAnimationEnd}
    >
      <BgCircle />
      <FgCircle />
    </Svg>
  );
};
