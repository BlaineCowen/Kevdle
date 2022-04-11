import { useSpring, animated } from "react-spring";

function Barchart({ size = 24, color = "black" }) {
  const { y2 } = useSpring({
    from: { y2: 4 },
    to: { y2: 16 },
    loop: { from: { y2: 16 }, to: { y2: 4 } },
  });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <animated.line x1="12" y1="20" x2="12" y2={y2} />
      <animated.line x1="18" y1="20" x2="18" y2={y2} />
      <animated.line x1="6" y1="20" x2="6" y2={y2} />
    </svg>
  );
}

export default Barchart;
