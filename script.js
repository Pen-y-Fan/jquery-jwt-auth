$(document).ready(function () {
  $('#test').on('click', function () {
    displaySpinner()
    $("#closeModal").focus();
    $.ajax({
      type: 'GET',
      url: '/api/profile',
      beforeSend: function (xhr) {
        var token = localStorage.getItem('token');
        if (token) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }
      },
      success: function (data) {
        $('#modalMessage').html('Hello ' + data.name + '! You have successfully accessed to /api/profile.');
      },
      error: function () {
        $('#modalMessage').html("Sorry, you are not logged in.");
        $("#closeModal").focus();
      }
    });
  });

  $('#goodLogin').on('click', function () {
    displaySpinner()
    $("#closeModal").focus();
    $.ajax({
      type: "POST",
      url: "/login",
      data: {
        username: "john.doe",
        password: "foobar"
      },
      success: function (data) {
        localStorage.setItem('token', data.token);
        var message = "<div class=\"d-inline-block text-wrap\">Got a token from the server! Token:<br/>";
        message += data.token + "</div>"
        $('#modalMessage').html(message);
      },
      error: function () {
        $('#modalMessage').html("Login Failed");
      }
    });
  });

  $('#badLogin').on('click', function () {
    displaySpinner()
    $("#closeModal").focus();
    $.ajax({
      type: "POST",
      url: "/login",
      data: {
        username: "john.doe",
        password: "foobarfoobar"
      },
      success: function () {
        $('#modalMessage').html("ERROR: it is not supposed to alert.");
      },
      error: function () {
        $('#modalMessage').html("Login Failed");
      }
    });
  });

  $('#logout').on('click', function () {
    displaySpinner()
    $("#closeModal").focus();
    var $modalMessage = $('#modalMessage');
    var token = localStorage.getItem('token');
    if (!token) {
      $modalMessage.html("No token");
      return;
    }
    var parseJwtToken = parseJwt(token);
    if (parseJwtToken.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      $modalMessage.html("Token expired, logout successful");
      return;
    }
    localStorage.removeItem('token');
    $modalMessage.html("Logout successful");
  });

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  function displaySpinner() {
    var spinner = '<img alt="loading spinner"';
    spinner += 'src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"';
    spinner += 'height="200" width="200">';
    $("#modalMessage").html(spinner);
  }
});
