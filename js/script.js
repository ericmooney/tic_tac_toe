$(document).ready(function(){
  var player_x = "x";
  var player_o = "o";
  var player_x_array = [];
  var player_o_array = [];

  var turn_counter = 0;
  var active_player = [];

  var tiles = $('.tile');



  // need to determine which player's turn it is, perhaps an
  // "even" or "odd" counter?
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


  // when player x chooses tile, it should append an "x" to
  // the (div #board .tile) tile and add a class "x" to the tile
  // and passes the id of that div into a player x array container

  var handle_click = function() {
    var tile = $(this);
    if (tile.hasClass('active')){
      return false;
    }
    activate_tile(tile);


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
      tile.addClass('x');
      tile.append('x');
    }
    else if (active_player == "o") {
      player_o_array.push(tile.attr('id'));
      tile.addClass('o');
      tile.append('o');
    }
    console.log(player_x_array);
    console.log(player_o_array);
  };

  //then, it needs to see if the players array now is equal to one of the 8 possible "win" arrays
  // if it does not, add to the "increment_turn counter" and wait for next click

  // var is_game_over = function() {
  //   return ($('.tile.matched').size() == tiles.length);
  // };

  // var handle_win = function() {
  //   alert(active_player + 'You Win!');
  //   window.location.href = window.location.href;
  // };

  $.each(tiles, function(index, tile) {
    var tile = $(tile);
    tile.on('click', handle_click);
  });


});
