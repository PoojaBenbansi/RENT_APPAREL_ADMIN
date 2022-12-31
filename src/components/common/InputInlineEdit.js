import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export const InputInlineEdit = (props) => {
    const { value, 
        name, 
        type, 
        handleChange, 
        saveHandler, 
        resetHandler, 
        fullWidth, 
        placeholder, 
        startIcon, 
        isFieldEditable = true
    } = props;
    const classes = useStyles();
    const [isEditable, setIsEditable] = useState(false);

    const showIsEditableActions = (target) => {
        return <>
         <CheckIcon key={`save_${name}`} onClick={(e) => { saveHandler(target); setIsEditable(false); } }/>
         <ClearIcon className='ml-3' key={`clear_${name}`} onClick={(e) => { resetHandler(target); setIsEditable(false); }}/>
        </>;
    }

    return(
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" fullWidth={fullWidth || true}>
            <Input
                id={`outlined-adornment-${name}`}
                type={type}
                value={value}
                readOnly={isEditable ? false : true}
                startAdornment={startIcon &&
                    <InputAdornment position="start">
                        {startIcon}
                    </InputAdornment>
                }
                endAdornment={
                    isFieldEditable && <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                        >
                            {isEditable ? showIsEditableActions(name) : <CreateIcon key={`edit_${name}`} onClick={(e) => setIsEditable(true)} />}
                        </IconButton>
                    </InputAdornment>
                }
                onChange={handleChange}
                name={name}
                fullWidth={true}
                multiline={true}
                rows={name == 'shop_description' ? 3 : 1}
                placeholder={placeholder}
            />
        </FormControl>
    )
}