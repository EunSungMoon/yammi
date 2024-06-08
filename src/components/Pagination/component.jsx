import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styled from 'styled-components';

import Button from '../Button';
import Typography from '../Typography';

const Component = ({
  total,
  offset,
  limit,
  setPage,
  align = 'center',
  type = 'page',
}) => {
  const router = useRouter();
  const defaultSetPage = page => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        limit,
        offset: (page - 1) * limit,
      },
    });
  };

  const lastPage = useMemo(() => Math.floor(total / limit) + 1, [total, limit]);
  const currentPage = useMemo(() => Math.floor(offset / limit) + 1);
  const _setPage = setPage || defaultSetPage;

  const renderPage = (page, isCurrent, render) => {
    return (
      <Page isCurrent={isCurrent} onClick={() => _setPage(page)} key={page}>
        {render || <PageLabel isCurrent={isCurrent}>{page}</PageLabel>}
      </Page>
    );
  };

  const renderPages = useCallback(() => {
    const pages = [];
    let startPos = currentPage - 2;
    if (startPos < 1) {
      startPos = 1;
    }

    if (currentPage > 1) {
      for (let i = startPos; i < currentPage; i++) {
        pages.push(renderPage(i));
      }
    }

    pages.push(renderPage(currentPage, true));

    let endPos = currentPage + (5 - pages.length);
    if (endPos > lastPage) {
      endPos = lastPage;
    }

    for (let i = currentPage + 1; i <= endPos; i++) {
      pages.push(renderPage(i));
    }

    return pages;
  }, [currentPage, lastPage]);

  if (!total) {
    return null;
  }

  return (
    <Wrapper align={align}>
      {type === 'page' && (
        <Pages>
          {currentPage > 1 &&
            renderPage(currentPage - 1, false, <FiChevronLeft />)}
          {renderPages()}
          {currentPage < lastPage &&
            renderPage(currentPage + 1, false, <FiChevronRight />)}
        </Pages>
      )}
      {type === 'button' && (
        <ButtonWrapper>
          <StyledButton
            label={<ButtonLabel>{'〈 prev'}</ButtonLabel>}
            appearance="subtle"
          />
          <StyledButton label={'next 〉'} appearance="subtle" />
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

const alignToJustifyContent = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
};
const Wrapper = styled.div`
  display: flex;
  justify-content: ${({ align }) => alignToJustifyContent[align]};
`;

const Pages = styled.div`
  display: flex;
`;

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 32px;
  height: 32px;
  gap: 8px;

  border-radius: 8px;
  background-color: ${({ theme, isCurrent }) =>
    isCurrent ? theme.colors.primary[300] : theme.colors.neutral[0]};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[700]};
    &,
    & > span {
      color: ${({ theme }) => theme.colors.neutral[0]};
    }
  }
`;

const PageLabel = styled(Typography).attrs({
  type: 'text',
  fontWeight: 'regular',
  size: 'm',
  component: 'span',
})`
  color: ${({ theme, isCurrent }) =>
    isCurrent ? theme.colors.neutral[0] : theme.colors.neutral[900]};
`;

const ButtonWrapper = styled.div`
  & > *:first-child {
    margin-right: 8px;
  }
`;

const ButtonLabel = styled(Typography).attrs({
  type: 'text',
  fontWeight: 'regular',
  size: 'm',
  component: 'span',
})`
  color: ${({ theme }) => theme.colors.neutral[900]};
`;

const StyledButton = styled(Button)`
  border: none;
`;

Component.propTypes = {
  align: PropTypes.oneOf(['center', 'left', 'right']),
  total: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  setPage: PropTypes.func,
  type: PropTypes.string,
};

export default Component;
