import Styles from './InputFields.module.css';
import {
  type UserInputValues,
  type Pattern,
  type Action,
  type Shape,
} from '../types';
import { generateColors } from '../utils';

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

  const handleIsAnimated = () => {
    dispatch({
      type: 'isAnimated',
      value: !isAnimated,
    });
  };

  const handleShowBanner = () => {
    dispatch({
      type: 'showBanner',
      value: !showBanner,
    });
  };

  const getZoomLevel = (size: number) => {
    return `${Number.parseFloat((size / 45).toString()).toFixed(2)}x`;
  };

  const {
    colors,
    patternMode,
    showGridLines,
    size,
    artMode,
    showBanner,
    isAnimated,
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
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            onChange={handleNameChange}
            placeholder={'Enter  your name'}
            className={Styles.inputCss}
            maxLength={14}
          />
        </div>
        <h2 className={Styles.sectionCss}>Colors</h2>
        {(['bgColor', 'fromColor', 'toColor'] as const).map((color) => {
          return (
            <div className={Styles.colorRowCss} key={color}>
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

          {(['gradient', 'random'] as const).map((mode) => {
            return (
              <div key={mode} className={Styles.radioOptionCss}>
                <input
                  type='radio'
                  id={mode}
                  name='pattern'
                  value={mode}
                  checked={patternMode === mode}
                  onChange={handleColorModeChange}
                />
                <label htmlFor={mode}>{mode}</label>
              </div>
            );
          })}
        </fieldset>
        <fieldset>
          <legend>🎨 Art Mode</legend>

          {(['round', 'square'] as const).map((mode) => {
            return (
              <div key={mode} className={Styles.radioOptionCss}>
                <input
                  type='radio'
                  id={mode}
                  name='artMode'
                  value={mode}
                  checked={artMode === mode}
                  onChange={handleArtModeChange}
                />
                <label htmlFor={mode}>{mode}</label>
              </div>
            );
          })}
        </fieldset>

        <h2 className={Styles.sectionCss}>Additional Settings</h2>

        <div>
          <input
            type='range'
            id='sz'
            name='size'
            min='25'
            max='100'
            value={size}
            step='1'
            onChange={handleSliderChange}
          />
          <label htmlFor='sz'>Size</label> {getZoomLevel(size)}
        </div>
        <div>
          <input
            type='checkbox'
            id='grid'
            name='grid'
            checked={showGridLines}
            onChange={handleShowGridLines}
          />
          <label htmlFor='grid'>Show Grid</label>
        </div>
        <div>
          <input
            type='checkbox'
            id='animation'
            name='animation'
            checked={isAnimated}
            onChange={handleIsAnimated}
          />
          <label htmlFor='animation'>Animate</label>
        </div>
        <div>
          <input
            type='checkbox'
            id='banner'
            name='banner'
            checked={showBanner}
            onChange={handleShowBanner}
          />
          <label htmlFor='banner'>Show Banner</label>
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
