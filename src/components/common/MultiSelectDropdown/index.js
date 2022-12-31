import React from 'react';
import Select from 'react-select';
import { components } from "react-select";

const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };



export const  MultiSelectDropdown = ({name, placeholder, options, selectedOption, setSelectedOption}) => {

  return (
      <Select
        isMulti
        name={name}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder={placeholder}
        components={{
            Option
        }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        allowSelectAll={true}
        isSearchable={true}
      />
  );
}