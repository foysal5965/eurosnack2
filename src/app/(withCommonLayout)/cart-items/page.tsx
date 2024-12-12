'use client'
import {
  Box,
  Button,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import { useCartsQuery, useRemoveFromCartMutation } from "@/redux/api/cartApi";
import Image from "next/image";
import Loading from "@/components/shared/loading/loading";
import Link from "next/link";

const CartItems = () => {
  const { data: carts, isLoading } = useCartsQuery({});
const [removeFromCart, {isLoading:removeLoading}] = useRemoveFromCartMutation()
const onRemove = async(id:string)=>{
  const res = await removeFromCart({productId:id})
  
}
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        p: 2,
        backgroundColor: "#f7f7f7",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "1200px",
        margin: "auto",
        mt: 8,
        mb: 8,
      }}
    >
      {/* Left Section: Cart Items Table */}
      <TableContainer
        component={motion.div}
        sx={{
          flex: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
         <Loading/>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carts?.data?.items?.length > 0 ? (
                carts?.data?.items?.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.product.image}
                        alt={item.product.productName}
                        height={60}
                        width={60}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                      />
                    </TableCell>
                    <TableCell>{item.product.productName}</TableCell>
                    <TableCell>৳{item?.price?.toFixed(2)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => onRemove(item.id)}
                        color="error"
                        disabled={removeLoading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography
                      variant="h6"
                      align="center"
                      color="text.secondary"
                    >
                      Your cart is empty!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Right Section: Cart Summary */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: 2,
          p: 3,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
        component={motion.div}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Summary
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="body1"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Subtotal:
          <span>TK{carts?.data?.totalPrice}</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Shipping Charge:
          <span>Tk{`50`}</span>
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Total:
          <span>{carts?.data?.totalPrice}</span>
        </Typography>
        <Link href='/checkout'>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            background: "linear-gradient(45deg, #4CAF50, #81C784)",
            fontWeight: "bold",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(45deg, #81C784, #4CAF50)",
            },
          }}
        >
          Proceed to Checkout
        </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CartItems;
