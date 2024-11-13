import { type P5CanvasInstance, type SketchProps } from '@p5-wrapper/react';

export type Pattern = 'gradient' | 'random';

export type UserInputValues = {
  name: string;
  colors: {
    fromColor: string;
    toColor: string;
    bgColor: string;
  };
  size: number;
  patternMode: Pattern;
  isSavingImage: boolean;
  showGridLines: boolean;
  showBanner: boolean;
  artMode: 'rounded' | 'squared';
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
  value: any;
}
