// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
  
    //CRUD sequence

    // CREATE
    const createBurgerBtn = document.getElementById('create-form');
  
    if (createBurgerBtn) {
      createBurgerBtn.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const newBurger = {
          name: document.getElementById('burger').value.trim(),
          // devoured: document.getElementById('devoured').checked,
        };
  
        // Send POST request to create a new burger
        fetch('/api/burgers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
  
          // make sure to serialize the JSON body
          body: JSON.stringify(newBurger),
        }).then(() => {
          // Empty the form
          document.getElementById('burger').value = '';
          console.log(newBurger);
  
          // Success Message
          console.log('Created a new burger!');
          location.reload();
        });
      });
    }



    // UPDATE
    const changeDevourBtns = document.querySelectorAll('.change-devour');
  
    // Set up the event listener for the create button
    if (changeDevourBtns) {
      changeDevourBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
  
          const id = e.target.getAttribute('data-id');
          const newDev = e.target.getAttribute('devour');
  
          const newDevoured = {
            devoured: newDev,
          };


          fetch(`/api/burgers/${id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
  
            // Serialize the JSON body
            body: JSON.stringify(newDevoured),
          }).then((response) => {
            // Check that the response is good
            // Reload the page 
            if (response.ok) {
              console.log(`changed eaten to: ${newDev}`);
              location.reload('/');
            } else {
              alert('something went wrong!');
            }
          });
        });
      });
    }
  

  
    // DELETE
    const deleteBurgerBtns = document.querySelectorAll('.delete-burger');
  
    // Set up the event listeners for each delete button
    deleteBurgerBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
  
        // Send the delete request
        console.log("checking delete btn");
        fetch(`/api/burgers/${id}`, {
          method: 'DELETE',
        }).then((res) => {
          console.log(res);
          console.log(`Deleted burger: ${id}`);
  
          // Reload the page
          location.reload();
        });
      });
    });
  });