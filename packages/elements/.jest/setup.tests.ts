import { expect, jest } from '@jest/globals'
import { configureToMatchImageSnapshot } from 'jest-image-snapshot'
import { TEST_TIMEOUT } from '../.config/it/constants'

jest.setTimeout(TEST_TIMEOUT)
jest.retryTimes(1, { logErrorsBeforeRetry: true })

const normalizeTestName = (testName: string) => testName.trim().replace(/\s+/g, '-')

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: {
    threshold: 0.1, /* Noisy edges and shadows. 0.1 is default, change it if it is not enough  */
    diffColorAlt: [0, 0, 255],
    alpha: 0.3,
  },
  failureThreshold: 20, // not stable shadows
  customSnapshotIdentifier: ({ currentTestName, counter }) => {
    const testNamePart = normalizeTestName(currentTestName)
    const counterPart = counter > 1 ? `-${counter}` : ''
    return `${testNamePart}-snap${counterPart}`
  },
  onlyDiff: false,
  storeReceivedOnFailure: true,
})

expect.extend({ toMatchImageSnapshot })
