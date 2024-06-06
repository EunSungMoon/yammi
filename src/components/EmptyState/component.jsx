import { FiSmile } from 'react-icons/fi';
import styled, { useTheme } from 'styled-components';

import Button from '@components/Button';

import Icon from '../Icon';
import Typography from '../Typography';

const Component = ({ title, description, buttons, isIcon }) => {
  const theme = useTheme();
  return (
    <Wrapper>
      <IconWrapper>
        {isIcon && (
          <Icon
            reactIconSrc={
              <FiSmile size={44} color={theme.colors.neutral[600]} />
            }
          />
        )}
      </IconWrapper>

      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {buttons?.length > 0 && (
        <ButtonWrapper>
          {buttons.map(item => (
            <Button key={item.label} {...item} />
          ))}
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const IconWrapper = styled.div`
  margin-bottom: 8px;
`;
const Title = styled(Typography).attrs({
  type: 'text',
  fontWeight: 'regular',
  size: 'm',
})`
  margin-bottom: 8px;
`;
const Description = styled(Typography).attrs({
  type: 'text',
  fontWeight: 'regular',
  size: 'xs',
})`
  color: ${({ theme }) => theme.colors.neutral[600]};
  margin-bottom: 8px;
`;
const ButtonWrapper = styled.div`
  margin: 20px 0;
  width: 100%;
`;
