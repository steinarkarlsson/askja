import { InlineConfig } from 'vitest';

const timeout = process.env.CI ? 50000 : 30000;

export const createTestConfig = (packageName: string): InlineConfig => ({
    setupFiles: ['../test/test-setup.ts'],
    coverage: {
        provider: 'istanbul',
        reporter: ['text', 'clover', 'lcov'],
        reportsDirectory: `../../test-reports/${packageName}/coverage`,
    },
    reporters: ['default', 'junit'],
    outputFile: `../../test-reports/${packageName}/test-results/junit.xml`,
    testTimeout: timeout,
    hookTimeout: timeout,
});
