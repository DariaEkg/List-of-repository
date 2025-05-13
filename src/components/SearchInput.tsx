import React from "react";
import { Input, Button, Box } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<Props> = ({ inputValue, onInputChange, onSearch }) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <Input
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        startDecorator={<SearchIcon />}
        endDecorator={
          <Button variant="solid" onClick={onSearch}>
            Search
          </Button>
        }
        sx={{ width: "100%" }}
      />
    </Box>
  );
};

export default SearchInput;
