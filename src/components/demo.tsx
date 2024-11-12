import * as React from 'react';
import InputFields from './InputFields';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import { sketch } from './Sketch';
import Styles from './demo.module.css';

import { type MySketchProps, type UserInputValues, type Action } from './types';

function generateRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const lightBg = '#f8f8f8';
const darkBg = '#281731';

export function generateColors() {
  return {
    fromColor: generateRandomHexColor(),
    toColor: generateRandomHexColor(),
    bgColor: Math.random() > 0.5 ? lightBg : darkBg,
  };
}

export const defaultInputValues = {
  colors: generateColors(),
  patternMode: 'gradient',
  size: 35,
  isSavingImage: false,
  showGrid: false,
  setIsSavingImage: () => {},
  artMode: 'rounded',
} as MySketchProps;

function reducer(state: UserInputValues, action: Action): UserInputValues {
  const { type, value } = action;
  return { ...state, [type]: value };
}

export default function App() {
  const [inputState, dispatch] = React.useReducer(reducer, defaultInputValues);

  const { isSavingImage } = inputState;

  if (typeof window === 'undefined') {
    return null;
  }

  const setIsSavingImage = () => {
    dispatch({
      type: 'isSavingImage',
      value: !isSavingImage,
    });
  };

  return (
    <>
      <div className={Styles.containerCss}>
        <InputFields
          dispatch={dispatch}
          setIsSavingImage={setIsSavingImage}
          inputValues={inputState}
        />

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
