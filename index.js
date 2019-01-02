$(document).ready(() => {
	const arr = [0, 1, 2, 3, 4, 5, 6, 7];
	if ( localStorage.getItem("orderOfImage") === null ) {
		renderImage(arr);
	} else {
		const orderOfImage = JSON.parse(localStorage.getItem("orderOfImage"));
		if ( orderOfImage.length < 8 ) {
			for ( let i = 0; i < 8; i++ ) {
				if ( !orderOfImage.includes(i) ) {
					orderOfImage.push(i);
				}
			}
		}
		renderImage(orderOfImage);
	}

	let orderOfImage = [];

	/* Render onClick Handler for Images */
	for ( let i = 0; i < 8; i++ ) {
		$('#image' + i).on("click", () => {
			$('#image' + i).unbind("click");
			$('#image' + i).css("cursor","default");
			$(`#image${i}:hover`).addClass("tooltip");
			orderOfImage.push(i);
			localStorage.setItem("orderOfImage", JSON.stringify(orderOfImage));
			if( orderOfImage.length > 0 ) {
				$('.currentSelection').append(orderOfImage);
			} 
		});
	}

	/* Clear Local Storage */
	$('#clearLocalStorage').on("click", () => {
		if(confirm("Do you want to clear the Image order?")) {
			orderOfImage = [];
			localStorage.clear();
			$('.container').empty();
			renderImage(arr);
		} else {
			alert("Your Image order is intact")
		}
	});
});

/* Render Images onStartUp */
const renderImage = (orderOfImage) => {
	for( let i = 0; i < orderOfImage.length; i++ ) {
		let src = "images/image" + orderOfImage[i] + ".png";
		let img = $( '<img />', {
			id: "image" + orderOfImage[i],
			src,
			alt: 'image'
		});
		img.appendTo($('.container'));
	}
}