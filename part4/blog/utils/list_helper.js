const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.reduce(
    (sum, blog) => sum + blog.likes,
    0
  )
}

const favoriteBlog = (blogs) => {
  let max = blogs.length === 0
    ? 0
    : blogs[0].likes

  const favoriteIndex = blogs.reduce(
    (maxIndex,item,i) => {
      if( blogs[i].likes > blogs[maxIndex].likes ){
        max = blogs[i].likes
        return i
      }
      return maxIndex
    },
    0
  )

  return blogs.length === 0
    ? undefined
    : blogs[favoriteIndex]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
