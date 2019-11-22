(function(scs) {
    scs(window.jQuery, window, document);
    }(function($, window, document) {

        'use strict';

        const apiKey = '9gVorbcG7KE8YhWWg9bIShXVy2PkQpu4WgPrYmSy';

        function getDogImage(num) {
            let numParameter = num;
            const URL = 'https://dog.ceo/api/breeds/image/random/';

            const newURL = URL + numParameter;
            console.log("number of dogs requested was" + " " + `${numParameter}`);

            fetch(newURL)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    let dogData = data.message;

                    function accessDogData() {
                        let dogArr = [];

                        dogData.forEach(function (dogData, index) {
                            console.log(dogData);
                            dogArr.push(`<img src=${dogData}>`);
                        });

                        let newDogArr = dogArr.join(' ');
                        return `${newDogArr}`;
                    } 

                    function render() {
                        let dogPhotoString = accessDogData();
                        $('#dog-list').html(dogPhotoString);
                    }
    
                    render();
                    
                })
        }

        function watchForm() {
            $('form').submit(event => {
                event.preventDefault();

                let maxResultsNum = $('#max-results').val();


                let statesArr = [];

                $.each($("input[name='state']:checked"), function() {
                    statesArr.push($(this).val());
                });

               console.log(maxResultsNum);
               console.log("States selected: " + statesArr.join(", "));
            
            });
        }

        $(function() {
            console.log('App loaded! Waiting for submit!');
            watchForm();
        });
        
    })
);