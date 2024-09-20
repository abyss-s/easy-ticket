import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { CustomThemeProvider } from "../src/styles/CustomThemeProvider";
import { MemoryRouter } from "react-router-dom";
import theme from "../src/styles/theme";
import "../src/index.css";
import "../src/components/button/Button.module.css";
import { useAtom } from "jotai";
import { themeSiteAtom } from "../src/store/atom";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => {
      const [themeSite, setThemeSite] = useAtom(themeSiteAtom);

      useEffect(() => {
        const sessionTheme =
          sessionStorage.getItem("theme")?.replace("-theme", "") || "default";
        setThemeSite(sessionTheme);
      }, [setThemeSite]);

      return (
        <CustomThemeProvider>
          <ThemeProvider theme={theme}>
            <MemoryRouter>
              <div className={`${themeSite}`}>
                <Story />
              </div>
            </MemoryRouter>
          </ThemeProvider>
        </CustomThemeProvider>
      );
    }
  ]
};

export default preview;
