import { styled } from '@mui/material/styles';
import React from 'react';

const StyledFlexBwtween = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlexBetween = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => {
  return <StyledFlexBwtween className={`FlexBetween ${className}`}>{children}</StyledFlexBwtween>;
};

export default FlexBetween;
