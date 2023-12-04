import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Theme } from '../../Theme';

export default function SearchBar({placeholder="",id,onSubmit=() => {}, onChange=() => {},minWidth,borderRadius}) {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 8px', display: 'flex', alignItems: 'center',boxShadow:'none',minWidth:minWidth,borderRadius:borderRadius,border:`1px solid ${Theme.borderColor.border}` }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1,color:Theme.color.text }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': {placeholder} }}
        onChange={onChange}      />
      <IconButton type="button" sx={{ p: '5px 10px' }} aria-label="search" onClick={e => onSubmit(e.target.value)}>
        <SearchIcon style={{ color: Theme.color.text }} />
      </IconButton>
     
    </Paper>
  );
}