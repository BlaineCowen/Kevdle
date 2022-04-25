// import { useSpring, useTrail, animated } from "react-spring";

// function Barchart({ size = 24, color = "black" }) {
//   // const { x } = useSpring({
//   //   from: { x: 4 },
//   //   to: { x: 20 },
//   //   loop: { reverse: true },
//   //   config: {
//   //     duration: 500,
//   //     ease: "easeInOutExpo",
//   //   },
//   //   x: 0,
//   //   delay: 0,
//   // });

//   const trail = useTrail(3, {
//     from: { x: -10 },
//     to: { x: 30},

//     loop: { reverse: true },
//     easing: "easeOutExpo",
//   });

//   return (
//     <div className="flex flex-row">
//       {trail.map(({x}, index) => (
//         <animated.svg

//           key={index}
//           xmlns="http://www.w3.org/2000/svg"
//           width={size/3}
//           height={size}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke={color}
//           strokeWidth="7"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           // strokeDashoffset={x}

//         >
//             <animated.line x1="5" y1="40" x2="5" y2={x}/>
//             {/* <animated.line x1="12" y1="20" x2="12" y2="1" />
//             <animated.line x1="18" y1="20" x2="18" y2="1" />
//             <animated.line x1="6" y1="20" x2="6" y2="1" /> */}
//       </animated.svg>
//         ))}
//     </div>
//   );
// }

// export default Barchart;

import { useSpring, useTrail, animated } from "react-spring";

function Barchart({ size = 24, color = "black" }) {
  const { x1 } = useSpring({
    from: { x1: 9 },
    to: { x1: 15 },
    loop: { reverse: true },
    config: {
      duration: 500,
      ease: "easeInExpo",
    },
    x: 0,
    delay: 0,
  });

  const { x2 } = useSpring({
    from: { x2: 8 },
    to: { x2: 15 },
    loop: { reverse: true },
    config: {
      duration: 500,
      ease: "easeInExpo",
    },
    x2: 0,
    delay: 50,
  });

  const { x3 } = useSpring({
    from: { x3: 8 },
    to: { x3: 15 },
    loop: { reverse: true },
    config: {
      duration: 500,
      ease: "easeInExpo",
    },
    x3: 0,
    delay: 100,
  });

  // const trail = useTrail(3, {
  //   from: { x: -10 },
  //   to: { x: 30},

  //   loop: { reverse: true },
  //   easing: "easeOutExpo",
  // });

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
        // strokeDashoffset={x}
      >
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        {/* <animated.line x1="5" y1="40" x2="5" y2={x}/> */}
        <animated.line
          strokeWidth={1}
          strokeLinecap="square"
          x1="9"
          y1="16"
          x2="9"
          y2={x3}
        />
        <animated.line
          strokeWidth={1}
          strokeLinecap="square"
          x1="12"
          y1="16"
          x2="12"
          y2={x1}
        />
        <animated.line
          strokeWidth={1}
          strokeLinecap="square"
          x1="15"
          y1="16"
          x2="15"
          y2={x2}
        />
      </svg>
    </div>
  );
}

export default Barchart;
