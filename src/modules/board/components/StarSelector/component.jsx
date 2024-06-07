import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';

const Component = ({ name }) => {
  const { control, setValue, watch } = useFormContext();
  const value = watch(name);
  const [starIndex, setStarIndex] = useState({
    over: -1,
    click: -1,
  });

  const handleStarLeave = e => {
    if (!starIndex.click) {
      setStarIndex({ over: -1, click: -1 });
      setValue(name, 0);
    }
  };

  useEffect(() => {
    if (value === 0) {
      setStarIndex({
        over: -1,
        click: -1,
      });
    }
  }, [value]);

  return (
    <Controller
      name={name}
      control={control}
      render={() => {
        return (
          <StarRating onMouseLeave={handleStarLeave}>
            <StarWrapper>
              {Array.from({ length: 5 }, (_, index) => {
                const handleStarEnter = e => {
                  setStarIndex({ over: index, click: 0 });
                };
                const handleStarClick = e => {
                  setStarIndex({ over: index, click: index });
                  setValue(name, index + 1);
                };
                return (
                  <Star
                    key={index + 1}
                    onClick={handleStarClick}
                    onMouseEnter={handleStarEnter}
                    isFilled={index <= starIndex.over}
                  />
                );
              })}
            </StarWrapper>
          </StarRating>
        );
      }}
    />
  );
};
export default Component;

const StarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
`;
const StarRating = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;
const Star = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  cursor: pointer;
  background: ${({ isFilled }) =>
    isFilled
      ? css`url('/images/star_filled.svg')`
      : css`url('/images/star_filled_gray.svg')`};

  :hover {
    background: url('/images/star_filled.svg');
  }
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
`;
