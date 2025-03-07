const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const userInput = await page.locator('#username')
    const pwdInput = await page.locator('#password')

    await expect(userInput).toBeVisible()
    await expect(pwdInput).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'Alice', '1234')

      const warningDiv = await page.locator('.warning')
      await expect(warningDiv).toContainText('Login successful by Alice')
      await expect(warningDiv).toHaveCSS('border-style', 'solid')
      await expect(warningDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      await expect(page.getByText('Alice logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'Alice', '4567')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Alice logged-in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, 'Alice', '1234')
    })

    test('Blogs can be created', async ({ page }) => {
      await createBlog(page, 'Meme craft', 'Robert Ridihalg', 'forget.it/its-bs')

      const warningDiv = await page.locator('.warning')
      await expect(warningDiv).toContainText('A new blog: "Meme craft" by Robert Ridihalg added')
      await expect(warningDiv).toHaveCSS('border-style', 'solid')
      await expect(warningDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      await expect(page.getByText('Meme craft Robert Ridihalg')).toBeVisible()
    })
  })
})
