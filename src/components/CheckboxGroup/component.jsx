import { Controller, get, useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';

import { CheckboxOrigin } from '../Checkbox';
import Typography from '../Typography';

const Component = ({
  name,
  items = [],
  defaultValue,
  checkboxRatio,
  itemMargin = '',
  itemPadding,
}) => {
  const { control, formState } = useFormContext();
  const error = get(formState.errors, name);
  const checkedDefaultValue = get(
    control._defaultValues,
    name,
    typeof defaultValue !== 'undefined' ? !!defaultValue : [],
  );

  return (
    <Wrapper>
      <Controller
        control={control}
        name={name}
        defaultValue={checkedDefaultValue}
        render={({ field: { onChange, value = checkedDefaultValue } }) => {
          return (
            <>
              <Checkboxes>
                <CheckboxWrapper checkboxRatio={checkboxRatio}>
                  {items.map(i => (
                    <StyledCheckboxWrapper
                      key={i.value}
                      checkboxRatio={checkboxRatio}
                      $itemMargin={itemMargin}
                      $itemPadding={itemPadding}
                    >
                      <StyledCheckbox
                        id={i.value}
                        label={i.label}
                        name={`${name}.${i.label}`}
                        onChange={e => {
                          if (e.target.checked) {
                            onChange([...value, i.value]);
                          } else {
                            onChange(value.filter(v => v !== i.value));
                          }
                        }}
                        checkValue={value?.includes(i.value)}
                        disabled={i.disabled}
                      />
                    </StyledCheckboxWrapper>
                  ))}
                </CheckboxWrapper>
              </Checkboxes>
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

const Checkboxes = styled.div`
  display: flex;
  width: 100%;
`;

const CheckboxWrapper = styled.div`
  ${({ checkboxRatio }) =>
    checkboxRatio &&
    css`
      display: flex;
      flex-flow: row wrap;
    `}
  width:100%;
`;

const StyledCheckboxWrapper = styled.div`
  margin-bottom: 7px;
  ${({ checkboxRatio }) =>
    checkboxRatio
      ? css`
          width: ${checkboxRatio}%;
        `
      : css`
          width: 100%;
        `}

  margin: ${({ $itemMargin }) => $itemMargin && $itemMargin};
  padding: ${({ $itemPadding }) => $itemPadding && $itemPadding};
`;

const StyledCheckbox = styled(CheckboxOrigin)``;

const ErrorBox = styled.div`
  margin-top: 4px;
`;

const ErrorMsg = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'regular',
})`
  color: ${({ theme }) => theme.colors.red[400]};
`;
