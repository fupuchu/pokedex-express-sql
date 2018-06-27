var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body style={{ fontFamily: 'sans-serif'}}>
          <form className="pokemon-form" method="POST" action="/pokemon">
            <div className="pokemon-attribute">
              num:<input name="num" type="text" maxLength="3" readOnly value={this.props.fixnum}/>
            </div>
            <div className="pokemon-attribute">
              name:<input name="name" type="text" />
            </div>
            <div className="pokemon-attribute">
              img:<input name="img" type="text" />
            </div>
            <div className="pokemon-attribute">
              height:<input name="height" type="text" />
            </div>
            <div className="pokemon-attribute">
              weight:<input name="weight" type="text" />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
