// Include React
var React = require("react");

// Creating the Form component
var Search = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { 
      term: "", 
      startYear: "", 
      endYear: "",
      //results: {}
    }
  },

  // componentDidMount: function() {
  //   helpers.runQuery(this.state.term, this.state.startYear, this.state.endYear).then(function(data){
  //     this.setState({results: data.docs})
  //   }).bind(this);
  // },

  // This function will respond to the user input
  handleChange: function(key) {
    return function (event) {
      var state = {};
      state[key] = event.target.value;

    console.log('target: term?: ', state.term, 'target: startYear?: ', state.startYear);

    this.setState(state);
    }.bind(this);
  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.setTerm(this.state.term, this.state.startYear);
    this.setState({ term: "" });
    console.log('State crap: ', this.state.term, this.state.startYear, this.state.endYear );
  },

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="term">Topic</label>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <input
                value={this.state.term}
                type="text"
                className="form-control text-center"
                id="term"
                onChange={this.handleChange('term')}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startYear">Start Year (Optional):</label>
              <input 
                value={this.state.startYear} 
                type="text" 
                className="form-control text-center" 
                id="startYear" 
                onChange={this.handleChange('startYear')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="endYear">End Year (Optional):</label>
              <input 
                value={this.state.endYear} 
                type="text" 
                className="form-control text-center" 
                id="endYear" 
                onChange={this.handleChange('endYear')}
              />
            </div>
            <br />
            <button
              className="btn btn-primary"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Search;
