import {  afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'; // This will add matchers to expect automatically

// runs a cleanup after each test case
afterEach(() => {
  cleanup();
});