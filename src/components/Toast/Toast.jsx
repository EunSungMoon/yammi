'use strict';

import { useContext } from 'react';
import { AiOutlineExclamation } from 'react-icons/ai';
import { FiCheck } from 'react-icons/fi';
import styled, { css, useTheme } from 'styled-components';

import ErrorIcon from './Icon/ErrorIcon';
import InfoIcon from './Icon/InfoIcon';
import WarningIcon from './Icon/WarningIcon';
import { ToastContext } from './ToastContext';
import {
  getAppearanceWrapperStyle,
  getPlacementTransform,
} from './toastStyles';
import Icon from '../Icon';
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

  const renderIcon = () => {
    switch (parameters?.appearance) {
      case 'success':
        return (
          <Icon
            reactIconSrc={<InfoIcon color={theme.colors.neutral[0]} />}
          ></Icon>
        );

      case 'error':
        return (
          <Icon
            reactIconSrc={<ErrorIcon color={theme.colors.neutral[0]} />}
          ></Icon>
        );
      case 'warn':
        return (
          <Icon
            reactIconSrc={<WarningIcon color={theme.colors.neutral[0]} />}
          ></Icon>
        );

      default:
        return (
          <Icon
            reactIconSrc={<InfoIcon color={theme.colors.neutral[0]} />}
          ></Icon>
        );
    }
  };

  return (
    <Wrapper
      transitionStatus={transitionStatus}
      placement={placement}
      transitionDuration={parameters?.transitionDuration || transitionDuration}
      appearance={parameters?.appearance}
      isColored={isColored}
    >
      <ContentWrapper>
        <Flex appearance={parameters?.appearance}>
          {renderIcon()}
          <Title>{parameters?.title}</Title>
        </Flex>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Toast;

const Wrapper = styled.div`
  display: flex;
  width: 343px;
  border-radius: 4px;
  position: relative;
  align-items: center;
  overflow: hidden;
  box-shadow: 0px 3px 18px rgba(0, 0, 0, 0.1);
  transition: transform ${({ transitionDuration }) => transitionDuration}ms
    cubic-bezier(0.2, 0, 0, 1);
  background-color: ${({ theme }) => theme.colors.neutral[0]};
  color: ${({ theme }) => theme.colors.neutral[900]};
  margin: 0 auto;
  ${({ placement, transitionStatus }) =>
    getPlacementTransform(placement, transitionStatus)};

  @media screen and (max-width: 720px) {
    width: 334px;
  }

  & + & {
    margin-top: 32px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 16px;
  ${({ appearance }) => getAppearanceWrapperStyle(appearance)};
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 16px 0;
`;

const Title = styled(Typography).attrs({
  type: 'text',
  fontWeight: 'regular',
  size: 'm',
})`
  display: flex;
  align-items: center;
`;
