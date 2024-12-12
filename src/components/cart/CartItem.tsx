'use client';

import { Box, Grid, Typography, Button, IconButton, Divider } from "@mui/material";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
const CartItem = ({ item, onRemove }: { item: any; onRemove: (id: string) => void }) => (
  
    <Grid
      container
      alignItems="center"
      spacing={2}
      sx={{
        p: 2,
        borderRadius: 2,
        mb: 2,
      }}
    >
      {/* Product Image */}
      <Grid item xs={4} sm={3}>
        <Box
          sx={{
            width: "100%",
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: "#f9f9f9",
            borderRadius: 2,
          }}
        >
          <Image
            src={item.product.image || "/placeholder.png"}
            alt={item.product.image}
            width={80}
            height={80}
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Grid>
  
      {/* Product Details */}
      <Grid item xs={6} sm={7}>
        <Typography>
          {item.product.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: TK{item.product.prizeAfterDiscount.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity: {item.quantity}
        </Typography>
      </Grid>
  
      {/* Remove Button */}
      <Grid item xs={2}>
        <IconButton color="error" onClick={() => onRemove(item.id)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );

  export default CartItem