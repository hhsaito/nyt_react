// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./children/Search");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { term: "", results: [], history: [], endYear: "", startYear: "" };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getArticles().then(function(response) {
      console.log('components did mount: ', response);
      if (response !== this.state.history) {
        console.log("History: ", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {
    console.log('Component Updated!');
    console.log('State object: ', this.state.term, 'startYear: ', this.state.startYear );
    var self = this;
    if (this.state.term !== '') {
      // Run the query for the address
      helpers.runQuery(this.state.term, this.state.startYear, this.state.endYear).then(function(article) {
          console.log('Results: ', article)
          console.log("Article results here: ", article[0].headline.main, " url: ", article[0].web_url, " date: ", article[0].pub_date);
          self.setState({ results: article });
      })
      // After we've done the post... then get the updated history
      helpers.getArticles().then(function(response) {
        console.log("Current Articles", response.data);

        console.log("History: ", response.data);

        self.setState({ history: response.data });
      })
      // After we've received the result... then post the search term to our history.
      // helpers.postArticles(article.headline.main, article.web_url, article.pub_date).then(function() {
      //   console.log("Updated!");
      // }.bind(this));
    }
  },  

  // This function allows childrens to update the parent.
  setTerm: function(term) {
    this.setState({ term: term, startYear: startYear.value, endYear: endYear.value });
  },
  // Here we render the function
  render: function() {
    return (
      <div>
        <div className="jumbotron" style={{backgroundColor: "#20315A", color: "white"}}>
          <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Search setTerm={this.setTerm} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Results results={this.state.results} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Saved history={this.state.history} />
          </div>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
