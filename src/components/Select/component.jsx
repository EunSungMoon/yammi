import { Controller, get, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import SelectBox from './Select';
import Typography from '../Typography';

const Component = ({
  name,
  options = [],
  defaultValue,
  handleClick,
  onValueChange,
  width = '',
  ...props
}) => {
  const { control, formState } = useFormContext();
  const dv = get(
    control._defaultValues,
    name,
    typeof defaultValue !== 'undefined' ? defaultValue : '',
  );

  const errors = get(formState.errors, name);

  return (
    <Wrapper $width={width}>
      <Controller
        control={control}
        name={name}
        defaultValue={dv}
        render={({ field: { onChange, value } }) => {
          return (
            <SelectBox
              name={name}
              options={options}
              onChange={async e => {
                let val = e.value;
                onChange(val);
                if (handleClick) {
                  handleClick(val);
                }

                if (onValueChange) {
                  await onValueChange(val);
                }
              }}
              value={
                value != undefined
                  ? options && options.find(c => c.value === value)
                  : null
              }
              defaultValue={dv}
              {...props}
            />
          );
        }}
      />
      {errors && <ErrMsg isSmall>{errors.message}</ErrMsg>}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  width: ${({ $width }) => ($width ? $width : 'auto')};
`;

const ErrMsg = styled(Typography).attrs({
  variant: 'xs',
  fontWeight: 'regular',
  component: 'div',
})`
  display: inline-block;
  margin-top: 4px;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.red[400]};
`;
