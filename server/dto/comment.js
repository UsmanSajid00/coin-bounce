class commentDto {
  constructor(comment) {
    this._id = comment._id;
    this.authorUsername = comment.author.username;
    this.content = comment.content;
    this.createdAt = comment.createdAt;
  }
}

export default commentDto;
