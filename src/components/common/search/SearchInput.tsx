import { Box, Input, Tooltip } from "@mui/material";
import IconButtonGradient from "../../common/IconButtonGradient.tsx";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { removeVietnameseTones } from "../../../utils/remove-vietnamese-tones.ts";

type Props = {
    placeHolder?: string,
    handleSearch?: (text: string) => void
}

const SearchInput = ({ placeHolder, handleSearch }: Props) => {
    const [valueSearch, setValueSearch] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && handleSearch) {
            const normalizedValue = removeVietnameseTones(valueSearch);
            handleSearch(normalizedValue);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValueSearch(newValue);
        if (handleSearch && newValue === "") {
            handleSearch(""); // Gọi handleSearch với giá trị trống khi văn bản bị xóa
        }
    };

    return (
        <Box sx={{ display: "flex", width: '100%' }}>
            <Input
                sx={{ flex: 1 }}
                placeholder={placeHolder}
                value={valueSearch}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
            />
            <Tooltip title="Tìm kiếm">
                <IconButtonGradient type="button" aria-label="search"
                    onClick={() => {
                        if (handleSearch) {
                            const normalizedValue = removeVietnameseTones(valueSearch);
                            handleSearch(normalizedValue);
                        }
                    }}>
                    <SearchIcon />
                </IconButtonGradient>
            </Tooltip>
        </Box>
    );
}

export default SearchInput;