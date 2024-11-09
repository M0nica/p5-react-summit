import { type P5CanvasInstance, type Sketch } from '@p5-wrapper/react';

import { defaultInputValues } from './demo';

import { type Pattern, type MySketchProps } from './types';
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

export const sketch: Sketch<MySketchProps> = (p5) => {
  p5.updateWithProps = (props) => {
    inputValues = props;

    if (inputValues.isSavingImage) {
      p5.saveCanvas('myCanvas', 'jpg');
      inputValues?.setIsSavingImage && inputValues.setIsSavingImage();
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
