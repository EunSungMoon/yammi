import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select, { components } from 'react-select';
import styled, { useTheme } from 'styled-components';

import ClearIndicator from './_clearIndicator';
import Indicator from './_indicator';
// import { CheckboxOrigin as Checkbox } from '../Checkbox';

const SelectBox = ({
  options = [],
  name,
  placeholder = '옵션을 선택하세요',
  disabled = false,
  handleKeyDown,
  defaultValue,
  isMulti = false,
  closeMenuOnSelect = true,
  hasCheckOption = false,

  hasEmptyValue = false,
  menuPlacement = 'auto',
  ...props
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const form = useFormContext();
  const watch = form.watch(name);
  const defaultValueIndexArr = [];

  if (isMulti && defaultValue?.length) {
    for (const value of defaultValue) {
      const index = options.findIndex(item => item.value === value);
      if (index !== -1) {
        defaultValueIndexArr.push(options[index]);
      }
    }
  }

  // isMulti일 때 value 값이 비면, 새로운 값으로 리렌더링하기 위한 로직
  const currentValue = [];
  if (isMulti && watch?.length) {
    for (const value of watch) {
      const index = options.findIndex(item => item.value === value);
      if (index !== -1) {
        currentValue.push(options[index]);
      }
    }
  }

  // select 화살표 아이콘
  const DropdownIndicator = () => {
    return (
      <ImageBox>
        <Indicator colored={disabled} rotated={open} />
      </ImageBox>
    );
  };

  // select multi인 경우 clearAll 해주는 버튼 아이콘
  const ClearIndicatorComponent = props => {
    const { innerProps } = props;
    return (
      <ImageBox ref={innerProps.ref} {...innerProps}>
        <ClearIndicator />
      </ImageBox>
    );
  };

  // checkbox가 포함된 옵션 컴포넌트
  // const CheckOptionComponent = props => {
  //   const { data, isSelected, selectProps } = props;
  //   return (
  //     components.Option && (
  //       <components.Option {...props}>
  //         <Checkbox
  //           id={data.label}
  //           name={data.label}
  //           checkValue={isSelected}
  //           disabled={data.isDisabled}
  //           label={data.label}
  //           {...selectProps}
  //         />
  //       </components.Option>
  //     )
  //   );
  // };

  const MultipleCheckBoxOption = props => {
    const { data, isSelected, selectProps } = props;
    return <components.Option {...props} />;
  };

  const customStyles = {
    option: (styles, state) => ({
      ...styles,
      padding: '8px 12px',
      background: theme.colors.neutral[0],
      color: state.isSelected
        ? theme.colors.neutral[900]
        : state.isDisabled
          ? theme.colors.neutral[500]
          : theme.colors.neutral[700],

      ':hover': {
        background: theme.colors.neutral[50],
        color: theme.colors.neutral[600],
      },
      cursor: state.isDisabled ? 'default' : 'pointer',
    }),
    container: styles => ({
      ...styles,
      outlineStyle: 'none',
      color: theme.colors.neutral[700],
      fontFamily: 'Noto Sans KR',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '16px',
      letterSpacing: '-0.05em',
      cursor: 'pointer',
    }),

    control: (styles, state) => ({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '11px 0 11px 4px',
      background: state.isDisabled
        ? theme.colors.neutral[200]
        : state.isFocused
          ? theme.colors.neutral[0]
          : theme.colors.neutral[20],
      color: state.isDisabled
        ? theme.colors.neutral[500]
        : theme.colors.neutral[900],
      border: state.isFocused
        ? `1px solid ${theme.colors.blue[400]}`
        : state.isDisabled
          ? `1px solid ${theme.colors.neutral[300]}`
          : `1px solid ${theme.colors.neutral[400]}`,
      borderRadius: '6px',

      ':hover': {
        ...styles[':hover'],
        background: state.isFocused
          ? theme.colors.neutral[0]
          : theme.colors.neutral[50],
      },
      ':focus': {
        ...styles[':focus'],
        border: `1px solid ${theme.colors.blue[400]}`,
        background: theme.colors.neutral[0],
        outline: 'none',
      },

      height: '50px',
    }),
    menu: styles => ({
      ...styles,
      zIndex: 10,
      animation: 'fadeIn 0.2s ease-in-out',
      fontSize: '16px',
    }),
    menuPortal: styles => ({
      ...styles,
      outlineStyle: 'none',
    }),
    groupHeading: styles => ({
      ...styles,
      fontFamily: 'Noto Sans KR',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '16px',
      color: theme.colors.neutral[80],
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    placeholder: (styles, state) => ({
      ...styles,
      color: state.isDisabled
        ? theme.colors.neutral[500]
        : theme.colors.neutral[300],
      fontSize: '16px',
      fontFamily: 'inherit',
      fontWeight: 400,
      lineHeight: '1.5',

      ':hover': {
        ...styles[':hover'],
        color: theme.colors.neutral[600],
      },
    }),
    singleValue: styles => ({
      ...styles,
      color: disabled && defaultValue ? theme.colors.neutral[700] : 'inherit',
      fontSize: '16px',
      fontFamily: 'inherit',
      fontWeight: 400,
      lineHeight: '1.5',
    }),

    multiValue: styles => ({
      ...styles,
      backgroundColor: theme.colors.neutral[40],
      padding: '2px 6px',
    }),

    multiValueLabel: styles => ({
      ...styles,
      color: theme.colors.neutral[700],
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '16px',
      letterSpacing: '-0.05em',
      padding: 0,
      paddingLeft: 0,
    }),
    multiValueRemove: styles => ({
      ...styles,
      paddingRight: 0,
      color: theme.colors.neutral[700],
      ':hover': {
        backgroundColor: 'inherit',
      },
      cursor: 'pointer',
    }),
  };

  return (
    <Wrapper>
      <StyledSelect
        id={name}
        components={{
          DropdownIndicator: () => <DropdownIndicator />,
          ClearIndicator: props => <ClearIndicatorComponent {...props} />,
          // Option: props =>
          //   hasCheckOption ? (
          //     <CheckOptionComponent {...props} />
          //   ) : (
          //     <MultipleCheckBoxOption {...props} />
          //   ),
        }}
        instanceId={name}
        onMenuOpen={() => setOpen(true)}
        onMenuClose={() => setOpen(false)}
        placeholder={placeholder}
        styles={customStyles}
        options={options}
        isSearchable={false}
        isDisabled={disabled}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? '데이터가 없습니다.' : 'No results found'
        }
        menuPlacement={menuPlacement}
        onKeyDown={handleKeyDown}
        isMulti={isMulti || hasCheckOption}
        hideSelectedOptions={false}
        isClearable={isMulti || hasCheckOption}
        closeMenuOnSelect={closeMenuOnSelect}
        {...props}
        defaultValue={defaultValueIndexArr}
        {...(isMulti && hasEmptyValue ? { value: currentValue } : {})}
      />
    </Wrapper>
  );
};

export default SelectBox;

const Wrapper = styled.div``;

const StyledSelect = styled(Select)`
  font-size: 12px;
  line-height: 18px;
`;

const ImageBox = styled.div`
  padding: 0px 12px 0px 0px;
  cursor: pointer;
`;
