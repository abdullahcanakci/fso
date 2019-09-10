import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'blog.url',
    likes: 4,
    user: {
      username: 'Username'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Blog title'
  )
})

test('click delete', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'blog.url',
    likes: 4,
    user: {
      username: 'Username'
    }
  }

  const mockHandler = jest.fn()

  const { getByText } = render (
    <Blog blog={blog} onDelete={mockHandler} />
  )

  const button = getByText('delete')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})

test('details invisible at start', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'blog.url',
    likes: 4,
    user: {
      username: 'Username'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const detail = component.container.querySelector('.detail')
  expect(detail).toHaveStyle('display: none')
})

test('details visible after toggle', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'blog.url',
    likes: 4,
    user: {
      username: 'Username'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )
  const toggle = component.container.querySelector('.title')
  fireEvent.click(toggle)

  const detail = component.container.querySelector('.detail')
  expect(detail).toHaveStyle('display: ')
})