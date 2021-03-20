$(document).ready(function () {
  $('#test').on('click', function () {
    $("#closeModal").focus();
    $.ajax({
      type: 'GET',
      url: '/api/profile',
      beforeSend: function (xhr) {
        var token = localStorage.getItem('token');
        if (token === null) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }
      },
      success: function (data) {
        $('#modalMessage').text('Hello ' + data.name + '! You have successfully accessed to /api/profile.');
        // alert('Hello ' + data.name + '! You have successfully accessed to /api/profile.');
      },
      error: function () {
        $('#modalMessage').text("Sorry, you are not logged in.");
        // alert("Sorry, you are not logged in.");
      }
    });
  });
  $('#goodLogin').on('click', function () {
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
        $('#modalMessage').text('Got a token from the server! Token: ' + data.token);
        // alert('Got a token from the server! Token: ' + data.token);
      },
      error: function () {
        $('#modalMessage').text("Login Failed");
        // alert("Login Failed");
      }
    });
  });
  $('#badLogin').on('click', function () {
    $("#closeModal").focus();
    $.ajax({
      type: "POST",
      url: "/login",
      data: {
        username: "john.doe",
        password: "foobarfoobar"
      },
      success: function (data) {
        $('#modalMessage').text("ERROR: it is not supposed to alert.");
        // alert("ERROR: it is not supposed to alert.");
      },
      error: function () {
        $('#modalMessage').text("Login Failed");
        // alert("Login Failed");
      }
    });
  });
  $('#logout').on('click', function () {
    $("#closeModal").focus();
    if (localStorage.token) {
      var token = localStorage.getItem('token');
      if (token === null) {
        $('#modalMessage').text("Empty token");
        // alert("Empty token");
        return;
      }
      var parseJwtToken = parseJwt(token);
      console.log(parseJwtToken);
      if (parseJwtToken.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        $('#modalMessage').text("Token expired, logout successful");
        // alert("Token expired, logout successful");
      } else {
        localStorage.removeItem('token');
        $('#modalMessage').text("Logout successful");
        // alert("Logout successful");
      }
    } else {
      $('#modalMessage').text("No token");
      // alert("No token")
    }
  });

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
});
