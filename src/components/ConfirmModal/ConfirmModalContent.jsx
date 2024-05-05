import styled from 'styled-components';

import Typography from '../Typography';

const Component = ({ content, buttons, children }) => {
  return (
    <Wrapper>
      {content && (
        <Content>
          {typeof content === 'string' ? (
            <ContentLabel>{content}</ContentLabel>
          ) : (
            <>{content}</>
          )}
        </Content>
      )}

      {children}

      {buttons.length > 0 && (
        <BottomSection>
          <BtnSection>
            {buttons.map(button => (
              <CustomButton key={button.label} onClick={button.onClick}>
                <ButtonLabel>{button.label}</ButtonLabel>
              </CustomButton>
            ))}
          </BtnSection>
        </BottomSection>
      )}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div``;

const Content = styled.div`
  padding: 24px 24px 0;
`;

const ContentLabel = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'regular',
})`
  font-weight: 400;
  text-align: center;
`;

const BottomSection = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 32px;
  border-top: ${({ theme }) => `1px solid ${theme.colors.neutral[200]}`};

  @media screen and (max-width: 720px) {
    margin-top: 32px;
  }
`;

const BtnSection = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;

  button:nth-child(odd) {
    border-right: ${({ theme }) => `1px solid ${theme.colors.neutral[200]}`};
  }
`;

const CustomButton = styled.button`
  border: none;
  background: none;
  padding: 13px;
  width: 50%;
  cursor: pointer;
`;

const ButtonLabel = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'bold',
})`
  color: ${({ theme }) => theme.colors.neutral[700]};
`;
