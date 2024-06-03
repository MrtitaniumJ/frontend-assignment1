import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            isRound="true"
            size="md"
            alignSelf="flex-end"
            onClick={toggleColorMode}
        />
    );
};

export default ThemeToggle;