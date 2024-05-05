import { useMemo } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import 'cleave.js/dist/addons/cleave-phone.kr';

import CleaveInput from './CleaveInput';
import Input from './InputOrigin';
import Typography from '../Typography';

const Component = ({
  name,
  errMsg,
  useController,
  width,
  maxWidth,
  options,
  defaultValue,
  isRequired,
  rules,
  className,
  transform = 'none',
  ...rest
}) => {
  const { control, register, formState } = useFormContext();

  const dv = get(
    control._defaultValues,
    name,
    typeof defaultValue !== 'undefined' ? defaultValue : '',
  );

  const error = get(formState.errors, name);

  const useInputOptions =
    options &&
    !(Object.keys(options).length === 0 && options.constructor === Object);

  const transformer = useMemo(
    () => ({
      number: {
        input: value =>
          isNaN(value) || value === undefined || value === null
            ? undefined
            : value.toString(),
        output: value => {
          const parsedValue = Number(value);
          return value === '' ||
            isNaN(parsedValue) ||
            !Number.isSafeInteger(parsedValue)
            ? 0
            : parsedValue;
        },
      },
      numberWithEmpty: {
        input: value =>
          isNaN(value) || value === undefined || value === null
            ? undefined
            : value.toString(),
        output: value => {
          const parsedValue = Number(value);

          return value === '' ||
            isNaN(parsedValue) ||
            !Number.isSafeInteger(parsedValue)
            ? ''
            : parsedValue;
        },
      },
      float: {
        input: value =>
          isNaN(value) || value === undefined || value === null
            ? undefined
            : value.toString(),
        output: value => {
          const parseValue = parseFloat(value);
          return value === '' || isNaN(parseValue) ? 0 : parseValue;
        },
      },
      none: {
        input: value => value,
        output: value => (value === '' ? undefined : value),
      },
      defaultEmptyString: {
        input: value => value,
        output: value => (value === '' ? '' : value),
      },
    }),
    [],
  );

  const trans = useMemo(
    () => (typeof transform === 'object' ? transform : transformer[transform]),
    [transform],
  );

  const renderComponent = () => {
    if (rest.type === 'hidden') {
      return <input type="hidden" name={name} {...register(name)} />;
    } else {
      if (useController || useInputOptions) {
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={dv}
            rules={rules}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  {useInputOptions ? (
                    <CleaveInput
                      {...rest}
                      options={options}
                      id={name}
                      name={name}
                      hasError={!!error}
                      value={value}
                      onChange={e => {
                        onChange(trans.output(e.target.rawValue));
                      }}
                    />
                  ) : (
                    <Input
                      {...rest}
                      id={name}
                      name={name}
                      value={value}
                      hasError={!!error}
                      onChange={e => {
                        onChange(trans.output(e.target.value));
                      }}
                    />
                  )}
                </>
              );
            }}
          />
        );
      } else {
        return (
          <Input
            {...register(name)}
            id={name}
            name={name}
            hasError={!!error}
            {...rest}
          />
        );
      }
    }
  };

  const renderErrorMsg = () => {
    return (
      <>
        {error && <ErrorMsg>{errMsg ? errMsg : `${error.message}`}</ErrorMsg>}
      </>
    );
  };

  return rest.type === 'hidden' ? (
    renderComponent()
  ) : (
    <>
      <Wrapper className={className} width={width} maxWidth={maxWidth}>
        {renderComponent()}
        {renderErrorMsg()}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: ${({ width }) => (width ? width : '100%')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '100%')};
`;

const ErrorMsg = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'regular',
  component: 'div',
})`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.red[300]};
  white-space: nowrap;
`;

export default Component;
