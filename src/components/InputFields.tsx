import Styles from './demo.module.css';
import { type UserInputValues, type Pattern, type Action } from './types';

export default function InputFields({
  inputValues,
  dispatch,
  setIsSavingImage,
}: {
  inputValues: UserInputValues;
  dispatch: (arg: Action) => void;
  setIsSavingImage: () => void;
}) {
  const handleColorChange = (e: {
    target: { name: string; value: React.SetStateAction<string> };
  }) => {
    dispatch({
      type: 'colors',
      value: { ...colors, [e.target.name]: e.target.value },
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
      value: e.target.value as 'rounded' | 'squared',
    });
  };
  const handleColorModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'patternMode',
      value: e.target.value as Pattern,
    });
  };

  const handleShowGrid = () => {
    dispatch({
      type: 'showGrid',
      value: !showGrid,
    });
  };

  const { colors, patternMode, showGrid, size, artMode } = inputValues;

  const labels = {
    bgColor: 'Background',
    fromColor: 'Primary',
    toColor: 'Secondary',
  };

  return (
    <>
      <div className={Styles.controlPanelCss}>
        {(['bgColor', 'fromColor', 'toColor'] as const).map((color) => {
          return (
            <div className={Styles.columnCss} key={color}>
              <label htmlFor={color}>{labels[color]}</label>
              <input
                type='color'
                value={colors[color]}
                onChange={handleColorChange}
                name={color}
                id={color}
              />
            </div>
          );
        })}

        <fieldset>
          <legend>🌈 Color Mode</legend>

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
            checked={showGrid}
            onChange={handleShowGrid}
          />
          <label htmlFor='grid'>Show Grid</label>
        </div>
        <button className={Styles.buttonCss} onClick={() => setIsSavingImage()}>
          Save Image 🖼️
        </button>
      </div>
    </>
  );
}
