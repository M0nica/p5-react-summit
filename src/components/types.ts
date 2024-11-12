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
  setIsSavingImage: () => void;
  showGrid: boolean;
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
    | 'showGrid'
    | 'showBanner'
    | 'artMode'
    | 'isSavingImage';
  value: any;
}
