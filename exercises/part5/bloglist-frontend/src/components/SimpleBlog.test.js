import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './SimpleBlog'

afterEach(cleanup)

test('renders title', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    likes: 15
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Title')
})

test('renders author', () => {

  const blog = {
    title: 'Title',
    author: 'Author',
    likes: 15
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Author')
})

test('render likes', () => {

  const blog = {
    title: 'Title',
    author: 'Author',
    likes: 15
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('15')
})

test('button click', () => {

  const blog = {
    title: 'Title',
    author: 'Author',
    likes: 15
  }

  const mockHandler = jest.fn()

  const button = render(
    <Blog blog={blog} onClick={mockHandler}/>
  ).getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)


  expect(mockHandler.mock.calls.length).toBe(2)
})