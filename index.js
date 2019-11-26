(function(scs) {
    scs(window.jQuery, window, document);
    }(function($, window, document) {

        'use strict';

        const apiKey = '9gVorbcG7KE8YhWWg9bIShXVy2PkQpu4WgPrYmSy';

        let searchURL = 'https://developer.nps.gov/api/v1/parks';

        //sanitize our user input and create the query item
        function formatQueryParams(params) {
            const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            return queryItems.join('&');
        }

        function getParks(query, maxResults=10) {

            const params = {
              stateCode: query,
              limit: maxResults,
              start: 1,
              api_key: apiKey
            };
          
            const queryString = formatQueryParams(params)
            const url = searchURL + '?' + queryString;
           
            console.log(url);

            fetch(url)
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error(response.statusText);
            })
            .then(stateData => displayResults(stateData))
            .catch(err => {
              $('#js-error-message').text(`Something went wrong: ${err.message}`);
            });
        }

        function displayResults(stateData) {
                //console.log(stateData.data.length);

                // if there are previous results, remove them
                $('#results-list').empty();

                // iterate through the items array
                for (let i = 0; i < stateData.data.length; i++){

                    $('#results-list').append(
                    `<li>
                    <h3>${stateData.data[i].fullName}</h3>
                    <p>${stateData.data[i].description}</p>
                    <span>URL: <a href='${stateData.data[i].url}' target="_blank">${stateData.data[i].url}</a></span>
                    </li>`
                )};

                // display the results section  
                $('#results').removeClass('hidden');
        }


        function watchForm() {
            $('form').submit(event => {
                event.preventDefault();

                let maxResultsNum = $('#max-results').val();
                console.log(maxResultsNum);
                let statesArr = [];
 
                if($("input[name='state']").is(":checked")){

                    $("input[name='state']:checked").each(function() {
                        statesArr.push($(this).val());
                    });

                } else if($("input[name='state']").is(":not(:checked)")) {
                    alert('Input can not be left blank');
                    return;
                }

               getParks(statesArr, maxResultsNum)
               $('#park-form')[0].reset();

            });
        }

        $(function() {
            console.log('App loaded! Waiting for submit!');
            watchForm();
        });
        
    })
);