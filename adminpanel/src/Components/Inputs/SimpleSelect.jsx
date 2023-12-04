import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { Theme } from "../../Theme"

export default function BasicSelect({
  placeholder,
  value = "",
  onChange = () => {},
  style,
  fullWidth = false,
  options
}) {
  const [age, setAge] = React.useState("")

  const handleChange = event => {
    const {
      target: { value }
    } = event
    onChange(
      // On autofill we get a stringified value.
      value
    )
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        style={{
          minWidth: 150,
          backgroundColor: Theme.bg.dialogBg,
          borderColor: Theme.borderColor.lightBorder
        }}
        size="medium"
        fullWidth={fullWidth}
      >
        <InputLabel id="demo-multiple-name-label">{placeholder}</InputLabel>

        <Select
          labelId="demo-multiple-name-label"
          value={value}
          onChange={handleChange}
          style={style}
          placeholder={placeholder}
          fullWidth={fullWidth}
          sx={{
            borderRadius: "10px"

            // ".MuiSvgIcon-root ": {
            //   fill: "white !important"
            // },
          }}
          label={placeholder}
          //   input={
          //     <OutlinedInput
          //       label={placeholder}
          //       style={{ maxHeight: ITEM_HEIGHT }}
          //     />
          //   }
          //   MenuProps={MenuProps}
          //   IconComponent={() => (
          //     <ChevronRightIcon color="#222" fontSize={"large"} />
          //   )}
        >
          {options.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
