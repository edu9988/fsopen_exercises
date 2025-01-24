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

  const favorite = blogs.length === 0
    ? undefined
    : blogs[favoriteIndex]

  return blogs.length === 0
    ? undefined
    : {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
}

const mostBlogs = (blogList) => {
  let ls = []
  let max = blogList.length === 0
    ? {author: '', blogs: 0}
    : {author: blogList[0].author, blogs: 1}

  blogList.forEach( item => {
    let found = false
    for( let x of ls )
      if( x.author === item.author ){
        x.blogs++
        if( x.blogs > max.blogs )
          max = x
        found = true
        break
      }
    if( !found )
      ls.push({
        author: item.author,
        blogs: 1
      })
  })

  return max
}

const mostLikes = (blogList) => {
  let ls = []
  let max = blogList.length === 0
    ? {author: '', likes: 0}
    : {author: blogList[0].author, likes: blogList[0].likes}

  blogList.forEach( item => {
    let found = false
    for( let x of ls )
      if( x.author === item.author ){
        x.likes += item.likes
        if( x.likes > max.likes )
          max = x
        found = true
        break
      }
    if( !found ){
      const newListItem = {
        author: item.author,
        likes: item.likes
      }
      ls.push( newListItem )
      if( newListItem.likes > max.likes )
        max = newListItem
    }
  })
  
  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
