const { expect } = require('@playwright/test')

const loginWith = async (page, username, password)  => {
  await page.locator('#username').fill(username)
  await page.locator('#password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.locator('#title').fill(title)
  await page.locator('#author').fill(author)
  await page.locator('#url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} ${author}`).waitFor()
}

const likesOrderCheck = async page => {
  let previous = Number.MAX_SAFE_INTEGER
  for(const button of await page.getByRole('button', { name: 'view' }).all()){
    await button.click()
    let current = await page.getByText('likes').textContent()
    current = parseInt(current.slice(6))
    expect(current).toBeLessThanOrEqual(previous)
    previous = current
    await page.getByRole('button', { name: 'hide' }).click()
  }
}

export { loginWith, createBlog, likesOrderCheck }
