import * as React from 'react';
import InputFields from './InputFields';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import { sketch } from './Sketch';
import Styles from './demo.module.css';

import { type MySketchProps, type UserInputValues, type Action } from './types';

export const defaultInputValues = {
  colors: {
    fromColor: '#75B8C7',
    toColor: '#8B236A',
    bgColor: '#281731',
  },
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
