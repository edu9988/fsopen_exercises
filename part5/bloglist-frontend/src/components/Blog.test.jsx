import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
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

  test('Shows only title and author by default', async () => {
    const mockHandler = vi.fn()
    const secondMockHandler = vi.fn()

    const { container } = render(
      <Blog
        blog={blog}
        handleLike={mockHandler}
        handleDeletion={secondMockHandler}
        owner={true}
      />
    )

    const element = screen.getByText(
      'Bandit Duhamel', { exact: true }
    )
    expect(element).toBeDefined()
    expect(element).not.toBeNull()

    const element2 = screen.queryByText(
      'netflix.com/12345'
    )
    expect(element2).toBeNull()

    const element3 = screen.queryByText(
      'likes 1'
    )
    expect(element3).toBeNull()

  })

  test('likes and url are shown after clicking \'view\'', async () => {
    const mockHandler = vi.fn()
    const secondMockHandler = vi.fn()

    const { container } = render(
      <Blog
        blog={blog}
        handleLike={mockHandler}
        handleDeletion={secondMockHandler}
        owner={true}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText(
      'netflix.com/12345', { exact: false }
    )
    expect(element).toBeDefined()
    expect(element).not.toBeNull()

    const element2 = screen.getByText(
      'likes 1', { exact: false }
    )
    expect(element2).toBeDefined()
    expect(element2).not.toBeNull()

  })

  test('clicking \'like\' twice results in two calls', async () => {
    const mockHandler = vi.fn()
    const secondMockHandler = vi.fn()

    const { container } = render(
      <Blog
        blog={blog}
        handleLike={mockHandler}
        handleDeletion={secondMockHandler}
        owner={true}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
