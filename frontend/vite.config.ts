// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { createTheme } from '@mui/material/styles';
const theme = createTheme();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    port: 3000,
    watch: {
      usePolling: true,
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@mui/material/styles/index.scss";
          @import "@mui/material/styles/variables.scss";
          @import "@mui/material/styles/overrides.scss";
          @import "@mui/material/styles/props.scss";
          @import "@mui/material/styles/typography.scss";
          @import "@mui/material/styles/shape.scss";
          @import "@mui/material/styles/colorManipulator.scss";
          @import "@mui/material/styles/colorPalette.scss";
          @import "@mui/material/styles/colorSystem.scss";
          @import "@mui/material/styles/colorUtils.scss";
          @import "@mui/material/styles/spacing.scss";
          @import "@mui/material/styles/transition.scss";
          @import "@mui/material/styles/zIndex.scss";
          @import "@mui/material/styles/breakpoints.scss";
          @import "@mui/material/styles/variables.scss";
          @import "@mui/material/styles/variablesOverrides.scss";
          @import "@mui/material/styles/variablesBreakpoints.scss";
          @import "@mui/material/styles/variablesColorSystem.scss";
          @import "@mui/material/styles/variablesColorManipulator.scss";
          @import "@mui/material/styles/variablesColorPalette.scss";
          @import "@mui/material/styles/variablesColorUtils.scss";
          @import "@mui/material/styles/variablesSpacing.scss";
          @import "@mui/material/styles/variablesShape.scss";
          @import "@mui/material/styles/variablesTypography.scss";
          @import "@mui/material/styles/variablesTransition.scss";
          @import "@mui/material/styles/variablesZIndex.scss";
          `,
      },
    },
  },
})