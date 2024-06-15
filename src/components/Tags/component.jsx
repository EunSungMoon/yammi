import { FiX } from 'react-icons/fi';
import styled from 'styled-components';

import Icon from '../Icon';
import Typography from '../Typography';

const Component = ({ list, onClick, handleDelete }) => {
  return (
    <Wrapper>
      {list.map(item => (
        <Tag key={item}>
          <TagLabel onClick={() => onClick(item)}>{item}</TagLabel>
          <Icon
            reactIconSrc={<FiX size={16} />}
            onClick={() => handleDelete(item)}
          />
        </Tag>
      ))}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-flow: row wrap;
  cursor: pointer;
`;
const Tag = styled.div`
  padding: 5px 8px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.primary[50]};
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.neutral[900]};
`;
const TagLabel = styled(Typography).attrs({
  type: 'text',
  fontWeight: 'regular',
  size: '',
})``;
