import styled from 'styled-components';

const Component = ({ children, title }) => (
  <StyledPrefix>
    {title && title}
    {children && children}
  </StyledPrefix>
);

const StyledPrefix = styled.div`
  display: flex;
  padding-right: 8px;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

export default Component;
