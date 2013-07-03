$(document).ready(function(){
  var player_x = "x";
  var player_o = "o";
  var player_x_array = [];
  var player_o_array = [];

  var turn_counter = 0;
  var active_player = [];

  var tiles = $('.tile');

  var all_winning_arrays = [
    ["0","1","2"],
    ["3","4","5"],
    ["6","7","8"],
    ["0","3","6"],
    ["1","4","7"],
    ["2","5","8"],
    ["0","4","8"],
    ["2","4","6"]
  ];

  // need to determine which player's turn it is with even/odd counter:
  var choose_player = function() {
    if (turn_counter % 2 == 0) {
      active_player.push(player_x);
      var player = $('#player_x');
      player.addClass('your_turn');
      player.append("<p> - It's your move!</p>");
    } else {
      active_player.push(player_o);
      var player = $('#player_o');
      player.addClass('your_turn');
      player.append("<p> - It's your move!</p>");
    }
  };

  // player needs to be chosen first on page load, so call it now:
  choose_player();

  // we will need to be able to switch the player after their click:
  var increment_turn_counter = function() {
    turn_counter++ ;
    active_player = [];
    var last_player = $('.your_turn');
    last_player.children("p").remove();
    last_player.removeClass('your_turn');
  };


  // when player x chooses tile, it appends an "x" to
  // the (div #board .tile) and adds a class "active" and "x" to the tile
  // and passes the id of that div into a player x array container

  var no_more_open_tiles = function() {
    return ($('.tile.active').size() == tiles.length);
  };

  var handle_click = function() {
    var tile = $(this);
    if (tile.hasClass('active')){
      return false;
    }
    activate_tile(tile);

    if (three_in_a_row() === true) {
      handle_win();
    }
    else if (no_more_open_tiles()) {
      handle_draw();
    }

    increment_turn_counter();
    choose_player();

  };

  var activate_tile = function(tile) {
    tile.addClass('active');

    if (active_player == "x") {
      player_x_array.push(tile.attr('id'));
      player_x_array.sort();
      tile.addClass('x');
      tile.append('x');
    }
    else if (active_player == "o") {
      player_o_array.push(tile.attr('id'));
      player_o_array.sort();
      tile.addClass('o');
      tile.append('o');
    }
  };

  // then, it needs to see if the players array now is equal to one of the 8 possible "win" arrays
  // loop through winning array, then,push any matching values into an array

  var is_winner = function(player_array) {
    for (var i = 0; i < all_winning_arrays.length; i++) {
      var potential_win = [];
      var winning_array = all_winning_arrays[i];
      for(var x = 0; x < winning_array.length; x++) {
        var needle = winning_array[x];
        var haystack = player_array;
        if ($.inArray(needle, haystack) > -1) {
          potential_win.push(needle);
          console.log(potential_win);
          if (potential_win.length == winning_array.length) {
            return true;
          }
        }
      }
    }
    return false;
  };


  var three_in_a_row = function(){
    if (is_winner(player_x_array) === true || is_winner(player_o_array) === true){
      return true;
    } else {
      return false;
    }
  };


  var handle_draw = function(){
    alert("It's a draw! :(");
    window.location.href = window.location.href;
  };

  var handle_win = function() {
    alert('Hey ' + active_player + ', You Win!');
    window.location.href = window.location.href;
  };

  $.each(tiles, function(index, tile) {
    var tile = $(tile);
    tile.on('click', handle_click);
  });




});
