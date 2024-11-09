import * as React from 'react';
import {
  ReactP5Wrapper,
  type P5CanvasInstance,
  type Sketch,
  type SketchProps,
} from '@p5-wrapper/react';
import Styles from './demo.module.css';

type Pattern = 'gradient' | 'random';

type UserInputValues = {
  colors: {
    fromColor: string;
    toColor: string;
    bgColor: string;
  };
  size: number;
  patternMode: Pattern;
  isSavingImage: boolean;
  setIsSavingImage: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  showGrid: boolean;
  artMode: 'rounded' | 'squared';
};
type MySketchProps = SketchProps & P5CanvasInstance & UserInputValues;

const defaultInputValues = {
  colors: {
    fromColor: '#75B8C7',
    toColor: '#8B236A',
    bgColor: '#281731',
  },
  patternMode: 'gradient',
  size: 35,
  isSavingImage: false,
  showGrid: false,
  setIsSavingImage: undefined,
  artMode: 'rounded',
} as MySketchProps;

let inputValues = defaultInputValues;

let originalSize = 35;
const weight = 8;
let timesInput = 1;

function drawGrid(
  p5: P5CanvasInstance<MySketchProps>,
  width: number,
  height: number,
  originalSize: number,
  inputValues: {
    size: number;
    colors: { fromColor: string; toColor: string; bgColor: string };
    patternMode: Pattern;
    showGrid: boolean;
    artMode: 'rounded' | 'squared';
  }
) {
  const { colors, patternMode, showGrid, size, artMode } = inputValues;
  const { fromColor, toColor } = colors;

  const from = p5.color(fromColor);
  const to = p5.color(toColor);

  const tile = generateTile(p5, showGrid, artMode);

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
              patternMode === 'gradient' ? j / height : p5.random(1)
            )
      );
      p5.scale(size / originalSize);
      p5.image(tile, 0, 0);
      p5.pop();
    }
  }
}

function generateTile(
  p5: P5CanvasInstance<MySketchProps>,
  showGrid: boolean,
  artMode: 'rounded' | 'squared'
) {
  let pg;

  pg = p5.createGraphics(originalSize + 2, originalSize + 2);

  if (showGrid) {
    pg.noFill();
    pg.stroke('white');
    pg.strokeWeight(weight * 0.25);
    pg.strokeCap(p5.ROUND);
    pg.square(0, 0, pg.height);
    p5.noStroke();
  }

  pg.strokeWeight(weight);
  pg.strokeCap(p5.ROUND);
  if (artMode == 'rounded') {
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
    inputValues = props;

    if (inputValues.isSavingImage) {
      p5.saveCanvas('myCanvas', 'jpg');
      inputValues?.setIsSavingImage && inputValues.setIsSavingImage(false);
    }

    p5.redraw();
  };

  const computeWidth = (width: number) =>
    width > 600 ? width * 0.5 : width * 0.9;
  p5.setup = () => {
    p5.createCanvas(computeWidth(p5.windowWidth), p5.windowHeight * 0.75);
    p5.imageMode(p5.CENTER);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(computeWidth(p5.windowWidth), p5.windowHeight * 0.75);
  };

  p5.draw = () => {
    const { colors } = inputValues;
    const { bgColor } = colors;

    p5.background(bgColor);
    p5.noLoop();
    drawGrid(
      p5 as P5CanvasInstance,
      p5.width,
      p5.height,
      originalSize,
      inputValues
    );
  };
};

interface Action {
  type:
    | 'colors'
    | 'size'
    | 'patternMode'
    | 'showGrid'
    | 'artMode'
    | 'isSavingImage';
  value: any;
}

function reducer(state: UserInputValues, action: Action): UserInputValues {
  const { type, value } = action;
  return { ...state, [type]: value };
}

export default function App() {
  const [inputState, dispatch] = React.useReducer(reducer, defaultInputValues);

  const { colors, size, patternMode, showGrid, artMode, isSavingImage } =
    inputState;

  if (typeof window === 'undefined') {
    return null;
  }

  const handleColorChange = (e: {
    target: { name: string; value: React.SetStateAction<string> };
  }) => {
    dispatch({
      type: 'colors',
      value: { ...colors, [e.target.name]: e.target.value },
    });
  };

  const handleSliderChange = (e: {
    target: { name: string; value: string };
  }) => {
    dispatch({ type: 'size', value: parseInt(e.target.value) });
  };

  const handleArtModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'artMode',
      value: e.target.value as 'rounded' | 'squared',
    });
  };
  const handleColorModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'patternMode',
      value: e.target.value as Pattern,
    });
  };

  const handleShowGrid = () => {
    dispatch({
      type: 'showGrid',
      value: !showGrid,
    });
  };

  const setIsSavingImage = (val?: boolean) => {
    dispatch({
      type: 'isSavingImage',
      value: val ? val : !isSavingImage,
    });
  };

  const labels = {
    bgColor: 'Background',
    fromColor: 'Primary',
    toColor: 'Secondary',
  };

  return (
    <>
      <div className={Styles.containerCss}>
        <div className={Styles.controlPanelCss}>
          {(['bgColor', 'fromColor', 'toColor'] as const).map((color) => {
            return (
              <div className={Styles.columnCss} key={color}>
                <label htmlFor={color}>{labels[color]}</label>
                <input
                  type='color'
                  value={colors[color]}
                  onChange={handleColorChange}
                  name={color}
                  id={color}
                />
              </div>
            );
          })}

          <fieldset>
            <legend>🌈 Color Mode</legend>

            <div>
              <input
                type='radio'
                id='gradientColor'
                name='gradient'
                value='gradient'
                checked={patternMode === 'gradient'}
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
                checked={patternMode === 'random'}
                onChange={handleColorModeChange}
              />
              <label htmlFor='randomColor'>Random</label>
            </div>
          </fieldset>
          <fieldset>
            <legend>🎨 Art Mode</legend>

            <div>
              <input
                type='radio'
                id='rounded'
                name='rounded'
                value='rounded'
                checked={artMode === 'rounded'}
                onChange={handleArtModeChange}
              />
              <label htmlFor='rounded'>Round</label>
            </div>

            <div>
              <input
                type='radio'
                id='squared'
                name='squared'
                value='squared'
                checked={artMode === 'squared'}
                onChange={handleArtModeChange}
              />
              <label htmlFor='squared'>Square</label>
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

          <div>
            <input
              type='checkbox'
              id='grid'
              name='grid'
              checked={showGrid}
              onChange={handleShowGrid}
            />
            <label htmlFor='grid'>Show Grid</label>
          </div>
          <button
            className={Styles.buttonCss}
            onClick={() => setIsSavingImage()}
          >
            Save Image 🖼️
          </button>
        </div>

        <div className={Styles.canvasCss}>
          <ReactP5Wrapper
            sketch={sketch}
            {...inputState}
            setIsSavingImage={setIsSavingImage}
          />
        </div>
      </div>
    </>
  );
}
