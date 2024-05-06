import { useRouter } from 'next/router';
import { FiChevronLeft, FiX } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
import styled from 'styled-components';

import Button from '@components/Button';
import Image from '@components/Image';
import Search from '@components/Search';
import Typography from '@components/Typography';

import useModal from '../../hooks/useModal';

const Component = ({
  isBack,
  isLogo,
  title,
  isSearch,
  isClose,
  isMenu,
  searchName,
}) => {
  const { open, close, ModalWrapper } = useModal();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push('/');
  };

  const MENUS = [
    {
      label: '홈',
      link: '/',
    },
    {
      label: '카테고리',
      link: '/category',
    },
    {
      label: '즐겨찾기',
      link: '/',
    },
    {
      label: '마이페이지',
      link: '/',
    },
  ];

  return (
    <Wrapper>
      <Flex>
        <LeftSection>
          <LeftSectionFlex>
            {isLogo && (
              <ImageWrapper>
                <Image
                  src={'/images/logo.svg'}
                  width={63}
                  height={21}
                  alt={'logo'}
                  onClick={handleHome}
                />
              </ImageWrapper>
            )}
            {isBack && (
              <IconWrapper onClick={handleBack}>
                <FiChevronLeft size={24} />
              </IconWrapper>
            )}
            {title && <Title>{title}</Title>}
            {isSearch && <Search name={searchName} />}
          </LeftSectionFlex>
        </LeftSection>
        <RightSection>
          {isClose && (
            <IconWrapper>
              <FiX size={24} />
            </IconWrapper>
          )}
          {isMenu && (
            <IconWrapper onClick={open}>
              <RxHamburgerMenu size={24} />
            </IconWrapper>
          )}
        </RightSection>
      </Flex>
      <ModalWrapper
        title={
          <ModalTitle>
            <ImageWrapper>
              <Image
                src={'/images/logo.svg'}
                width={63}
                height={21}
                alt={'logo'}
              />
            </ImageWrapper>
            <IconWrapper onClick={close}>
              <FiX size={24} />
            </IconWrapper>
          </ModalTitle>
        }
        content={
          <div>
            {/* <ButtonWrapper>
              <Button
                label="로그인"
                appearance="primary"
                onClick={() => {
                  router.push('/login');
                  close();
                }}
              />
            </ButtonWrapper> */}
            <UserWrapper>
              <TypoSPrimary>반갑습니다!</TypoSPrimary>
              <UserName>
                의정부 불주먹<TypoL>님</TypoL>
              </UserName>
            </UserWrapper>
            <Menus>
              {MENUS.map(item => (
                <MenuItem
                  onClick={() => {
                    router.push(item.link);
                    close();
                  }}
                  key={item.label}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menus>
          </div>
        }
        isFull
      />
    </Wrapper>
  );
};

export default Component;
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 8px 16px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral[300]}`};
  height: 56px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const RightSection = styled.div`
  width: 24px;
  height: 24px;
`;
const LeftSection = styled.div`
  width: 100%;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  padding: 1px 0;
`;

const LeftSectionFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
`;

const Title = styled(Typography).attrs({
  variant: 'l',
  fontWeight: 'bold',
})``;
const ImageWrapper = styled.div`
  cursor: pointer;
`;

const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MenuItem = styled(Typography).attrs({
  variant: 'm',
  fontWeight: 'regular',
})`
  padding: 16px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.neutral[200]}`};
  cursor: pointer;
`;
const Menus = styled.div`
  padding: 0 16px;
`;
const ButtonWrapper = styled.div`
  padding: 20px 16px;
`;

const UserWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  padding: 11px 16px;
  margin-bottom: 20px;
`;

const TypoL = styled(Typography).attrs({
  variant: 'l',
  fontWeight: 'regular',
  component: 'span',
})``;

const TypoSPrimary = styled(Typography).attrs({
  variant: 's',
  fontWeight: 'regular',
  component: 'span',
})`
  color: ${({ theme }) => theme.colors.primary[300]};
`;

const UserName = styled(Typography).attrs({
  variant: 'l',
  fontWeight: 'bold',
})``;
