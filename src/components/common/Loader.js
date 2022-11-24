import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

export default function Loader({ isLoading }) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{ zIndex: 999 }} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
