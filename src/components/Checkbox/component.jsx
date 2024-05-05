import { useCallback } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import Checkbox from './Checkbox';
import Typography from '../Typography';

const Component = ({
  name,
  defaultValue,
  indeterminateValue,
  checkStyle = 'default',
  className,
  ...rest
}) => {
  const { control, formState } = useFormContext();
  const error = get(formState.errors, name);
  const checkedDefaultValue = get(
    control._defaultValues,
    name,
    typeof defaultValue !== 'undefined' ? !!defaultValue : false,
  );

  const onClickCheckBox = useCallback(
    value => {
      onChange(!value);
    },
    [value],
  );

  return (
    <Wrapper className={className}>
      <Controller
        control={control}
        name={name}
        defaultValue={checkedDefaultValue}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <Checkbox
                id={name}
                name={name}
                label={label}
                onChange={() => onClickCheckBox(value)}
                checkValue={value}
                indeterminateValue={indeterminateValue}
                checkStyle={checkStyle}
                {...rest}
              />
              {error && (
                <ErrorBox>
                  <ErrorMsg role="alert">{error.message}</ErrorMsg>
                </ErrorBox>
              )}
            </>
          );
        }}
      ></Controller>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div``;

const HeaderLabel = styled(Typography).attrs({
  variant: 'h200',
  component: 'div',
})`
  color: ${({ theme }) => theme.colors.neutral[200]};
`;

const ErrorBox = styled.div`
  margin-top: 4px;
`;

const ErrorMsg = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.red[400]};
`;
