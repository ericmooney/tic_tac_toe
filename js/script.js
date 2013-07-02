$(document).ready(function(){
  var player_x = "x";
  var player_o = "o";
  var player_x_array = [];
  var player_o_array = [];

  var turn_counter = 0;
  var active_player = [];

  var tiles = $('.tile');



  // need to determine which player's turn it is with even/odd counter:
  var choose_player = function() {
    if (turn_counter % 2 == 0) {
      active_player.push(player_x);
    } else {
      active_player.push(player_o);
    }
  };

  // player needs to be chosen first on page load, so call it now:
  choose_player();

  // we will need to be able to switch the player after their click:
  var increment_turn_counter = function() {
    turn_counter++ ;
    active_player = [];
  };


  // when player x chooses tile, it appends an "x" to
  // the (div #board .tile) and adds a class "active" and "x" to the tile
  // and passes the id of that div into a player x array container

  var handle_click = function() {
    var tile = $(this);
    if (tile.hasClass('active')){
      return false;
    }
    activate_tile(tile);

    // this is what I'm working on right now
    // if (is_game_over()) {
    //   handle_win();
    // }


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
    console.log(player_x_array);
    console.log(player_o_array);
  };

  // then, it needs to see if the players array now is equal to one of the 8 possible "win" arrays


  // ****I need to do more work around handling this possibility - especially in the var handle_win
  // and need to add to is_game_over possibilities -> || no_more_open_tiles()
  // var no_more_open_tiles = function() {
  //   return ($('.tile.active').size() == tiles.length);
  // }


// loop through winning array, then,push any matching values into an array
  // var is_player_x_winner = function(player_x_array) {

  //   var all_winning_arrays = [
  //     ["0","1","2"]
  //     // ["3","4","5"],
  //     // ["6","7","8"],
  //     // ["0","3","6"],
  //     // ["1","4","7"],
  //     // ["2","5","8"],
  //     // ["0","4","8"],
  //     // ["2","4","6"]
  //   ];

  //   for (var x = 0; x < all_winning_arrays.length; x++) {
  //     var winning_array =
  //     for (var i = 0; i < player_x_array.length; i++) {
  //       var potential_win = [];
  //       if ($.inArray(i, x) > -1) {
  //         potential_win.push(i);
  //       }
  //         if (potential_win.length == 3){
  //           return true;
  //         }
  //     }
  //   }
  // };

  // var is_game_over = function() {
  //   return three_in_a_row();
  // };

  // var three_in_a_row = function(){
  //   if (is_player_x_winner() === true){
  //     return true;
  //   }
  //   else if (is_player_o_winner() === true) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // };




  var handle_win = function() {
    alert('Hey ' + active_player + ', You Win!');
    window.location.href = window.location.href;
  };

  $.each(tiles, function(index, tile) {
    var tile = $(tile);
    tile.on('click', handle_click);
  });


});
