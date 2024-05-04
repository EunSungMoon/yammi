'use strict';

import { useContext } from 'react';
import { AiOutlineExclamation } from 'react-icons/ai';
import { FiCheck } from 'react-icons/fi';
import styled, { css, useTheme } from 'styled-components';

import { ToastContext } from './ToastContext';
import {
  getAppearanceWrapperStyle,
  getPlacementTransform,
} from './toastStyles';
// import Icon from '../Icon';
import Typography from '../Typography';

/**
 *
 * @param {object} props
 * @param {'success' | 'error' | 'warn' | 'info' | 'info-colored' | 'default'} props.parameters.appearance
 * @returns
 */

const Toast = ({ transitionStatus, dismiss, parameters, isColored, id }) => {
  const { placement, transitionDuration } = useContext(ToastContext);
  const theme = useTheme();

  // const renderIcon = () => {
  //   switch (parameters?.appearance) {
  //     case 'info':
  //       return (
  //         <Icon
  //           marginRight={12}
  //           reactIconSrc={<InfoIcon color={theme.colors.neutral[0]} />}
  //         ></Icon>
  //       );
  //     case 'success':
  //       return (
  //         <Icon
  //           marginRight={12}
  //           reactIconSrc={<CheckIcon color={theme.colors.neutral[0]} />}
  //         ></Icon>
  //       );
  //     case 'error':
  //       return (
  //         <Icon
  //           marginRight={12}
  //           reactIconSrc={<ErrorIcon color={theme.colors.neutral[0]} />}
  //         ></Icon>
  //       );
  //     case 'warn':
  //       return (
  //         <Icon
  //           marginRight={12}
  //           reactIconSrc={<WarningIcon color={theme.colors.neutral[0]} />}
  //         ></Icon>
  //       );
  //     case 'info-colored':
  //       return (
  //         <Icon
  //           marginRight={12}
  //           reactIconSrc={<InfoIcon color={theme.colors.neutral[0]} />}
  //         ></Icon>
  //       );
  //     case 'check':
  //       return (
  //         <Icon
  //           marginRight={12}
  //           reactIconSrc={<CheckIcon color={theme.colors.neutral[0]} />}
  //         ></Icon>
  //       );
  //     default:
  //       return (
  //         <Icon
  //           marginRight={12}
  //           reactIconSrc={<CheckIcon color={theme.colors.neutral[0]} />}
  //         ></Icon>
  //       );
  //   }
  // };

  return (
    <Wrapper
      transitionStatus={transitionStatus}
      placement={placement}
      transitionDuration={parameters?.transitionDuration || transitionDuration}
      appearance={parameters?.appearance}
      isColored={isColored}
    >
      <ContentWrapper>
        <Flex>
          {/* {renderIcon()} */}
          <Title colorInheritance>{parameters?.title}</Title>
        </Flex>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Toast;

const Wrapper = styled.div`
  display: flex;
  width: 600px;
  border-radius: 3px;
  position: relative;
  align-items: center;
  overflow: hidden;
  box-shadow: 0px 3px 18px rgba(0, 0, 0, 0.1);
  transition: transform ${({ transitionDuration }) => transitionDuration}ms
    cubic-bezier(0.2, 0, 0, 1);
  ${({ appearance }) => getAppearanceWrapperStyle(appearance)};
  ${({ placement, transitionStatus }) =>
    getPlacementTransform(placement, transitionStatus)};

  @media screen and (max-width: 720px) {
    width: 334px;
    margin: 0 auto;
  }

  & + & {
    margin-top: 32px;
  }
`;

const Flex = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 24px 16px;
  @media screen and (max-width: 720px) {
    padding: 14px 16px;
  }
`;

const H2Typo = styled(Typography).attrs({
  variant: 'h200',
  component: 'div',
})``;

const Title = styled(H2Typo)`
  display: flex;
  align-items: center;
`;

const CheckIcon = styled(FiCheck).attrs({
  size: 16,
})`
  margin-bottom: 2.5px;
  background-color: ${({ theme }) => theme.colors.green[400]};
  border-radius: 50%;
  padding: 4px;
`;

const InfoIcon = styled(FiCheck).attrs({
  size: 20,
})`
  margin-bottom: 2.5px;
  margin-bottom: 2.5px;
  background-color: ${({ theme }) => theme.colors.blue[400]};
  border-radius: 50%;
  padding: 4px;
`;

const WarningIcon = styled(AiOutlineExclamation).attrs({
  size: 20,
})`
  margin-bottom: 2.5px;
  background-color: ${({ theme }) => theme.colors.yellow[400]};
  border-radius: 50%;
  padding: 4px;
`;

const ErrorIcon = styled(AiOutlineExclamation).attrs({
  size: 20,
})`
  margin-bottom: 2.5px;
  background-color: ${({ theme }) => theme.colors.red[400]};
  border-radius: 50%;
  padding: 4px;
`;
