
var React = require("react");

class NotFound extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body style={{ fontFamily: 'sans-serif'}}>
          <h1>Not Found!</h1>
          <a href='/'>Go Back Home</a>
        </body>
      </html>
    );
  }
}

module.exports = NotFound;
