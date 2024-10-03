const cart = document.querySelector('.cart');
const dropdown = document.querySelector('.dropdown');
const overlay = document.querySelector('.overlay');
const notification = document.querySelector('.notification');
const modal = document.querySelector('.modal')
const quantity = document.querySelector('.quantity');
const cartEmpty = document.querySelector('.empty');
const cartHasItem = document.querySelector('.has-item');
const cardPrice = document.querySelector('.card__price');
const cardQuantity = document.querySelector('.card__quantity');
const cardTotal = document.querySelector('.card__total');
const divThumbnails = document.querySelectorAll('.thumb-wrapper');
const thumbnails = document.querySelectorAll('#product__thumbnail');
const image = document.getElementById('product__image');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.getElementById('lightbox__image');
const lightBoxDivThumbnails = document.querySelectorAll('.lightbox__thumb-wrapper');
const lightboxThumbnail = document.querySelectorAll('#lightbox__thumbnail');
const sidebar = document.querySelector('.sidebar');
const sidebarLinks = document.querySelector('.navbar__group');
const plusBtn = document.querySelector('.btn-plus');
const minusBtn = document.querySelector('.btn-minus');
const deleteBtn = document.querySelector('.delete-btn');
const cartBtn = document.querySelector('.btn-cart');
const closeBtn = document.querySelector('.close-lightbox');
const modalBtn = document.querySelector('.modal__btn');
const lightboxNextBtn = document.querySelector('.lightbox__next');
const lightboxPrevBtn = document.querySelector('.lightbox__previous');
const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const openBtn = document.querySelector('.icon-menu');
const closeMenuBtn = document.querySelector('.close-menu');



let price = 125;
let counter = 0;

// Cart Events 

// verify if the cart is empty

const isCartEmpty = () => {
    if (counter === 0) {
        cartEmpty.classList.remove('hidden');
    }
}

// modify quantity of the item

const incrementQuantity = () => {
    if (counter < 5) {
        counter++;
    }
    quantity.innerHTML = counter;
    }

const decrementQuantity = () => {
    if (counter > 0) {
        counter--;
    }
    quantity.innerHTML = counter;
}

// calculate the total price of the checkout 

const totalCheckout = () => {
    cardPrice.innerHTML = `$${price}.00`;
    cardQuantity.innerHTML = `x ${counter}`;
    cardTotal.innerHTML = `$${price * counter}.00`;
}

// Open dropdown cart 

cart.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
    cart.classList.toggle('cart-hover');
    isCartEmpty();
})


// Close dropdown cart 

image.addEventListener('click', () => {
    dropdown.classList.add('hidden');
})

window.addEventListener('click', (e) => {
    if (!cart.contains(e.target) && !deleteBtn.contains(e.target)) {
        dropdown.classList.add('hidden');
        cart.classList.remove('cart-hover');
    }
})


plusBtn.addEventListener('click', () => { incrementQuantity() })
minusBtn.addEventListener('click', () => { decrementQuantity() })

// add item to cart

cartBtn.addEventListener('click', () => {
    if (quantity.innerHTML != 0) {
        notification.innerHTML = counter;
        notification.classList.remove('hidden');
        cartHasItem.classList.remove('hidden');
        cartEmpty.classList.add('hidden');
        totalCheckout();
    } else {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }
})

// delete item from cart 

deleteBtn.addEventListener('click', () => {
    cartHasItem.classList.add('hidden');
    cartEmpty.classList.remove('hidden');
    notification.classList.add('hidden');
})

// Close Modal 

const closeModal = () => {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
}

modalBtn.addEventListener('click', () => {
    closeModal();
})


// Images and LightBox Events 

// Switch images for lightbox and gallery 

const switchImg = (index) => {
    const selectedImg = thumbnails[index];
    const selectedDiv = divThumbnails[index];
    const selectedLightboxImg = lightboxThumbnail[index];
    const selectedLightboxDiv = lightBoxDivThumbnails[index];


    thumbnails.forEach(thumb => thumb.classList.remove('selected'));
    divThumbnails.forEach(thumb => thumb.classList.remove('selected-div'));
    lightBoxDivThumbnails.forEach(thumb => thumb.classList.remove('selected-div'));
    lightboxThumbnail.forEach(thumb => thumb.classList.remove('selected'));
    selectedImg.classList.add('selected');
    selectedDiv.classList.add('selected-div');
    selectedLightboxDiv.classList.add('selected-div');
    selectedLightboxImg.classList.add('selected');
    const imgPath = selectedImg.src.replace('-thumbnail', '');
    image.src = imgPath;
    lightboxImage.src = imgPath;
} 

thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        switchImg(index);
    })
});

lightboxThumbnail.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        switchImg(index);
    })
});

// Open Lightbox 

const openLightbox = () => {
    lightbox.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

image.addEventListener('click', () => {
    if (window.outerWidth > 480) {
        openLightbox()
    }
 })

// Close Lightbox 

const closeLightbox = () => {
    lightbox.classList.add('hidden');
    overlay.classList.add('hidden');
}

closeBtn.addEventListener('click', () => { closeLightbox() })

// Close Lightbox when clicking on overlay 

overlay.addEventListener('click', () => {
    closeLightbox();
    closeModal();
    closeSidebar();
}) 



// Slider 

const arrowClick = (direction) => {
    const indexImg = Array.from(thumbnails).findIndex(thumb => thumb.classList.contains('selected'));
    const newIndexImg = (indexImg + direction + thumbnails.length) % thumbnails.length;
    switchImg(newIndexImg)
}

lightboxPrevBtn.addEventListener('click', () => {
    arrowClick(-1)
})

lightboxNextBtn.addEventListener('click', () => {
    arrowClick(1);
})

prevBtn.addEventListener('click', () => {
    arrowClick(-1);
})

nextBtn.addEventListener('click', () => {
    arrowClick(1);
})


// Sidebar Events

// Open Sidebar 

openBtn.addEventListener('click', () => {
    openBtn.classList.add('hidden');
    sidebar.classList.add('open');
    sidebarLinks.style.display = 'flex';
    overlay.classList.remove('hidden');
    closeMenuBtn.classList.remove('hidden');
})


// Close Sidebar 

const closeSidebar = () => {
    if (window.innerWidth < 768) {
        sidebar.classList.remove('open');
        sidebarLinks.style.display = 'none';
        openBtn.classList.remove('hidden');
        closeMenuBtn.classList.add('hidden');
        overlay.classList.add('hidden');
    }
}

closeMenuBtn.addEventListener('click', () => {
    closeSidebar();
})