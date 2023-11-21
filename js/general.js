var query = '1lb brisket and fries';
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
    headers: { 'X-Api-Key': 'uDN4wQU24vl2Tooft2QUKw==OvMggPCfr5kDUVFW'},
    contentType: 'application/json',
    success: function(result) {
        // Assuming the API response is JSON and contains a property 'data'
        var data = result.data;

        // Assuming you have an element with id 'nutrition-info' in your HTML
        var nutritionInfoElement = $('#nutrition-info');

        // Construct HTML content using the received data
        var htmlContent = '<h2>' + data.food + '</h2>';
        htmlContent += '<p>Calories: ' + data.calories + '</p>';
        htmlContent += '<p>Protein: ' + data.protein + '</p>';
        // Add more properties as needed

        // Update the HTML element with the generated content
        nutritionInfoElement.html(htmlContent);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
