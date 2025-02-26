import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog correctly', async () => {
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

  const element3 = screen.queryByText(
    'netflix.com/12345'
  )
  expect(element3).toBeNull()
  console.log(element3)

  const element4 = screen.queryByText(
    'likes 1'
  )
  expect(element4).toBeNull()
  console.log(element4)

/*
  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
/*
*/

  //screen.debug() //prints html to console

/*
  const div = container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
*/

/*
  const element = screen.getByText('Component testing is done with react-testing-library')

  screen.debug(element)
  expect(element).toBeDefined()
*/

/*
  const mockHandler = vi.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
*/
})
