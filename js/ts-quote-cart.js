/* 
TopSpot Quote Cart
TOC:
- Initialize
- Add Single Product to Cart (Choose one or the other)
- Add Multiple Table Products to Cart (Choose one or the other)
- Update Cart Items
- Trigger Cart
- Delete Cart Item
- Clear Cart
- Misc
*/

$(document).ready(function(){
    
    // INTIIALIZE ================================================================
    var cart = $('#ts-quote-cart-items');
    
    // ADD SINGLE PRODUCT TO CART ============================================================
    $('.ts-quote-add').click(function(e){
        e.preventDefault();
        cart.empty();
        
        // EDIT THIS & AJAX DATA LINE BELOW: Grab ID & data you want to build the cart item
        var parent = $(this).closest(".ts-quote-item");
        var pid = parent.attr("data-id");
        var name = parent.attr("data-name");
        var description = parent.attr("data-description");
        var quantity = parent.find('[name="quantity"]').val();
        
        // Pass ID & data you want updated to cart snippet
        $.ajax({
            type: 'post',
            data: {cart: 1, action: "add", pid: pid, name: name, description: description, quantity: quantity},
            success: function(response){
                // Populate cart
                cart.html(response);
                
                //Show message that 1 item was added to cart
                quantity = 1;
		        cartMessage(quantity);
                
                // Update cart count
                updateCount();
            },
            error: function(){
                console.log("error");
            }
        });
        
    });
  
	// UPDATE CART ITEM  ============================================================
	
	// On quantity text change
    $('#ts-quote-cart').on('blur', 'input[name="quantity"]', function(e){
        e.preventDefault();
        // Grab ID & data you want updated
        var parent = $(this).closest(".ts-quote-item");
        var pid = parent.attr("data-id");
        var quantity = $(this).val();
        var comments = parent.find('textarea').val();
        // Pass ID & data you want updated to cart snippet
        $.ajax({
            type: 'post',
            data: {cart: 1, action: "update", pid: pid, quantity: quantity, comments: comments},
            success: function(response){
                cart.html(response);
            },
            error: function(){
                console.log("error");
            }
        }); 
     });
     
     // On comments/notes text change (optional)
     $('#ts-quote-cart').on('blur', 'textarea[name="item-comments"]', function(e){
        e.preventDefault();
        console.log("typing");
        // Grab ID & data you want updated
        var parent = $(this).closest(".ts-quote-item");
        var pid = parent.attr("data-id");
        var quantity = 1;
        var comments = $(this).val();
        // Pass ID & data you want updated to cart snippet
        $.ajax({
            type: 'post',
            data: {cart: 1, action: "update", pid: pid, quantity: quantity, comments: comments},
            success: function(response){
                cart.html(response);
            },
            error: function(){
                console.log("error");
            }
        }); 
     });
     
     // On button click
     $('#ts-quote-cart').on('click', '.ts-quote-cart-update', function(e){
        e.preventDefault();
        
        // Grab ID & data you want updated
        var parent = $(this).closest(".ts-quote-item");
        var pid = parent.attr("data-id");
        var quantity = parent.find('[name="quantity"]').val();
        var comments = parent.find('textarea').val();
        // Pass ID & data you want updated to cart snippet
        $.ajax({
            type: 'post',
            data: {cart: 1, action: "update", pid: pid, quantity: quantity, comments: comments},
            success: function(response){
                cart.html(response);
            },
            error: function(){
                console.log("error");
            }
        }); 
     });
     
    // TRIGGER CART ============================================================
    $('.ts-quote-cart-trigger').click(function(e){
        e.preventDefault();
        $('#ts-quote-cart').toggle();
    });
    
    // DELETE ============================================================
    $('#ts-quote-cart').on('click', '.item-delete', function(e){
        e.preventDefault();
        // Find ID of item to delete & pass to snippet
        var parent = $(this).closest(".ts-quote-item");
        var pid = parent.attr("data-id");
        $.ajax({
            type: 'post',
            data: {cart: 1, action: "delete", pid: pid},
            success: function(response){
                cart.html(response);
                updateCount();
            },
            error: function(){
                console.log("error");
            }
        });             
    });
    
    // CLEAR CART ============================================================
    $('.ts-quote-empty').click(function(e){
        e.preventDefault();
        cart.empty();
        $.ajax({
            type: 'post',
            data: {cart: 1, action: "empty"},
            success: function(response){
                cart.html(response);
                updateCount();
            },
            error: function(){
                console.log("error");
            }
        });
    });
    
    // MISC ============================================================
    
    // Scroll to form from cart button
    if($('#ts-quote-cart').length){
        $('.cart-scroll').click(function(e){
            $('html, body').animate({
              scrollTop: $("#ts-quote-cart-form").offset().top - 200
            }, 500)
        });
    }

	// Message Popup
    $('#main-content').append("<div class='cart-message'></div>");
    function cartMessage(quantity){
    	if(quantity < 2){
            $('.cart-message').text("1 item has been added to your cart.");
        }else{
            $('.cart-message').text(quantity+ " items have been added to your cart.");
        }
        $('.cart-message').show();
        setTimeout(function(){
            $('.cart-message').fadeOut('slow');
        },1000); 
	}
	
	// Refresh Cart Count
    function updateCount(){
        $.ajax({
            type: 'post',
            data: {cart: 1, action: "recount"},
            success: function(response){
                $(".ts-quote-cart-count").text(response);    
            },
            error: function(){
                console.log("error");
            }
        });
    }    
    
});