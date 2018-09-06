import React from "react";
import MapContainer from "./MapContainer.jsx";
import CurrentLocation from "./CurrentLocation.jsx";
import FavouritesList from "./FavouritesList";
import Search from "./Search";

let favourites = [] ; 
 if(localStorage.favourites){
	 favourites = JSON.parse(localStorage.favourites);
 }



export default class App extends React.Component{
    constructor(props){
        super(props);
		
        console.log("App Constructor");
		console.dir(favourites);
		
        this.state = {
			    favourites,
                currentAddress : "QA Anchorage Quays",
                mapCoordinates:{
                    lat: 53.475586,
                    lng: -2.286060

                }
            }
 
		this.searchForAddress = this.searchForAddress.bind(this);
		
			this.isAddressInFavourites = currentAddress => {
			if(currentAddress !== `Location not found...`) {
				let favourites = this.state.favourites;
				let found = false;

				favourites.forEach(favourite => {
					if(currentAddress === favourite.address) {
						return found = true;
						
					}
					return found = false;
				});

				return found;
			}
		};
		this.onFavouriteToggle = currentAddress =>{
			if(this.isAddressInFavourites(currentAddress)){
				this.removeFavourite(currentAddress);
			}else{
				this.addFavourite(currentAddress);
			}
		};
		
		this.removeFavourite = address => {
			let favourites = this.state.favourites;
			let index = -1;
			
			for( let i = 0; favourites.length;i++){
				if(favourites[i].address === address){
				index = 1;
				break;
			}
		}
		
		if (index > -1){
			 favourites.splice(index, 1);
		}
		
		this.setState({ favourites });
		localStorage.favourites = JSON.stringify(favourites);
    }
	this.addFavourite = address =>{
		if(address !== 'Location not found...'){
			let favourites= this.state.favourites;
			
			favourites.push({ address:address, timeStamp:Date.now()});
			
			this.setState({favourites});
			localStorage.favourites=JSON.stringify(favourites);
		}
	}		
  }
    componentDidMount(){
        console.log("App Component did mount");
    }
    componentDidUpdate(){
        console.log("App Component did update");
    }
    static getDerivedStateFromProps(props,state){
        console.log("App getDerivedStateFromProps");
        console.log(props);
        console.log(state);
        return state;
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log("App getSnapshotBeforeUpdate");
        console.log(prevProps);
        console.log(prevState);
		return prevState;
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log("App shouldComponentUpdate");
        console.log(nextProps);
        console.log(nextState);
		console.log(`should App update: ${!(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state))}`);
        return !(JSON.stringify(nextProps) === JSON.stringify(this.props)
&& JSON.stringify(nextState) === JSON.stringify(this.state));
    }
    componentWillUnmount(){
        console.log("App ComponentWillInmount");
    }
    async searchForAddress(address){
		const concatAddress = address.replace(' ', '+');
		let currentState = this.state;
		currentState.currentAddress = address;
		try{
		 const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${concatAddress}`;
		 let response = await fetch (url);
		 let responseJSON = await response.json();
		 currentState.mapCoordinates = await responseJSON.results[0].geometry.location;
		 console.log(currentState.mapCoordinates);
		 
		}catch(error){
			currentState.currentAddress = `Location not found...`;
			currentState.mapCoordinates = {lat: 0, lng: 0};
		}
		
		this.setState({currentState});
	}
    render(){
        return(
        <div>
		    <h1>{this.props.title}</h1>
			<Search onSearch ={this.searchForAddress}/>
            <MapContainer coords = {this.state.mapCoordinates}/>
			
            <CurrentLocation 
			favourites = {this.isAddressInFavourites(this.state.currentAddress)}
			address = {this.state.currentAddress}
			onFavouriteToggle={this.onFavouriteToggle}/>
			
			<FavouritesList
			favouriteLocations={this.state.favourites}
			activeLocationAddress={this.state.currentAddress}
			onClick={this.searchForAddress}
			/>
        </div>
		)
    }
}

