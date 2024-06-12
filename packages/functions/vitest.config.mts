import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { createTestConfig } from '../test/createTestConfig';

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: createTestConfig('functions'),
});
