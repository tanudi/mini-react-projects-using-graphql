/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        // Use test-specific tsconfig that is compatible with Jest's CommonJS runtime.
        // The main tsconfig.app.json uses "moduleResolution: bundler" and
        // "verbatimModuleSyntax" which are Vite-only settings incompatible with Jest.
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
  moduleNameMapper: {
    // Stub CSS imports — Jest doesn't understand them, identity-obj-proxy returns
    // the class name as a string so className assertions still work.
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
    // Stub static asset imports (images, svgs, etc.)
    "\\.(jpg|jpeg|png|gif|svg|webp)$": "<rootDir>/src/__mocks__/fileMock.ts",
  },
  testMatch: [
    "**/__tests__/**/*.{ts,tsx}",
    "**/*.{spec,test}.{ts,tsx}",
  ],
};
