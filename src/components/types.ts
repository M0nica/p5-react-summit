import { type P5CanvasInstance, type SketchProps } from '@p5-wrapper/react';

export type Pattern = 'gradient' | 'random';

export type UserInputValues = {
  colors: {
    fromColor: string;
    toColor: string;
    bgColor: string;
  };
  size: number;
  patternMode: Pattern;
  isSavingImage: boolean;
  setIsSavingImage: () => void;
  showGrid: boolean;
  artMode: 'rounded' | 'squared';
};

export type MySketchProps = SketchProps & P5CanvasInstance & UserInputValues;

export interface Action {
  type:
    | 'colors'
    | 'size'
    | 'patternMode'
    | 'showGrid'
    | 'artMode'
    | 'isSavingImage';
  value: any;
}
