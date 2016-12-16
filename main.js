$(document).ready( function (){
  var $normJobTitles = $('#normJobTitles')
  $( "#formJobTitle" ).on( "submit", function( event ) {
  event.preventDefault();
  console.log( $( this ).serialize() );
  $.ajax({
      type: 'GET',
      url: 'http://api.dataatwork.org/v1/jobs/normalize?' + $( this ).serialize() + '&limit=10',
      headers:{'Accept': 'application/json'},
      success: function(data) {
        console.log('success', data)
        $.each(data, function(i,order) {
          $normJobTitles.append('<li>Title: ' + order.title + ', Relevance Score: ' + order.relevance_score + '</li>');
          //$slt_country.append('<option value="'+ order.uuid + '">' + order.title + '</option>');
          $('#select_title').append($('<option/>', {
              value: order.uuid,
              text : 'Title: ' + order.title + ', Relevance Score: ' + order.relevance_score
          }));
        });
      }
    })
  });

//submit chosen title for related skills
  $( "#formJobTitleNormalized" ).on( "submit", function( event ) {
  event.preventDefault();
  console.log( $(this).serialize() );
  console.log( $(this));
  console.log( $('#select_title'));
  console.log( $('#select_title').val());
  $.ajax({
      type: 'GET',
      url: 'http://api.dataatwork.org/v1/jobs/' + $('select[name="jobTitleSelect"]').val() + '/related_skills',
      headers:{'Accept': 'application/json'},
      success: function(data) {
        console.log('success', data)
        $.each(data.skills, function(i,order) {
          $('#relatedSkills').append('<li><b>' + order.skill_name + '</b>: ' + order.description + '</li>');
        });
      }
    })
  });

})

// var selected_index = oForm.elements["country"].selectedIndex;
//
// if(selected_index > 0)
// {
//    var selected_option_value = oForm.elements["country"].options[selected_index].value;
//    var selected_option_text = oForm.elements["country"].options[selected_index].text;
// }
// else
// {
//    alert('Please select a country from the drop down list');
// }
