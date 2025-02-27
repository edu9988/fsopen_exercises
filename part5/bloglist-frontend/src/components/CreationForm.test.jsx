import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreationForm from './CreationForm'

describe('<CreationForm />', () => {
  const blog = {
    title: 'Bandit',
    author: 'Duhamel',
    url: 'netflix.com/12345',
    likes:1,
    user: {
      username: 'Alice',
      name: 'Alice in Chains',
      id: '12345'
    },
    id: '798789798'
  }

  test('Clicking create results in one call', async () => {
    const mockHandler = vi.fn()
    const secondMockHandler = vi.fn()

    const { container } = render(
      <CreationForm
        handleCreation={mockHandler}
      />
    )

    const user = userEvent.setup()
    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')
    const button = screen.getByText('create')

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(button)

    const details = mockHandler.mock.calls[0][0]
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(details.title).toBe('Bandit')
    expect(details.author).toBe('Duhamel')
    expect(details.url).toBe('netflix.com/12345')
  })
})
