// Include React
var React = require("react");

// This is the History component. It will be used to show a log of  recent searches.
var Saved = React.createClass({
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved</h3>
        </div>
        <div className="panel-body text-center">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.history.map(function(search, i) {
            return (
              <div key={i} className="well">
                <h3>{search.title}</h3>
                <p><a href={search.url}>{search.url}</a></p>
                <p>{search.date}</p>
                <button
                  className="btn btn-danger"
                  type="button"
                  // onClick={this.resetClick}
                >
                Delete
              </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;
