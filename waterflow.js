/**
 * waterflow plugin
 * author: yacent
 * license: MIT
 *
 * pre:
 * set the param of option
 */

/**
 * [achieve the waterflow layout]
 * @param  {[Object]} _option [the configuration of waterflow]
 *                    eg: 	_option = {
 *                    	  		parent: waterFlow, 		[DOMElement]
 *								flowItems: flowItems, 	[DOMELement]
 *								column: 3,				[Number]
 *								width: 360,				[Number]
 *								horizontalMargin: 15,	[Number]
 *								verticalMargin: 15		[Number]
 *                     	  	}
 * @return {[undefined]}
 */
function water(_option) {
	// set the the most outside element of waterflow
	_option.parent.style.width = _option.column * _option.width + (_option.column - 1) * _option.horizontalMargin + 'px';

	// init the array of array that used to record the height of each column
	var col = new Array(_option.column),
		flowItems = _option.flowItems;

	// init2: init the height of the column
	for (var i = 0, len = col.length; i < len; i++) {
		col[i] = flowItems[i].offsetTop + flowItems[i].offsetHeight;
	}

	// reduce the position of the flowitems
	for (var j = 0, l = flowItems.length; j < l; j++) {
		if (_option.width) {
			flowItems[j].style.width = _option.width + 'px';
		}

		// since the the init2 has configure the height of the first
		// but u also can init from here
		if (j < _option.column) {
			flowItems[j].style.top = 0;
			flowItems[j].style.left = (j % _option.column) * (_option.width + _option.horizontalMargin) + 'px';
		} else {
			var minH = Math.min.apply(this, col);
			var minIndex = col.indexOf(minH);

			flowItems[j].style.left = minIndex * (_option.width + _option.horizontalMargin) + 'px';
			flowItems[j].style.top = minH + _option.verticalMargin + 'px';

			col[minIndex] += flowItems[j].scrollHeight + _option.verticalMargin;
		}
	}
}
