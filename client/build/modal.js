const Modal = function(){
}


//Favourites modal:
Modal.prototype.createFavouritesModal = function(){
const modal = document.getElementById('favourites-modal');
const favouritesButton = document.getElementById('get-favourites-button');
const close = document.querySelector('.close')

favouritesButton.addEventListener('click', function(){
  console.log('Favourites Button Clicked');
  modal.style.display = 'block';
});

close.addEventListener('click', function(){
  modal.style.display = 'none';
});

document.addEventListener('click', function(){
  if(event.target === modal){
    modal.style.display = 'none';
  }
});
}


//Pop-up modal:
const modal2 = document.getElementById('modal-id2');
const modalButton2 = document.getElementById('modal-button2');
const close2 = document.querySelector('.close2')
const view = document.getElementsByClassName('view')

modalButton2.addEventListener('click', function(){
  modal2.style.display = 'block';
});

close2.addEventListener('click', function(){
  modal2.style.display = 'none';
});

for(item of view){
  item.addEventListener('click', function(){
    modal2.style.display = 'block';
  });
}

// view.addEventListener('click', function(){
//   modal2.style.display = 'block';
// })

document.addEventListener('click', function(){
  if(event.target == modal2){
    modal2.style.display = 'none';
  }
});



module.exports = Modal;
