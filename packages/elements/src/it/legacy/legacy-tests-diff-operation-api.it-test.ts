/**
 * Screenshot tests for Legacy tests - DiffOperationAPI stories (DiffOperationApi.stories.tsx).
 */
import { StoryPage } from '../service/story-page'
import { ViewComponent } from '../service/view-component'
import { storyPage } from '../service/storybook-service'

describe('Legacy tests', () => {
  describe('DiffOperationAPI', () => {
    let story: StoryPage
    let component: ViewComponent

    beforeEach(async () => {
      await jestPuppeteer.resetPage()
    })

    it('add-new-pet-to-petstore-story', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--add-new-pet-to-petstore-story')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('add-new-pet-to-petstore-story-circular', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--add-new-pet-to-petstore-story-circular')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('add-new-pet-to-petstore-nullable-prop-story', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--add-new-pet-to-petstore-nullable-prop-story')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('remove-whole-response-code', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--remove-whole-response-code')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('remove-whole-response-media-type', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--remove-whole-response-media-type')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('remove-schema-from-response-media-type', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--remove-schema-from-response-media-type')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('remove-response-headers', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--remove-response-headers')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('remove-1-response-header', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--remove-1-response-header')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('add-response-headers', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--add-response-headers')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('add-1-response-header', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--add-1-response-header')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('remove-whole-request-body', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--remove-whole-request-body')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('add-whole-request-body', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--add-whole-request-body')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('remove-whole-request-body-media-type', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--remove-whole-request-body-media-type')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('add-whole-request-body-media-type', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--add-whole-request-body-media-type')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('remove-schema-from-request-body-media-type', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--remove-schema-from-request-body-media-type')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('removed-1-request-header', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--removed-1-request-header')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('added-1-request-header', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--added-1-request-header')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('deprecated-operation', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--deprecated-operation')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('un-deprecated-operation', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--un-deprecated-operation')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('changed-parameters-required-story', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--changed-parameters-required-story')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('changed-parameters-deprecated-story', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--changed-parameters-deprecated-story')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('request-body-no-additional-properties-not-changed', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--request-body-no-additional-properties-not-changed')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('one-of-changes', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--one-of-changes')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('integer-to-string', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--integer-to-string')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('string-to-integer', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--string-to-integer')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('change-path-param-name', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--change-path-param-name')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('rename-media-type-and-a-deeper-change-in-response', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--rename-media-type-and-a-deeper-change-in-response')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('rename-media-type-in-response', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--rename-media-type-in-response')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('rename-media-type-and-a-deeper-change-in-request-body', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--rename-media-type-and-a-deeper-change-in-request-body')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('rename-media-type-in-request-body', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--rename-media-type-in-request-body')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('bug-crash-infinite-additional-props-in-diffs', async () => {
      story = await storyPage(page, 'legacy-tests-diff-operation-api--bug-crash-infinite-additional-props-in-diffs')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })
  })
})
