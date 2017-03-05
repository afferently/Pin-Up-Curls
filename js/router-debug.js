var router = (function() {

	var $top = document.querySelector('[data-router=top]'),
			$bottom = document.querySelector('[data-router=bottom]');


	var init = function() {

		$top.addEventListener('click', route, false);
		$bottom.addEventListener('click', menuButton, false);
	}

	var route = function(e) {

		if (!e.target.dataset.router) {
			return;
		}

		// Prevent link from opening.
		e.preventDefault();

		// Get route from link.
		var route = e.target.dataset.router;

		// Push route into browser history & update URL in browser bar.
		//history.pushState(route, null, route)

		// Begin request.
		var request = new XMLHttpRequest(),
				requestURL = 'partials/' + route;

		request.open('GET', requestURL, true);
		request.setRequestHeader('Pragma', 'no-cache');
		request.onreadystatechange = (function (route) {

				return function () {

						if (request.readyState === 4) {

								// If Successful.
								if (request.status === 200) {

										// If URL isn't the current message.
										//if (router !== history.state) {
										//    return;
										//}

									renderBottomFromResponse(request.response, route);
								}
								else {

									// Log error respsonse
									console.log(request.response);
								}
						}
				};
		})(route);

		// Send Request.
		request.send();
	}

	var menuButton = function(e) {

		if (e.target.dataset.router !== 'menu') {
			return;
		}

		// Prevent link from opening.
		e.preventDefault();

		// Smoothly scroll menu in from the top.
		$top.scrollIntoView({ behavior: 'smooth' });
	}

	var renderBottomFromResponse = function(response, route) {

		// Replace bottom with response and set height to 100%.
		$bottom.innerHTML = response;
		$bottom.classList.add('h-100');

		if (route === 'map') {
			$bottom.classList.add('flex');
			$bottom.classList.add('flex-column');
		}

		// Smoothly scroll rendered response in from the bottom.
		$bottom.scrollIntoView({ behavior: 'smooth' });

		if (route === 'map') {
			map.init();
		}
	}

	init();
})()
