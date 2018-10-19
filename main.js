var orderArray = [];

$(document).ready(function() {
  handleClicks();
  $('.pointer').addClass('darken');
  strictMode.isItStrict = false;
  togglePower.status = false;
});

function handleClicks(){
  console.log('handleClicks()');
  $('#strict').on('click touchstart', toggleStrict);
  $('#power').on('click touchstart', togglePower);
  $('#restart').on('click touchstart', function(){
    reset();
  });
}

function playClicks(obj){
  console.log('playClicks()');
  $('#' + obj.target.id).removeClass('bright');
  checkInput(obj);
  playSound(parseInt(obj.target.attributes.value.value));
}

function toggleStrict(){
  console.log('toggleStrict()');
  strictMode.isItStrict = !strictMode.isItStrict;
  if(strictMode.isItStrict){
    $('.strictDisplay').text('Strict mode on');
  }else{
    $('.strictDisplay').text('Strict mode off');
  }
}

function strictMode(){
  console.log('strictMode()');
  return strictMode.isItStrict;
}

function togglePower(){
  console.log('togglePower()');
  togglePower.status = !togglePower.status;

  if(togglePower.status){
    $('.pointer').removeClass('darken');
    turnOnTouch();
    playList();
  }else{
    $('.pointer').addClass('darken');
    turnOffTouch();
  }
}

function turnOffTouch(){
  console.log('turnOffTouch()');
  $('.game-button').off('mouseup');
  $('.game-button').off('mousedown');
}

function turnOnTouch(){
  console.log('turnOnTouch()');
  $('.game-button').on('mousedown', function(obj){
    $('#' + obj.target.id).addClass('bright');
  });
  $('.game-button').on('mouseup', playClicks);
}

function checkInput(obj){
  console.log('checkInput()');
  if(orderArray[playList.index] != obj.target.attributes.value.value){
    playError();
    if(strictMode()){
      pauseForLosing();
      setTimeout(function(){
        reset();
      }, 2000);
    }else{
      playList();
    }
  }
  else{
    playList.index++;
  }

  if(playList.index == orderArray.length){
    addNewList();
  }
}

function playError(){
  console.log('playError');
  var error = new Audio('http://soundbible.com/mp3/Air%20Horn-SoundBible.com-964603082.mp3');
  error.play();
}

function playList(){
  console.log('playList()');
  if(!checkWin()){
    playList.index = 0;
    turnOffTouch();

    if (orderArray.length == 0){
      orderArray.push( Math.floor(Math.random()*4));
    }

    var i = 0;

    function loopArray(){
      if(i != orderArray.length){
        setTimeout(function()
        {
          playSound(orderArray[i]);
          i++;
          loopArray();
        }, 500);
      }
      else{
        turnOnTouch();
      }
    }
    loopArray();
  }
}

function playSound(code){
  var url = '';
  var color = '';

  switch(code){
    case 0:
      url = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
      color = 'green';
      break;
    case 1:
      url = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
      color = 'red';
      break;
    case 2:
      url = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
      color = 'yellow';
      break;
    case 3:
      url = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
      color = 'blue';
      break;
  }

  var sound = new Audio(url);
  sound.play();
  $('#' + color).addClass('bright');
  setTimeout(function (){
    $('#' + color).removeClass('bright');
  }, 200);
}

function addNewList(){
  console.log('addNewList');
  orderArray.push( Math.floor(Math.random()*4) );
  $('.counter').text( parseInt($('.counter').text()) + 1);
  playList();
}

function reset(){
  console.log('reset');
  $('.power').text('POWER');
  orderArray = [];
  $('.counter').text('0');
  turnOnTouch();
  togglePower.toggleStatus = true;
  playList();
}

function checkWin(){
  console.log('checkWin()');
  if (parseInt($('.counter').text()) > 19){
    turnOffTouch();
    $('.power').text('YOU WIN');
    togglePower();
    setTimeout(function (){
      reset();
    }, 3000);
    return true;
  }

  return false;
}

function pauseForLosing(){
  console.log('pauseForLosing()');
  turnOffTouch();
  togglePower();
  $('.power').text('YOU LOSE');
}
