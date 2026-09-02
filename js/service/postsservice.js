class PostsService {
  constructor() {

  }

  findAllPosts() {
    return $.get(AppConfig.backendServer+'/rest/post');
  }

  findPost(id) {
    return $.get(AppConfig.backendServer+'/rest/post/' + encodeURIComponent(id));
  }

  deletePost(id) {
    return $.ajax({
      url: AppConfig.backendServer+'/rest/post/' + encodeURIComponent(id),
      method: 'DELETE'
    });
  }

  savePost(post) {
    return $.ajax({
      url: AppConfig.backendServer+'/rest/post/' + encodeURIComponent(post.id),
      method: 'PUT',
      data: JSON.stringify(post),
      contentType: 'application/json'
    });
  }

  addPost(post) {
    return $.ajax({
      url: AppConfig.backendServer+'/rest/post',
      method: 'POST',
      data: JSON.stringify(post),
      contentType: 'application/json'
    });
  }

  createComment(postid, comment) {
    return $.ajax({
      url: AppConfig.backendServer+'/rest/post/' + encodeURIComponent(postid) + '/comment',
      method: 'POST',
      data: JSON.stringify(comment),
      contentType: 'application/json'
    });
  }

}
