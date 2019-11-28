const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/packages/'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  setupFilesAfterEnv: ['<rootDir>/jestSetup.ts'],
  coverageReporters: ['html'],
  testPathIgnorePatterns: [
    '/node_modules/',
    'schematics/.*/files/(.*)$'
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};