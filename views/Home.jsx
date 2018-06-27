var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body style={{ fontFamily: 'sans-serif'}}>
          <h1>Welcome to Pokedex</h1>
          <a href="/new">Create New Pokemon</a>
          <ul>
            {this.props.pokemon.map(pokemon => (
              <li key={pokemon.id}>
                <a href={'/pokemon/' + pokemon.num}>{pokemon.name}</a>
              </li>
            ))}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
