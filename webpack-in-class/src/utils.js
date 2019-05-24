import {nest, sum} from 'd3';

//Utility functions for parsing metadata, migration data, and country code

function parseData(d){

	return {
		lngLat: [+d.Lng,+d.Lat],
		price: d.price,
		district: d.district
	}
}