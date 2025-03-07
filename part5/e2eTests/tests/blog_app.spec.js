const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'Alice',
        password: '1234'
      }
    })
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
    beforeEach(async ({ page }) => {
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

    test('Blogs can be liked', async ({ page }) => {
      await createBlog(page, 'Meme craft', 'Robert Ridihalg', 'forget.it/its-bs')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      const warningDiv = await page.locator('.warning')
      await expect(warningDiv).toContainText('Added like to blog "Meme craft"')
      await expect(warningDiv).toHaveCSS('border-style', 'solid')
      await expect(warningDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    describe('Blog deletion', () => {
      test('Owner can delete', async ({ page }) => {
        await createBlog(page, 'To be deleted', 'Rob Nightmare', 'forget.it/its-bs')

        await page.getByRole('button', { name: 'view' }).click()

        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()
        const warningDiv = await page.locator('.warning')
        await expect(warningDiv).toContainText('Deleted "To be deleted" by Rob Nightmare')
        await expect(warningDiv).toHaveCSS('border-style', 'solid')
        await expect(warningDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
        await expect(page.getByText('To be deleted Rob Nightmare')).not.toBeVisible()
      })

      test('Non-owners cant see delete button', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            username: 'salainen',
            password: 'bugainen'
          }
        })
        await createBlog(page, 'To be deleted, from Alice', 'Robbie', 'forget.it/its-bs')
        await page.getByRole('button', { name: 'logout' }).click()

        await loginWith(page, 'salainen', 'bugainen')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })
  })
})
