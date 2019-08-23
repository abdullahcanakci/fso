const listHelper = require('../utils/list_helper')
const dummyData = require('./dummy_data')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)

  expect(result).toBe(1)
})

test('total likes', () => {
  const result = listHelper.totalLikes(dummyData.blogs)
  expect(result).toBe(dummyData.expectedValues.likes)
})

test('favorite blog', () => {
  const result = listHelper.favoriteBlog(dummyData.blogs)
  expect(result).toEqual(dummyData.expectedValues.favoriteBlog)
})

test('most blogs', () => {
  const result = listHelper.mostBlogs(dummyData.blogs)
  expect(result).toEqual(dummyData.expectedValues.mostBlogs)
})

test('most likes', () => {
  const result = listHelper.mostLikes(dummyData.blogs)
  expect(result).toEqual(dummyData.expectedValues.mostLikes)
})
