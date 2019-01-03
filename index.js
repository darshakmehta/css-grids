"use strict";

$( document ).ready(() => {

    let map = new Map; /* To track the number of clicks */
    let lastImageOrder = []; /* To Track the last Image Order */
    
    if ( localStorage.getItem( "lastImageOrder" ) === null ) {
        if( localStorage.getItem( "imageClickCounter" ) === null ) {
        	map = initializeMap( map );
        } else {
        	map = new Map( JSON.parse( localStorage.getItem( "imageClickCounter" ) ) );
        }
        const arr = initializeArr();
        renderImages( arr );
    	[ lastImageOrder, map ] = renderOnClick( lastImageOrder, map );
    } else {
        const arr = JSON.parse( localStorage.getItem( "lastImageOrder" ) );
        map = new Map( JSON.parse( localStorage.getItem( "imageClickCounter" ) ) );
        if ( arr.length < 8 ) {
            for ( let i = 0; i < 8; i++ ) {
                if ( !arr.includes( i ) ) {
                    arr.push( i );
                }
            }
        }
        renderImages( arr );
    	[ lastImageOrder, map ] = renderOnClick( lastImageOrder, map );
    }

    /* Reset Image Order Handler */
    $('#reset-image-order').on("click", () => {
        if ( confirm( "Do you want to reset the Image order?" ) ) {
        	lastImageOrder = [];
            localStorage.removeItem("lastImageOrder");
            $('.container').empty();
            const arr = initializeArr();
            renderImages(arr);
            [ lastImageOrder, map ] = renderOnClick( lastImageOrder, map );
        } else {
            alert( "Your Image order is intact" );
        }
    });

    /* High to Low Click Handler */
    $('#sort-by-click').on("click", () => {

    	const sortMap = sortImage(map);
    	let arr = [];
    	
    	$('.container').empty();
    	for ( const [key, value] of sortMap ) {
    		arr.push( key );
		}
		renderImages(arr);
		
		[ lastImageOrder, map ] = renderOnClick( lastImageOrder, map );
	});
});

/* Default Count for all Images */
const initializeMap = ( map ) => {

    for ( let i = 0; i < 8; i++ ) {
        map.set( i, 0 );
    }
    
    return map;
}

/* Default Order of Images */
const initializeArr = () => {

	let arr = [];
	
	for ( let i = 0; i < 8; i++ ) {
		arr.push( i );
	}
	
	return arr;
}

/* Render Images onStartUp */
const renderImages = ( arr ) => {

    for ( let i = 0; i < 8; i++ ) {
        let src = "images/image" + arr[i] + ".png";
        let img = $('<img />', {
            id: "image" + arr[i],
            src,
            alt: 'image'
        });

        img.appendTo( $('.container') );
    }
}

/* Render onClick Handler for Images */
const renderOnClick = ( arr, map ) => {

	for ( let i = 0; i < 8; i++ ) {
		if( !arr.includes(i) ) {
	        $('#image' + i).on("click", () => {
	            $('#image' + i).unbind( "click" );
	            $('#image' + i).css( "cursor", "default" );
	            arr.push( i );
	            map.set( i, ( map.get( i ) + 1 ) );
	            localStorage.setItem( "lastImageOrder", JSON.stringify( arr ) );
	            localStorage.setItem( "imageClickCounter", JSON.stringify( Array.from( map.entries() ) ) );
	        });
	    } else {
	    	$('#image' + i).css( "cursor", "default" );
	    }
    }

    return [arr, map];
}

/* Sort Image based on Clicks */
const sortImage = ( orderOfImage ) => {
	return new Map( [...orderOfImage.entries()].sort( ( a, b ) => b[1] - a[1] ) );
}
