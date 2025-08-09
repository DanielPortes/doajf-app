// .storybook/main.js
/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials", // Este pacote inclui Controls, Actions, Viewport, etc.
    "@storybook/addon-interactions", // Para simular interações
    "@storybook/addon-a11y", // Para testes de acessibilidade
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;