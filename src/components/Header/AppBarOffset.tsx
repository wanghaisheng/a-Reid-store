import { styled, Theme } from '@mui/material/styles';

const AppBarOffsetDiv = styled('div')(({ theme }: { theme: Theme }) => ({
  marginTop: theme.mixins?.toolbar.minHeight,
}));

const AppBarOffset = () => {
  return <AppBarOffsetDiv />;
};

export default AppBarOffset;
