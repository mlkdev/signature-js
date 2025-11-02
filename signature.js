( function() {

	function init_SignatureJS( field_el, span_el ) {

		const canvas_el = span_el.querySelector( 'canvas' );
		const canvas_2d = canvas_el.getContext( '2d' );
		const button_el = span_el.querySelector( 'button' );

		var draw_mode = false;
		var last_draw_x = -1, draw_x = -1;
		var last_draw_y = -1, draw_y = -1;

		document.addEventListener( 'mouseup', function() {

			if( !draw_mode ) return;

			draw_mode = false;
			last_draw_x = draw_x = -1;
			last_draw_y = draw_y = -1;

			let image_data = canvas_2d.getImageData( 0, 0, canvas_el.width, canvas_el.height );
			let data = image_data.data;

			var ink_used = 0;
			for( let i = 0; i < data.length; i += 4 ) {
				ink_used += ( 255 - data[i] ) / 255;
			}
			
			if( ink_used >= 500 ) {
				field_el.value = canvas_el.toDataURL( 'image/png' );
			}

		} );

		canvas_el.addEventListener( 'mousedown', function( e ) {

			draw_mode = true;
			last_draw_x = draw_x = e.x - canvas_el.offsetLeft;
			last_draw_y = draw_y = e.y - canvas_el.offsetTop;

		} );

		canvas_el.addEventListener( 'mousemove', function( e ) {
			
			if( !draw_mode ) return;

			draw_x = e.x - canvas_el.offsetLeft;
			draw_y = e.y - canvas_el.offsetTop;

			canvas_2d.beginPath();
			canvas_2d.moveTo( last_draw_x, last_draw_y );
			canvas_2d.lineTo( draw_x, draw_y );

			canvas_2d.strokeStyle = 'rgba(0,0,0,0.25)';
			canvas_2d.lineWidth = 3;
			canvas_2d.stroke();

			canvas_2d.strokeStyle = 'rgba(0,0,0,1.00)';
			canvas_2d.lineWidth = 1;
			canvas_2d.stroke();

			last_draw_x = draw_x;
			last_draw_y = draw_y;

		} );

		button_el.addEventListener( 'click', function() {

			canvas_2d.fillStyle = 'white';
			canvas_2d.fillRect( 0, 0, canvas_el.width, canvas_el.height );

		} );

		button_el.click();

	}
	
	function construct_field( field_el ) {

		const span_el = document.createElement( 'span' );
		span_el.style.display = 'inline-flex';
		span_el.style.flexFlow = 'column nowrap';
		span_el.style.justifyContent = 'flex-start';
		span_el.style.alignItems = 'flex-start';
		span_el.style.border = '2px solid #808080';
		field_el.after( span_el );

		const canvas_el = document.createElement( 'canvas' );
		canvas_el.setAttribute( 'height', 100 );
		canvas_el.setAttribute( 'width', 300 );
		canvas_el.style.height = '100px';
		canvas_el.style.width = '300px';
		canvas_el.style.aspectRatio = '3 / 1';
		canvas_el.style.cursor = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAIVBMVEUAAAAAAAAAAAAAAAD/1AC/nwDZy6OsgZe/v7/lrMlsZVEFlITMAAAAA3RSTlMAQIDntwj7AAAAZ0lEQVQ4y+3TMRLAIAwDQUDYJPn/g2ObWqLOTNzeoo4GjCYPOJCBE4nsjyIDHhek04knhRsVe8KNi5wws0lFTticQiDfK9ER7RdfFrikyC5F9cXF7vdCI2J3CkpUp5+lH3oJ2VNUfwHAdwVyQuNypwAAAABJRU5ErkJggg==), auto';
		span_el.appendChild( canvas_el );

		const button_el = document.createElement( 'button' );
		button_el.setAttribute( 'type', 'button' );
		button_el.textContent = 'Clear Signature';
		button_el.style.border = 'none';
		button_el.style.padding = '8px 16px';
		button_el.style.width = '100%';
		button_el.style.lineHeight = '16px';
		button_el.style.fontSize = 'inherit';
		button_el.style.background = '#808080';
		button_el.style.color = '#FFFFFF';
		button_el.style.cursor = 'pointer';
		span_el.appendChild( button_el );

		init_SignatureJS( field_el, span_el );
		
	}
	
	document.addEventListener( 'DOMContentLoaded', function() {
		
		const forms = document.querySelectorAll( 'form[data-signature-fields]' );
		for( let i = 0; i < forms.length; i ++ ) {

			const fields = forms[i].dataset.signatureFields.split( ',' );
			for( let j = 0; j < fields.length; j ++ ) {

				const field = forms[i].querySelector( `input[name="${fields[j].trim()}"]` );
				construct_field( field );

			}

		}

	} );

} )();
