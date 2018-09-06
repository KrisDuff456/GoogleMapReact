import React from "react";

export default class CurrentLocation extends React.Component{

    constructor(props){
        super(props);
        console.log("CurrentLocation constructor");
        this.toggleFavourite = () =>{
			this.props.onFavouriteToggle(this.props.address);
		}			
    }
    componentDidMount(){
        console.log("CurrentLocation Component did mount");
    }
    componentDidUpdate(){
        console.log("CurrentLocation Component did update");
    }
    static getDerivedStateFromProps(props,state){
        console.log("CurrentLocation getDerivedStateFromProps");
        console.log(props);
        console.log(state);
        return state;
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log("CurrentLocation getSnapshotBeforeUpdate");
        console.log(prevProps);
        console.log(prevState);
		return prevProps;
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log("CurrentLocation shouldComponentUpdate");
        console.log(nextProps);
        console.log(nextState);
        return nextProps.address !== this.props.address;
    }
    componentWillUnmount(){
        console.log("CurrentLocation ComponentWillInmount");
    }

    render(){
		let favouriteClassName = ' ' ;
		
		if(this.props.currentAddress !== 'Location not found...'){
			if(this.props.favourite){
				favouriteClassName = 'glyphicon glyphicon-star';
			}else{
			  favouriteClassName = 'glyphicon glyphicon-star-empty';
			}
		}
        console.log("CurrentLocation render");
        return(
            <div className = "col-xs-12 col-md4 col-md-offset-3 current-location">
            <h4 id = "save-location">{this.props.address}</h4>
				{this.props.address === "Location not found..." ? false :
				<span className={favouriteClassName} onClick ={this.toggleFavourite} aria-hidden="true" ></span>}
            </div>
        );
    }

}