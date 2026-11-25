/* Main mvcblog-front script */

// Load external resources.
function loadTextFile(url) {
  return new Promise((resolve, reject) => {
    $.get({
      url: url,
      cache: true,
      beforeSend: function( xhr ) {
        xhr.overrideMimeType( "text/plain" );
      }
    }).then((source) => {
      resolve(source);
    }).fail((xhr, status, error) => reject(error || status));
  });
}

/* Backend server configuration.
*
* backendServer must contain the base URL or path where the MVCBlog backend
* is installed.
*
* Do NOT include /rest here. PostsService and UserService already add
* /rest/... to every request.
*/

/* 
* Option 1: backend installed under /mvcblog on the same server.
*
* Example:
*   Backend:  http://localhost:<port>/mvcblog/
*   SPA:      http://localhost:<port>/mvcblog/frontend/
*   API:      http://localhost:<port>/mvcblog/rest/
*
* Using a relative path automatically keeps the same protocol, host, and port
* used to access the SPA.
*/
var AppConfig = {
  backendServer: '/mvcblog'
};

/* 
* Option 2: backend installed directly at the server root.
*
* Example:
*   Backend:  http://localhost:<port>/
*   SPA:      http://localhost:<port>/frontend/
*   API:      http://localhost:<port>/rest/
*
* window.location.origin uses the same protocol, host, and port as the SPA.
*/
// var AppConfig = {
//   backendServer: window.location.origin
// };

/* 
* Option 3: backend configured with a full URL.
*
* Use this when the backend protocol, host, port, and application path are
* known explicitly.
*
* Example:
*   Backend:  http://localhost:<port>/mvcblog/
*   SPA:      http://localhost:<port>/mvcblog/frontend/
*   API:      http://localhost:<port>/mvcblog/rest/
*/
// var AppConfig = {
//   backendServer: 'http://localhost:8080/mvcblog'
// };

Handlebars.templates = {};
Promise.all([
    I18n.initializeCurrentLanguage('js/i18n'),
    loadTextFile('templates/components/main.hbs').then((source) =>
      Handlebars.templates.main = Handlebars.compile(source)),
    loadTextFile('templates/components/language.hbs').then((source) =>
      Handlebars.templates.language = Handlebars.compile(source)),
    loadTextFile('templates/components/user.hbs').then((source) =>
      Handlebars.templates.user = Handlebars.compile(source)),
    loadTextFile('templates/components/login.hbs').then((source) =>
      Handlebars.templates.login = Handlebars.compile(source)),
    loadTextFile('templates/components/posts-table.hbs').then((source) =>
      Handlebars.templates.poststable = Handlebars.compile(source)),
    loadTextFile('templates/components/post-edit.hbs').then((source) =>
      Handlebars.templates.postedit = Handlebars.compile(source)),
    loadTextFile('templates/components/post-view.hbs').then((source) =>
      Handlebars.templates.postview = Handlebars.compile(source)),
    loadTextFile('templates/components/post-row.hbs').then((source) =>
      Handlebars.templates.postrow = Handlebars.compile(source))
  ])
  .then(() => {
    $(() => {
      new MainComponent().start();
    });
  }).catch((err) => {
    alert('FATAL: could not start app ' + err);
  });
