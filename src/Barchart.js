import { useSpring, useTrail, animated } from "react-spring";

function Barchart({ size = 24, color = "black" }) {
  // const { x } = useSpring({
  //   from: { x: 4 },
  //   to: { x: 20 },
  //   loop: { reverse: true },
  //   config: {
  //     duration: 500,
  //     ease: "easeInOutExpo",
  //   },
  //   x: 0,
  //   delay: 0,
  // });

  const trail = useTrail(3, {
    from: { x: 0 },
    to: { x: 20 },
  });

  return (
    <div className="flex flex-col">
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
        {/* {trail.map(({ x }, index) => (
          <animated.div
            key={index}
            style={{
              transform: x.to((x) => `y2(${x})`),
            }}
          >
            <animated.line x1="12" y1="20" x2="12" y2="1" />
            <animated.line x1="18" y1="20" x2="18" y2="1" />
            <animated.line x1="6" y1="20" x2="6" y2="1" />
          </animated.div> */}
        ))}
      </svg>
    </div>
  );
}

export default Barchart;
