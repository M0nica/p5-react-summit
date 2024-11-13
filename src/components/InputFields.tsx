import Styles from './demo.module.css';
import {
  type UserInputValues,
  type Pattern,
  type Action,
  type Shape,
} from './types';
import { generateColors } from './utils';

export default function InputFields({
  inputValues,
  dispatch,
}: {
  inputValues: UserInputValues;
  dispatch: (arg: Action) => void;
}) {
  const setIsSavingImage = () => {
    dispatch({
      type: 'isSavingImage',
      value: true,
    });
    setTimeout(() => {
      dispatch({
        type: 'isSavingImage',
        value: false,
      });
    }, 1000);
  };

  const handleColorChange = (e: {
    target: { name: string; value: React.SetStateAction<string> };
  }) => {
    dispatch({
      type: 'colors',
      value: { ...colors, [e.target.name]: e.target.value },
    });
  };

  const setRandomColors = () => {
    dispatch({
      type: 'colors',
      value: generateColors(),
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
      value: e.target.value as Shape,
    });
  };
  const handleColorModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'patternMode',
      value: e.target.value as Pattern,
    });
  };

  const handleNameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    dispatch({
      type: 'name',
      value: e.target.value.toString(),
    });
  };

  const handleShowGridLines = () => {
    dispatch({
      type: 'showGridLines',
      value: !showGridLines,
    });
  };

  const handleShowBanner = () => {
    dispatch({
      type: 'showBanner',
      value: !showBanner,
    });
  };

  const {
    colors,
    patternMode,
    showGridLines,
    size,
    artMode,
    showBanner,
    isSavingImage,
  } = inputValues;

  const labels = {
    bgColor: 'Background',
    fromColor: 'Primary',
    toColor: 'Secondary',
  };

  return (
    <>
      <div className={Styles.controlPanelCss}>
        <div className={Styles.rowCss}>
          <label htmlFor='name'>{showBanner ? 'Name' : 'Seed'}</label>{' '}
          <input
            type='text'
            name='name'
            onChange={handleNameChange}
            placeholder={showBanner ? 'Enter  your name' : 'Enter a seed value'}
            className={Styles.inputCss}
            maxLength={14}
          />
        </div>
        <h2 className={Styles.sectionCss}>Colors</h2>
        {(['bgColor', 'fromColor', 'toColor'] as const).map((color) => {
          return (
            <div className={Styles.rowCss} key={color}>
              <label htmlFor={color}>{labels[color]}</label>
              <input
                type='color'
                value={colors[color]}
                onChange={handleColorChange}
                name={color}
                id={color}
                className={Styles.inputColorCss}
              />
            </div>
          );
        })}

        <button className={Styles.buttonCss} onClick={() => setRandomColors()}>
          Randomize{' '}
          <span role='img' aria-label='color palette'>
            🎨
          </span>
        </button>

        <h2 className={Styles.sectionCss}>Pattern</h2>
        <fieldset>
          <legend>🌈 Color Distribution</legend>

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

        <h2 className={Styles.sectionCss}>Additional Settings</h2>

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
            checked={showGridLines}
            onChange={handleShowGridLines}
          />
          <label htmlFor='grid'>Show Grid Lines</label>
        </div>
        <div>
          <input
            type='checkbox'
            id='grid'
            name='grid'
            checked={showBanner}
            onChange={handleShowBanner}
          />
          <label htmlFor='grid'>Show Banner</label>
        </div>
        <button
          className={Styles.buttonCss}
          disabled={isSavingImage}
          onClick={() => setIsSavingImage()}
        >
          Save{' '}
          <span role='img' aria-label='canvas'>
            🖼️
          </span>
        </button>
      </div>
    </>
  );
}
