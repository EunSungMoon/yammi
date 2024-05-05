import styled from 'styled-components';

const ClearIndicator = () => {
  return (
    <Icon>
      <Svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="8" fill="#A5ADBA" />
        <path
          d="M11 5L5 11"
          stroke="#F4F5F7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 5L11 11"
          stroke="#F4F5F7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Icon>
  );
};

export default ClearIndicator;

ClearIndicator.propTypes = {};

const Icon = styled.div`
  display: flex;
  align-items: center;
`;

const Svg = styled.svg``;
