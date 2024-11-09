import * as React from 'react';
import {
  ReactP5Wrapper,
  type P5CanvasInstance,
  type Sketch,
  type SketchProps,
} from '@p5-wrapper/react';

const defaultColors = {
  fromColor: '#75B8C7',
  toColor: '#8B236A',
  bgColor: '#281731',
};

type MySketchProps = SketchProps &
  P5CanvasInstance & {
    colors: {
      fromColor: string;
      toColor: string;
      bgColor: string;
    };
    size: number;
    colorMode: 'gradient' | 'random';
  };

let colorMode = 'gradient';
let colors = defaultColors;
let size = 35;
let originalSize = 35;
const weight = 8;
let timesInput = 1;
let modeInput = 'Computer Art';

function drawGrid(
  p5: P5CanvasInstance<MySketchProps>,
  width: number,
  height: number,
  size: number,
  originalSize: number,
  colors: { fromColor: string; toColor: string; bgColor: string },
  colorMode: 'gradient' | 'random' = 'gradient'
) {
  const { fromColor, toColor } = colors;

  const from = p5.color(fromColor);
  const to = p5.color(toColor);

  const tile = generateTile(p5);

  for (var i = 1; i <= width + size; i += size) {
    for (var j = 1; j <= height + size; j += size) {
      p5.push();
      p5.translate(i, j);
      var angle = (p5.TWO_PI * p5.int(p5.random(1, 5))) / 4;
      p5.rotate(angle);
      p5.tint(
        p5.random() <= p5.map(timesInput, 1, 4, 0, 0.65)
          ? from
          : p5.lerpColor(
              from,
              to,
              colorMode === 'gradient' ? j / height : p5.random(1)
            )
      );

      p5.scale(size / originalSize);
      p5.image(tile, 0, 0);
      p5.pop();
    }
  }
}

function generateTile(p5: P5CanvasInstance<MySketchProps>) {
  let pg;
  pg = p5.createGraphics(originalSize + 2, originalSize + 2);
  pg.strokeWeight(weight);
  pg.strokeCap(p5.ROUND);
  if (modeInput == 'Computer Art') {
    pg.noFill();
    pg.stroke('255');
  } else {
    pg.fill(255);
    pg.noStroke();
  }

  pg.arc(0, 0, pg.width, pg.height, 0, p5.PI / 2);
  pg.arc(pg.width, pg.height, pg.width, pg.height, p5.PI, p5.PI + p5.PI / 2);

  return pg;
}

const sketch: Sketch<MySketchProps> = (p5) => {
  p5.updateWithProps = (props) => {
    colors = props?.colors || colors;
    size = props?.size || size;
    colorMode = props?.colorMode || colorMode;

    if (props.size || props.colors || props.colorMode) {
      p5.redraw();
    }
  };

  p5.setup = () => {
    p5.createCanvas(600, 400);
    p5.imageMode(p5.CENTER);
  };

  p5.draw = () => {
    const { bgColor } = colors;

    p5.background(bgColor);
    p5.noLoop();
    drawGrid(
      p5 as P5CanvasInstance,
      p5.width,
      p5.height,
      size,
      originalSize,
      colors,
      colorMode
    );
  };
};

export default function App() {
  const [colors, setColors] = React.useState(defaultColors);
  const [size, setSize] = React.useState(35);
  const [colorMode, setColorMode] = React.useState('gradient');

  if (typeof window === 'undefined') {
    return null;
  }

  const handleColorChange = (e: {
    target: { name: string; value: React.SetStateAction<string> };
  }) => {
    console.log({ [e.target.name]: e.target.value });
    setColors({ ...colors, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (e: {
    target: { name: string; value: React.SetStateAction<string> };
  }) => {
    setSize(parseInt(e.target.value));
  };

  const handleColorModeChange = (e: {
    target: { name: string; value: React.SetStateAction<string> };
  }) => {
    // st color mode to target name if the event is selected

    if (e.target.checked) {
      setColorMode(e.target.value);
    }
  };

  const labels = {
    bgColor: 'Background Color',
    fromColor: '1st Color',
    toColor: '2nd Color',
  };
  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'row-reverse', gap: '1em' }}
        id='columns'
      >
        <div>
          {(['bgColor', 'fromColor', 'toColor'] as const).map((color) => {
            return (
              <div
                style={{ display: 'flex', flexDirection: 'column' }}
                key={color}
              >
                <label htmlFor={color}>{labels[color]}</label>
                <input
                  type='color'
                  value={colors[color]}
      {(['bgColor', 'fromColor', 'toColor'] as const).map((color) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <input
              type='color'
              value={colors[color]}
              onChange={handleColorChange}
              name={color}
              id={color}
            />
            <label htmlFor={color}>{labels[color]}</label>
          </div>
        );
      })}

      <fieldset>
        <legend>🌈 Color Mode:</legend>
                  name={color}
                  id={color}
                />
              </div>
            );
          })}
          <fieldset>
            <legend>🌈 Color Mode:</legend>

            <div>
              <input
                type='radio'
                id='gradientColor'
                name='gradient'
                value='gradient'
                checked={colorMode === 'gradient'}
                onChange={handleColorModeChange}
              />
              <label htmlFor='gradientColor'>Gradient</label>
            </div>

            <div>
              <input
                type='radio'
                id='randomColor'
                name='random'
                value='random'
                checked={colorMode === 'random'}
                onChange={handleColorModeChange}
              />
              <label htmlFor='randomColor'>Random</label>
            </div>
          </fieldset>
          <div>
            <input
              type='range'
              id='sz'
              name='size'
              min='25'
              max='75'
              value={size}
              step='1'
              onChange={handleSliderChange}
            />
            <label htmlFor='sz'>Size</label>
          </div>
        </div>

        <ReactP5Wrapper
          sketch={sketch}
          colors={colors}
          size={size}
          colorMode={colorMode}
        />
      </div>
    </>
  );
}
