(function(scs) {
    scs(window.jQuery, window, document);
    }(function($, window, document) {

        'use strict';


        const apiKey = '9gVorbcG7KE8YhWWg9bIShXVy2PkQpu4WgPrYmSy';

        let searchURL = 'https://developer.nps.gov/api/v1/parks';

        //sanitize our user input and create the query item
        function formatQueryParams(params) {
            console.log(params.stateCode);

            //const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            const queryItems = Object.keys(params).map(key => key + '=' + params[key]);
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
        }


        function watchForm() {
            $('form').submit(event => {
                event.preventDefault();

                let maxResultsNum = $('#max-results').val();

                let statesArr = [];
 
                $("input[name='state']:checked").each(function(){
                    statesArr.push($(this).val());
                });

                // var ids = statesArr;
                // var id_params = ids.map(function(id) {
                //     return 'stateCode=' + id;
                // }).join('&');
                // var urlx = 'http://localhost/cah/blank.php?' + id_params;
                // console.log(urlx);

                const ids = statesArr;
                const id_params = ids.map(id => {return `stateCode=${id}`;}).join('&');

                console.log(id_params);

                // let test = $( "input[name='state']:checked" ).map(function() {
                //     return this.value;
                // }).get().join();

               console.log(maxResultsNum);
               //console.log(test);
               getParks(statesArr, maxResultsNum)

            });
        }

        $(function() {
            console.log('App loaded! Waiting for submit!');
            watchForm();
        });
        
    })
);