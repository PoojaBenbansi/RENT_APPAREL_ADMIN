import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const SimpleInput = (props) => {
  const { value, name, type, handleChange, fullWidth, placeholder, startIcon, label, readOnly = true } = props;
  const classes = useStyles();

  return (
    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth={fullWidth || true}>
      <TextField
        variant="outlined"
        id={`outlined-adornment-${name}`}
        type={type}
        value={value}
        readOnly={readOnly}
        startAdornment={startIcon && <InputAdornment position="start">{startIcon}</InputAdornment>}
        onChange={handleChange}
        name={name}
        fullWidth={true}
        multiline={true}
        label={label}
        placeholder={placeholder}
      />
    </FormControl>
  );
};
