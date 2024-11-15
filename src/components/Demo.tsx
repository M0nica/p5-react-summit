import * as React from 'react';
import InputFields from './InputFields';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import { sketch } from './Sketch';
import Styles from './Demo.module.css';

import { type MySketchProps, type UserInputValues, type Action } from './types';
import { generateColors } from './utils';

export const defaultInputValues = {
  name: '',
  colors: generateColors(),
  patternMode: 'gradient',
  size: 35,
  isSavingImage: false,
  showGridLines: false,
  showBanner: true,
  artMode: 'round',
} as MySketchProps;

function reducer(state: UserInputValues, action: Action): UserInputValues {
  const { type, value } = action;
  return { ...state, [type]: value };
}

export default function App() {
  const [inputState, dispatch] = React.useReducer(reducer, defaultInputValues);

  const deferredInputState = React.useDeferredValue(inputState);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <>
      <div className={Styles.containerCss}>
        <InputFields dispatch={dispatch} inputValues={inputState} />

        <div className={Styles.canvasCss}>
          <ReactP5Wrapper sketch={sketch} {...deferredInputState} />
        </div>
      </div>
    </>
  );
}
