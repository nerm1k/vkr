import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import MuiInput from '@mui/material/Input';

interface Props {
  defaultValue: number;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  onChangeSlider: (event: Event, newValue: number) => void;
}

const Input = styled(MuiInput)`
  width: 42px;
`;

const ParamsSlider = ({ onChangeInput, value, onChangeSlider }: Props) => {
  return (
    <Box sx={{ width: 250, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Slider
        value={value}
        aria-label="Default"
        valueLabelDisplay="off"
        onChange={onChangeSlider}
        min={0}
        max={100}
        step={1}
      />
      <Input
        value={value}
        size="small"
        onChange={onChangeInput}
        inputProps={{
          step: 10,
          min: 0,
          max: 100,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
    </Box>
  );
};

export default ParamsSlider;