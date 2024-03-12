import { Box, Drawer, styled } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { closeDrawer } from '../../app/features/drawerSlice';

export const Container = styled(Box)({
  padding: '4rem',
  width: '390px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',

  '& .cartHeader': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const AsideDrawer = ({ children }: { children: React.ReactNode }) => {
  const { open } = useAppSelector((store) => store.drawer);
  const dispatch = useAppDispatch();

  return (
    <Drawer anchor='right' open={open} onClose={() => dispatch(closeDrawer())}>
      <Container role='presentation'>{children}</Container>
    </Drawer>
  );
};

export default AsideDrawer;
