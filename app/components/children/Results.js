// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.setTerm(this.state.term);
    this.setState({ term: "" });
  },
  
  // handleClick: function() {
  //   this.setState({  });
  // },
  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.results.map(function(search, i) {
            return (
              <div key={i} className="well">
                <h3>{search.headline.main}</h3>
                <p><a href={search.web_url}>{search.web_url}</a></p>
                <p>{search.pub_date}</p>
                <button
                className="btn btn-primary"
                type="button"
                // onClick={this.handleClick}
              >
                Save
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
module.exports = Results;
