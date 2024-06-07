import { useState } from 'react';
import styled, { css } from 'styled-components';

import Chip from '../Chip';

const Component = ({ options, defaultValue, onClick }) => {
  const [target, setTarget] = useState(defaultValue);
  return (
    <Wrapper>
      {options.map(item => (
        <Chip
          key={item.value}
          label={item.label}
          value={item.value}
          onClick={() => {
            setTarget(item.value);
            onClick(item.value);
          }}
          appearance={target === item.value && 'primary'}
        />
      ))}
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
