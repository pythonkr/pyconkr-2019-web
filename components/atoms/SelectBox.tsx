import styled from '@emotion/styled'
import _ from 'lodash'
import React from 'react'

const SelectBoxStyles = styled.select`
    margin: 5px 0 29px 0;
    width: 80%;
    height: 54px;
    border-radius: 4px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.07);
    border: solid 1px #ced3d6;
    background-color: #f8fafb;
    font-size: 14px;
    padding: 5px 21px;
`

type PropsType = {
    options: {
        value: string;
        text: string;
    }[];
    selectedValue?: string;
    onChange(value: string): void;
}
export const SelectBox: React.SFC<PropsType>  = (props) => {
    const { options, onChange, selectedValue } = props

    return (
        <SelectBoxStyles
          onBlur={e => onChange(e.target.value)}
          onChange={e => onChange(e.target.value)}
          aria-required={true}
          required
          value={selectedValue}
        >
            {options.map(option => {
                return (
                    <option
                        key={option.text}
                        value={option.value}
                        aria-selected={false}
                    >
                        {option.text}
                    </option>
                )
            })}
        </SelectBoxStyles>
    )
}
