import React from 'react';

import FavouritesItem from './FavouritesItem';

const FavouritesList = (props) => {
	let favouriteLocatons = props.favouriteLocatons.map(location => {
		console.dir(location);
		let active = props.activeLocationAddress = location.address;
		
		return <FavouritesItem 
		    address={location.address}
            key={location.timestamp}
            timestamp={location.timestamp}
            active={active}
            onClick={props.onClick}
        />
		
	});
	
	 return (
        <React.Fragment>
            {(favouriteLocatons.length) ? 
                <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
                    <span className="list-group-item-active">Saved Locations</span>
                    {favouriteLocatons}
                </div>
            : false}
        </React.Fragment>
    );
}

export default FavouritesList;