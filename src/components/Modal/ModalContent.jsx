import styled, { css } from 'styled-components';

import Button from '../Button';
import Image from '../Image';
import Typography from '../Typography';

const Component = ({
  title,
  content,
  buttons,
  children,
  back,
  closeButton,
  noPadding = false,
  titlePadding = false,
  isFull,
}) => {
  return (
    <Wrapper>
      <TitleWrapper $titlePadding={titlePadding}>
        {back && (
          <LeftIconWrapper onClick={back.backEvent}>
            <Image
              src={'/images/common/middle-arrow_left.png'}
              width={16}
              height={16}
              alt={''}
            />
          </LeftIconWrapper>
        )}
        {title && (
          <Title>
            <H6Typo>{title}</H6Typo>
          </Title>
        )}
        {closeButton && (
          <IconWrapper onClick={closeButton}>
            <Image
              src={'/images/common/close_gray_icon.png'}
              width={16}
              height={16}
              alt={''}
            />
          </IconWrapper>
        )}
      </TitleWrapper>
      {children}
      {content && (
        <Content $noPadding={noPadding} isFull={isFull}>
          {typeof content === 'string' ? (
            <ContentLabel>{content}</ContentLabel>
          ) : (
            <>{content}</>
          )}
        </Content>
      )}

      {buttons.length > 0 && (
        <BottomSection>
          <BtnSection>
            {buttons.map(button => (
              <Button
                key={button.label}
                borderRadius="40px"
                height="40px"
                minWidth="120"
                {...button}
              />
            ))}
          </BtnSection>
        </BottomSection>
      )}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div``;

const Title = styled(Typography).attrs({ variant: 'h1' })`
  text-align: center;
  width: 100%;
`;

const Content = styled.div`
  margin-top: ${({ $noPadding }) => ($noPadding ? '0' : '24px')};
  padding: ${({ $noPadding }) => ($noPadding ? '0' : '0 24px')};
  ${({ isFull }) => {
    if (isFull) {
      return css`
        padding: 0;
        margin: 0;
        border-top: ${({ theme }) => `1px solid ${theme.colors.neutral[300]}`};
      `;
    }
  }}
`;

const ContentLabel = styled(Typography).attrs({ variant: 'h400' })`
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
  padding-bottom: 20px;
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

  & {
    button + button {
      margin-left: 12px;
    }
  }
`;

const H6Typo = styled(Typography).attrs({
  variant: 'h1',
  isLongForm: true,
})``;

const TitleWrapper = styled.div`
  position: relative;
  padding: ${({ $titlePadding }) =>
    $titlePadding ? '20px 24px 12px' : '14px 16px'};
  height: 56px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 24px;
  right: 24px;
`;
const LeftIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 24px;
  left: 24px;
`;
