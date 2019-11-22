$('.cnnix-cards__filter-buttons-wrapper').on('click', 'button', function() {
    let filterValue = $(this).attr('data-filter');
    let sortValue = $(this).attr('data-sort');
    //console.log(sortValue);

    $cardSort.isotope({ 
      filter: filterValue, 
      sortBy: sortValue, 
      sortAscending: true
    });

  //hide/show glossary based on card filterValue
  if (filterValue === '*') {
      $('.card').hide();
  } else {
      $('.card').hide();
      $('.card' + filterValue).show();
  }

   // Add or remove active class on button group
    $('button.active').not(this).removeClass('active');
     $(this).addClass('active');
});