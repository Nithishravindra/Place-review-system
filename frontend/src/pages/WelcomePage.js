import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			userID: "",
			placeTitle: "",
			description: "",
			errorMessage: "",
			
			// listOfplaces ---> API
			listOfPlaces: [
				{
                    placeId: 1,
                    title: "GandiBazaar",
                    description: "Kadle KAi Pareshe",
                    averageRating: 3,
                    comments: [
                        {
							id: 1,
							userName: "Rashmi AP",
                            commentText: "Wow enjoyed this place"
                        },
                        {
							id: 2,
							userName: "Suman",
                            commentText: "Too good !Wow enjoyed this place"
                        },
                        {
							id: 3,
							userName: "abcd",
                            commentText: "Wow enjoyed this place"
                        },
                        {
							id: 4,
							userName: "bcde",
                            commentText: "Too good !Wow enjoyed this place"
                        }
                    ]
                },
				{
					placeId: 2,
					title: 'Jayanagar',
					description: 'As a newbie in React world, I came across a similar issues where I could not edit the textarea and struggled',
					averageRating: 3,
                    comments: [
                        {
							id: 1,
							userName: "abcd",
                            commentText: "Wow enjoyed this place"
                        },
                        {
							id: 2,
							userName: "qwee",
                            commentText: "Too good !Wow enjoyed this place"
                        },
                        {
							id: 3,
							userName: "llopz",
                            commentText: "Wow enjoyed this place"
                        },
                        {
							id: 4,
							userName: "samm",
                            commentText: "Too good !Wow enjoyed this place"
                        }
                    ]
				},
				{
					placeId: 3,
					title: 'Kolar',
					description: 'My native',
					averageRating: 3,
                    comments: [
                        {
							id: 1,
							userName: "sdaf",
                            commentText: "Wow enjoyed this place"
                        },
                        {
							id: 2,
							userName: "Rpoq",
                            commentText: "Too good !Wow enjoyed this place"
                        },
                        {
							id: 3,
							userName: "raaak",
                            commentText: "Wow enjoyed this place"
                        },
                        {
							id: 4,
							userName: "afsd",
                            commentText: "Too good !Wow enjoyed this place"
                        }
                    ]
				},
				{
					placeId: 4,
					title: 'Taj_mahal',
					description: 'The Taj Mahal is located on the right bank of the Yamuna River in a vast Mughal garden that encompasses nearly 17 hectares, in the Agra District in Uttar Pradesh. It was built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal with construction starting in 1632 AD and completed in 1648 AD, with the mosque, the guest house and the main gateway on the south, the outer courtyard and its cloisters were added subsequently and completed in 1653 AD. The existence of several historical and Quaranic inscriptions in Arabic script have facilitated setting the chronology of Taj Mahal.',
					averageRating: 5,
                    comments: [
                        {
							id: 1,
							userName: "Rashmi AP",
                            commentText: "Wow enjoyed this place"
                        },
                        {
							id: 2,
							userName: "Sam",
                            commentText: "Too good !Wow enjoyed this place"
                        },
                        {
							id: 3,
							userName: "Rahim",
                            commentText: "Wow enjoyed this place"
                        },
                        {
							id: 4,
							userName: "Raam",
                            commentText: "Too good !Wow enjoyed this place"
						},
						{
							id: 5,
							userName: "Dev",
                            commentText: "Wow enjoyed this place"
                        },
                        {
							id: 6,
							userName: "Samm",
                            commentText: "Too good !Wow enjoyed this place"
                        }
					]
					
				}
			],
			totalRating: 5,
			dummyData: []
			
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
		  [e.target.name]: e.target.value
		});
	  }
	
	handleSubmit(e , placeTitle, description) {
		e.preventDefault(); 

		const userID = localStorage.getItem('userID');
 		if(placeTitle.length>0 && description.length > 0){
			console.log(placeTitle, description, userID);
				fetch(`http://localhost:3000/places/add`, {
					method: "POST",
					body: JSON.stringify({
						placeTitle: this.state.placeTitle,
						description: this.state.description,
						userID: userID
					}),
					headers: {
						"Content-type": "application/json",
						Accept: "application/json"
					}
				})	
				.then(res => res.json())
				.then(response => {
						if(response.statusCode === 401) {
							this.setState({
								errorMessage: "Place already exists"
							})
						}
				})	
				
				this.setState(
					previousState => ({
					listOfPlaces: [...previousState.listOfPlaces, { title: this.state.placeTitle, description: this.state.description  }]
				}));
		} else  {
			this.setState({
				errorMessage:"Please fill fields"
			})
		}
	}

	componentDidMount() {
		document.title = 'Welcome to PRS';
		
		fetch(`http://localhost:3000/places/listofplaces`, {
					method: "GET",
					headers: {
						"Content-type": "application/json",
						Accept: "application/json"
					}
				})	
				.then(res => res.json())
				.then(response => {
					console.log(response)
					this.setState(
						previousState => ({
							listOfPlaces: [...previousState.listOfPlaces, { title: this.state.title, description: this.state.description}]
						})
				)
			})
		}	


	render() {
		const { placeTitle, description, listOfPlaces, errorMessage } = this.state;

		return (
			<div className="Ap">
				<div className="FormFieldB">
					<h4>Welcome to Place Review System</h4>
					<h5>Places listed below can be reviewed.</h5>
				</div>

				
				<div className="FormFieldB">
					<div className="FormTitle">
                       	 {listOfPlaces.map((item, index) => (
                         	   <Link
                            	    to={{
                                    	pathname: `/ratingPage/${item.title}`,
	                                	dataPassed: {
											//listOfPlaces: listOfPlaces,
											placeTitle : placeTitle,
											placeId: item.placeId,
											totalRating: this.state.totalRating,
                                        	addNewComment: (
												userComment,
												placeId
                                        	) => {
												this.addNewUserComment(
													placeId,
													userComment
                                            	);
                                        	}
                                    	}
                                	}}
									key={index}
									className="FormTitle_Ln">
                                	{item.title}
                            </Link>
                        ))}
                    </div>
					
					<form onSubmit={this.handleSubmit}>
						<h5>To add a new place in the list add title and description in below textbox and click on 'SUBMIT'</h5>
							
						<div className="FormFieldT">
							<input type="text" 
							placeholder="Place Title" 
							value={placeTitle} 
							name="placeTitle" 
							onChange={this.handleChange} />
						</div>
						 
						<div className="FormFText">
							<textarea type="text" 
							placeholder="Description" 
							defaultValue={description} 
							name="description" 
							onChange={this.handleChange}/>
                		</div>    

						<div className="validation_welcomepage">
						<h2 style={{margin: 30}}> {errorMessage}</h2>
							<button
							onClick={ e => this.handleSubmit(e, placeTitle, description)}  className="FormT_button" >
							SUBMIT</button> 
							</div>
					</form>

				</div>
			 </div>
		)
	}
}
export default App;
