import { Box, Button, Divider, Typography } from "@mui/material";
import CartItem from "./CartItem";
import Link from "next/link";

const Cart = ({ cartItems, onRemove, onCheckout,handleMenuClose }: { cartItems: any; onRemove: (id: string) => void; onCheckout: () => void,handleMenuClose:()=>void }) => {
 
  

  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
        maxWidth: { xs: "100%", sm: 600, md: 400 }, // Responsive max-width
        
        backgroundColor: "#f7f7f7",
        borderRadius: 2,
      }}
    >
    
      <Divider sx={{ mb: 1 }} />

      {/* Cart Items */}
      {cartItems?.items?.length > 0 ? (
        cartItems?.items?.map((item:any) => (
          <CartItem key={item.id} item={item} onRemove={onRemove} />
        ))
      ) : (
        <Typography variant="h6" align="center" color="text.secondary" sx={{ my: 5 }}>
          Your cart is empty!
        </Typography>
      )}

      {/* Cart Total & Checkout */}
      {cartItems && (
        <Box sx={{ mt: 1 }}>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="h6" fontWeight="bold" textAlign="right" sx={{ mb: 2 }}>
          Total: TK{cartItems.totalPrice}
        </Typography>
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" }, 
            gap: 2, 
            justifyContent: "center", 
            alignItems: "center" 
          }}
        >
          {/* View Cart Button */}
         <Link href='/cart-items'>
         <Button
            variant="outlined"
            sx={{
              flex: 1,
              py: 1.5,
              fontWeight: "bold",
              maxWidth: { sm: "250px", md: "300px" }, // Limit max width
             
              borderColor: "linear-gradient(45deg, #4CAF50, #81C784)",
              "&:hover": {
                background: "linear-gradient(45deg, #4CAF50, #81C784)",
                color:'white'
                // Subtle background on hover
              },
            }}
            onClick={handleMenuClose}
          >
            View Cart
          </Button>
         </Link>
      
          {/* Proceed to Checkout Button */}
          <Link href='/checkout'>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              py: 1.5,
              background: "linear-gradient(45deg, #4CAF50, #81C784)",
              fontWeight: "bold",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(45deg, #81C784, #4CAF50)",
              },
              maxWidth: { sm: "250px", md: "300px" }, // Limit max width
            }}
            onClick={handleMenuClose}
          >
            Checkout
          </Button>
          </Link>
        </Box>
      </Box>
      
      )}
    </Box>
  );
};

export default Cart;
