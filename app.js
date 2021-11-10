import products from "./products.js"

const $contentContainer = document.querySelector(".content-container");
const $cartBtn = document.querySelector("[data-display=carts]");
const $productBtn = document.querySelector("[data-display=products]")
const $displayBtn = Array.from(document.querySelectorAll("[name=option]"));


let CARTS_TOTAL = 0;

// $ = DOM Elements
// ALL_CAPS = Variable Flag

function displayProduct() {
   for(let i = 0; i < products.length; i++){
      let $article = document.createElement('article');
      $article.classList.add('product');
      $article.dataset.id = i;
      $article.name = products[i].name;
      $article.innerHTML = `
     <span> <strong>${products[i].name}</strong> - ${products[i].price}</span>
     <button class="product-btn" data-action="add" onclick="add()" >Add to cart</button>
      `;
      $contentContainer.appendChild($article);
      const $addBtn = $article.querySelector('button[data-action=add]');
      $addBtn.onclick = function() {
         const id = $article.dataset.id;
         CARTS_TOTAL++;
         products[id].item_count++;
         $cartBtn.textContent = `Carts (${CARTS_TOTAL})`;
      }
   }
}

function displayCart() {
  if(CARTS_TOTAL > 0){
   for(let i = 0; i < products.length; i++){
      if(products[i].item_count) {
      let $article = document.createElement('article');
      $article.classList.add('product');
      $article.dataset.id = i;
      $article.name = products[i].name;
      $article.innerHTML = `
     <span> <strong>${products[i].name}</strong> - ${products[i].price} (${products[i].item_count})</span>
     <button class="product-btn" data-action="remove" >Remove from cart</button>
      `;
      $contentContainer.appendChild($article);
      const $removeBtn = $article.querySelector('button[data-action=remove]');
      $removeBtn.onclick = function() {
         const $article = this.parentElement;
         const id = $article.dataset.id;
      
         const name = $article.querySelector('span');
         CARTS_TOTAL--;
         products[id].item_count--
         if(CARTS_TOTAL <= 0){
            CARTS_TOTAL = 0;
            displayCart();
         }
         if(products[id].item_count <= 0){
            products[id].item_count = 0;
            $article.remove()
         }
         const cartsEmpty = CARTS_TOTAL <= 0 ? "" : `(${CARTS_TOTAL})`;
         name.innerHTML = `<strong>${products[id].name}</strong> - ${products[id].price} (${products[id].item_count})`;
         $cartBtn.textContent = `Carts ${cartsEmpty}`;
      }
         continue;
      }
   }
     return;
  }
  $contentContainer.innerHTML = `</p>No Item in the Cart!<p>`;
}

function removeOtherActive() {
   $displayBtn.forEach(btn => btn.classList.remove('active'));
}


function clickActive(e) {
   if(e.target.name == 'option'){
      removeOtherActive();
      const btn = e.target;
      btn.classList.add('active');
      console.log(btn)
      checkActive();
   }
}

function checkActive() {
   $displayBtn.forEach((btn) => {
      if(btn.classList.contains('active')){
         if(btn.dataset.display == 'products'){
            $contentContainer.innerHTML = "";
            btn.classList.add('active');
            displayProduct();
         }
         if(btn.dataset.display == 'carts'){
            $contentContainer.innerHTML = "";
            btn.classList.add('active');
            displayCart()
         }
      }
   })
}


window.addEventListener('click', clickActive)
checkActive()

