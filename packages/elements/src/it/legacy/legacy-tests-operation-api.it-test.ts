/**
 * Screenshot tests for Legacy tests - OperationAPI stories (OperationApi.stories.tsx).
 */
import { StoryPage } from '../service/story-page'
import { ViewComponent } from '../service/view-component'
import { storyPage } from '../service/storybook-service'

describe('Legacy tests', () => {
  describe('OperationAPI', () => {
    let story: StoryPage
    let component: ViewComponent

    beforeEach(async () => {
      await jestPuppeteer.resetPage()
    })

    it('simple-operation', async () => {
      story = await storyPage(page, 'legacy-tests-operation-api--simple-operation')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('simple-operation-simple-mode', async () => {
      story = await storyPage(page, 'legacy-tests-operation-api--simple-operation-simple-mode')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('api-auth-local-before', async () => {
      story = await storyPage(page, 'legacy-tests-operation-api--api-auth-local-before')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('api-auth-local-after', async () => {
      story = await storyPage(page, 'legacy-tests-operation-api--api-auth-local-after')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('operation-without-heading', async () => {
      story = await storyPage(page, 'legacy-tests-operation-api--operation-without-heading')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('spec-with-complex-refs', async () => {
      story = await storyPage(page, 'legacy-tests-operation-api--spec-with-complex-refs')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('operation-with-parameters-one-schema-another-content', async () => {
      story = await storyPage(page, 'legacy-tests-operation-api--operation-with-parameters-one-schema-another-content')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })

    it('request-body-no-additional-properties', async () => {
      story = await storyPage(page, 'legacy-tests-operation-api--request-body-no-additional-properties')
      component = await story.viewComponent()
      expect(await component.captureScreenshot()).toMatchImageSnapshot()
    })
  })
})
