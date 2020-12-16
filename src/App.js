import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

const cardQuote = {
	margin: "20vh auto"
}

export default class App extends React.Component {
	constructor() {
		super();

		this.state = {
			error: null,
			isLoaded: false,
			text: "",
			author: ""
		};
	}

	fetchQuoteFromAPI() {
		fetch("https://api.quotable.io/random")
			.then(res => res.json())
			.then(
				(data) => {
					this.setState({
						isLoaded: true,
						text: data.content,
						author: data.author
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	componentDidMount() {
		return this.fetchQuoteFromAPI();
	}


	nextQuote() {
		return this.fetchQuoteFromAPI();
	}

	shareQuote() {
		let textQuote = this.state.text.concat(" "+ this.state.author);
		const url = "https://twitter.com/intent/tweet?text=";
		return document.getElementById("share-quote").setAttribute("href", url.concat(textQuote));
	}

  	render() {
  		document.body.style.backgroundColor = "rgb(30, 31, 28)";
  		const {	error, isLoaded, text, author } = this.state;
  		if (error) {
  			return(
  				<div className="text-white mx-5" style={cardQuote}>Error load quote, try again {error.message}</div>
  			);
  		} else if (!isLoaded) {
  			return(
  				<div className="text-white mx-5" style={cardQuote}>Loading quote...</div>
  			);
  		} else {
		    return(
		        <div className="card mx-5 bg-light" style={cardQuote}>
				  <div className="card-header">
				    <strong>Quote Generator</strong>
				  </div>
				  <div className="card-body">
				    <blockquote className="blockquote mb-0">
				      <p id="text">{this.state.text}</p>
				      <footer id="author" className="blockquote-footer">{this.state.author}</footer>
				    </blockquote>
				  </div>
				  <div className="d-inline mt-3">
					  <button id="next-quote" className="btn btn-outline-dark mx-1 my-1" onClick={this.nextQuote.bind(this)}>Next Quote</button>
					  <a target="_blank" id="share-quote" className="btn btn-outline-secondary" onClick={this.shareQuote.bind(this)}>Share Quote to Twitter</a>
				  </div>
				</div>
		    );
  		}

  	}
}