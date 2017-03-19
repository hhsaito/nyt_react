// Include React
var React = require("react");
var helpers = require("../utils/helpers");

// Creating the Results component
var Results = React.createClass({

  getInitialState: function() {
    return { 
      title: "", 
      url: "", 
      date: "",
    }
  },

  handleClick: function(i, event) {
    console.log('hit me');
    console.log('this is the title: ', this.props.results[i]);
    helpers.postArticles(this.props.results[i].headline.main, this.props.results[i].web_url, this.props.results[i].pub_date).then(function() {
      console.log("Updated!");
      this.setState({ title: this.props.results[i].headline.main });
    }.bind(this));
  },
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
                onClick={this.handleClick.bind(this, i)}
              >
                Save
              </button>
              </div>
            );
          }, this )}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
