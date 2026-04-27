import type { Config } from "jest";

const config: Config = {
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"^~(.*)$": "<rootDir>/src$1",
	},
	testMatch: ["**/__tests__/**/*.test.ts"],
	transform: {
		"^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
	},
};

export default config;
