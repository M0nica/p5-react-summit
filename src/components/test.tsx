import * as React from 'react';
import {
  ReactP5Wrapper,
  type Sketch,
  type SketchProps,
} from '@p5-wrapper/react';

type MySketchProps = SketchProps & {
  bgColor: string;
};

const sketch: Sketch<MySketchProps> = (p5) => {
  let bgColor = '#004c4c';

  p5.updateWithProps = (props) => {
    if (props.bgColor) {
      bgColor = props.bgColor;
    }
  };
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(bgColor);
    // p5.normalMaterial();
    // p5.push();
    // p5.rotateZ(p5.frameCount * 0.01);
    // p5.rotateX(p5.frameCount * 0.01);
    // p5.rotateY(p5.frameCount * 0.01);
    // p5.plane(100);
    // p5.pop();
  };
};

export default function App() {
  const [bgColor, setBgColor] = React.useState('#004c4c');

  if (typeof window === 'undefined') {
    return null;
  }

  const handleColorChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBgColor(e.target.value);
  };
  return (
    <>
      <input type='color' value={bgColor} onChange={handleColorChange} />
      <ReactP5Wrapper sketch={sketch} bgColor={bgColor} />
    </>
  );
}
