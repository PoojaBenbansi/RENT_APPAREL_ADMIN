import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

export const TimePickerField = ({pickerValue}) => {
  const [value, onChange] = useState(pickerValue);

  return console.log(value),(
    <div>
      <TimePicker 
        onChange={onChange} 
        value={value} 
        format={'h:m a'} 
        className={'react-time-picker-field'}
       />
    </div>
  );
}