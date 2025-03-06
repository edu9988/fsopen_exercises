const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const userInput = await page.locator('#username')
    const pwdInput = await page.locator('#password')

    await expect(userInput).toBeVisible()
    await expect(pwdInput).toBeVisible()
  })
})
