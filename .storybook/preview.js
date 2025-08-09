// .storybook/preview.js
import { MemoryRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import '../src/input.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" }, // Adicione esta linha para habilitar o painel Actions
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
        <MemoryRouter>
          <AnimatePresence>
            <div className="font-sans">
              <Story />
            </div>
          </AnimatePresence>
        </MemoryRouter>
    ),
  ],
};
export default preview;preview;