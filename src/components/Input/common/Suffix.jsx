import styled from 'styled-components';

const Component = ({ children, title }) => (
  <StyledSuffix>
    {title && title}
    {children && children}
  </StyledSuffix>
);

const StyledSuffix = styled.div`
  display: flex;
  padding-left: 8px;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

export default Component;
