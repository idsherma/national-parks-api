(function(scs) {
    scs(window.jQuery, window, document);
    }(function($, window, document) {

        'use strict';

        function getDogImage(userBreedEntry) {
            
            //handle use cases if user input capitalizes any letter in input
            let breedParameter = userBreedEntry.toLowerCase();
            
            let newURL = `https://dog.ceo/api/breed/${breedParameter}/images/random`;

            fetch(newURL)
                .then(response => response.json())
                .then(data => 
                    displayResults(data))
        }

        function displayResults(data) {

            let dogData = data.message;
            let dogStatus = data.status;

            if(dogStatus === 'error') {
                alert('Breed not found (master breed does not exist). Please try again!');
                return;
            } else {
                $('.results-img').replaceWith(`<img src="${dogData}" class="results-img">`);
            }
                    
            //display the results section
            $('.results').removeClass('hidden');
        }

        function watchForm() {
            $('form').submit(event => {
                event.preventDefault();

               let userBreedEntry = $('#breed-list-entry').val();

                if(userBreedEntry === '') {
                    alert('Input can not be left blank');
                    return;
                }

                getDogImage(userBreedEntry);
                $('#dog-form').find('input:text').val(''); 

            });
        }

        $(function() {
            console.log('App loaded! Waiting for submit!');
            watchForm();
        });
        
    })
);