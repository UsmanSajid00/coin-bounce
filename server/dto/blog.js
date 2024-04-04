class BlogBDto {
  constructor(blog) {
    this.author = blog.author;
    this.content = blog.content;
    this.title = blog.title;
    this.photo = blog.photoPath;
  }
}

export default BlogBDto;
