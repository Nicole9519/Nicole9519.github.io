import {
	parseData
} from './utils';

import {csv} from 'd3';

const dataPromise = d3.csv("./2017.csv", parseData);

const data = Promise.all([dataPromise])
	.then(([data]) => {

	console.log(data)
	
	
	})

export {
	data
}