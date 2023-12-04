import * as React from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

const RadioInput = ({ title, options, ...props }) => {
  return (
    <FormControl>
      <FormLabel
        id="demo-row-radio-buttons-group-label"
        style={{ fontWeight: 500, color: "#222" }}
      >
        {title}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        {...props}
      >
        {options?.map(v => (
          <FormControlLabel
            value={v.value}
            control={<Radio />}
            label={v.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
export default RadioInput
