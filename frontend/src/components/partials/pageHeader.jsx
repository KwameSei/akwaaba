import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "./theme";

export const PageHeader = ({ title, subTitle, icon }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                p: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Box>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="subtitle">{subTitle}</Typography>
            </Box>
            <Box>{icon}</Box>
        </Box>
    );
};