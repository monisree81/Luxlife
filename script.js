document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
          });
        } else {
          gsap.set(entry.target, { opacity: 0, y: 20 });
        }
      });
    }, { threshold: 0.3 }); // Trigger when 10% of the card is in view

    cards.forEach(card => {
      observer.observe(card);
    });
  });

  function filterCards(category) {
    const cards = document.querySelectorAll('.card');
    
    if (category === 'all') {
      cards.forEach(card => {
        card.style.display = 'block'; // Show all cards
        card.classList.add('visible');
      });
    } else {
      cards.forEach(card => {
        if (card.classList.contains(category)) {
          card.style.display = 'block'; // Show cards with the matching class
          card.classList.add('visible');
        } else {
          card.style.display = 'none'; // Hide cards that don't match
          card.classList.remove('visible');
        }
      });
    }
  }

  //cart
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            const id = card.getAttribute('data-id');
            const name = card.querySelector('.card-title').textContent;
            const price = card.querySelector('.card-title').textContent;
            const imgSrc = card.querySelector('.card-img-top').src;
            const description = card.querySelector('.card-text').textContent;

            const product = {
                id,
                name,
                price,
                imgSrc,
                description
            };

            // Retrieve existing cart items from local storage
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if the product is already in the cart
            const existingProduct = cart.find(item => item.id === product.id);
            if (!existingProduct) {
                // Add the new product to the cart
                cart.push(product);
                // Save the updated cart back to local storage
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Product added to cart!');
            } else {
                alert('Product is already in the cart.');
            }
        });
    });
});
