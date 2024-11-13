import { type P5CanvasInstance, type SketchProps } from '@p5-wrapper/react';

export type Pattern = 'gradient' | 'random';

export type Shape = 'rounded' | 'squared';

export type Colors = { fromColor: string; toColor: string; bgColor: string };

export type UserInputValues = {
  name: string;
  colors: Colors;
  size: number;
  patternMode: Pattern;
  isSavingImage: boolean;
  showGridLines: boolean;
  showBanner: boolean;
  artMode: Shape;
};

export type MySketchProps = SketchProps & P5CanvasInstance & UserInputValues;

export interface Action {
  type:
    | 'name'
    | 'colors'
    | 'size'
    | 'patternMode'
    | 'showGridLines'
    | 'showBanner'
    | 'artMode'
    | 'isSavingImage';
  value: boolean | string | number | Colors | Pattern | Shape;
}
