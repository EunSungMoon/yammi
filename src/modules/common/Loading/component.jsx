import styled from 'styled-components';

import Spinner from '@components/Spinner';
import Typography from '@components/Typography';

import useLockedBody from '../../../hooks/useScrollLock';

const Component = ({}) => {
  const [, setLocked] = useLockedBody(true);

  return (
    <Wrapper>
      <Backdrop />

      <Spinner type={'primary'} center size="200px" />
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  height: 100vh;
  top: 0;
  width: 100%;
  margin: 0 auto;
  max-width: 375px;
  margin: 0 auto;
  z-index: 1000;
`;
const Label = styled(Typography).attrs({
  type: 'text',
  size: 'l',
  fontWeight: 'bold',
})`
  color: ${({ theme }) => theme.colors.neutral[0]};
`;

const Backdrop = styled.div`
  background: rgba(0 0 0);
  opacity: 0.4;
  height: 100vh;
`;
