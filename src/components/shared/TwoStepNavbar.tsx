'use client';

import { useState, MouseEvent, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    TextField,
    Tooltip,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Paper,
    ListItemButton,
    InputAdornment,
    Avatar,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Favorite as FavoriteIcon,
    ShoppingCart as ShoppingCartIcon,
    AccountCircle as AccountCircleIcon,
    Compare as CompareIcon,
    HeadsetMic as HeadsetMicIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useAuth } from "@/lib/Providers/AuthProvider";
import LogoutIcon from "@mui/icons-material/Logout";
import { useProductsQuery } from "@/redux/api/productApi";
import { useDebounced } from "@/redux/hooks";
import SearchIcon from '@mui/icons-material/Search';
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useBrandsQuery } from "@/redux/api/brandApi";
import { IBrand, ICategory } from "@/types";
import Cart from "../cart/Cart";
import { useCartItemsQuery, useCartsQuery, useRemoveFromCartMutation } from "@/redux/api/cartApi";
import { getCart } from "@/services/actions/getCart";
interface User {
    email: string | null;
    // other properties if any
  }
  interface AuthContext {
    user: User | null;
    logout: () => void;
  }
const TwoStepNavbar = () => {
    const [anchorElDropdown, setAnchorElDropdown] = useState<null | HTMLElement>(null);
    const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);
    const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerDropdownOpen, setDrawerDropdownOpen] = useState<{ [key: string]: boolean }>({});
    const { logout, user } = useAuth();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [anchorElCategories, setAnchorElCategories] = useState<null | HTMLElement>(null);
    const [anchorElBrands, setAnchorElBrands] = useState<null | HTMLElement>(null);
    const [selectedItem, setSelectedItem] = useState<string>("");
    const [cart, setCart] = useState([]);
    const query: Record<string, any> = {};
    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600,
    });
    if (!!debouncedTerm) {
        query["searchTerm"] = searchTerm;
    }

    const { data, isLoading } = useProductsQuery({ ...query })
    const { data: categories } = useCategoriesQuery({})
    const { data: brands } = useBrandsQuery({})
    //@ts-ignore
    const { data: carts } = useCartsQuery({}, { skip: !user?.email })
    // const {data:cartItemss}= useCartItemsQuery({})


    const filteredProducts = data?.data.filter((product: any) =>
        product.productName.toLowerCase().includes(debouncedTerm.toLowerCase())
    );

    const handleSearchFocus = () => setShowSuggestions(true);
    const handleSearchBlur = () => {
        // Add delay to allow click events on suggestions to register
        setTimeout(() => setShowSuggestions(false), 150);
    };

    // Handlers for Dropdowns
    const handleDropdownClick = (event: React.MouseEvent<HTMLElement>, item: string) => {
        setSelectedItem(item);
        if (item === "Trending Categories" || item === 'Categories') {
            setAnchorElCategories(event.currentTarget);
            setAnchorElBrands(null); // Close brands dropdown if categories are opened
        } else if (item === "Brands") {
            setAnchorElBrands(event.currentTarget);
            setAnchorElCategories(null); // Close categories dropdown if brands are opened
        }
    };

    const handleDropdownClose = () => {
        setAnchorElCategories(null);
        setAnchorElBrands(null);
    };

    const handleCartClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorElCart(event.currentTarget);
    };

    const handleCartClose = () => {
        setAnchorElCart(null);
    };

    const handleAccountClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorElAccount(event.currentTarget);
    };

    const handleAccountClose = () => {
        setAnchorElAccount(null);
    };
    const handleMenuClose = () => {
        setAnchorElCart(null);
        setAnchorElAccount(null);
    };
    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    const toggleDrawerDropdown = (key: string) => {
        setDrawerDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    const handleMenuItemClick = (item: { id: string, title: string }) => {
        handleDropdownClose();
    };
    const handleDropdownOptionClick = () => {

        toggleDrawer(false); // Close the drawer after selecting an option
    };
    const categoriesWithDropdown = ["Trending Categories", "Brands", "Categories", "Others"];

    const [removeFromCart] = useRemoveFromCartMutation()


    const handleRemove = async (id: string) => {
        const res = await removeFromCart({ productId: id })

    };

    const handleCheckout = () => {
        console.log("Proceeding to checkout");
    };
    return (
        <Box>
            {/* Step 1: Primary Navbar */}
            <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #4CAF50, #81C784)', color: "#fff" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* Hamburger Menu (Visible on Small Screens) */}
                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                        <IconButton sx={{ color: "#fff" }} onClick={() => toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="left"
                            open={drawerOpen}
                            onClose={() => toggleDrawer(false)}
                            sx={{
                                width: 300, // Change the width as per your requirement
                                flexShrink: 0, // Ensure the drawer doesn't shrink
                                "& .MuiDrawer-paper": {
                                    width: 300, // Set the width of the drawer
                                    boxSizing: 'border-box', // Ensure padding and margin are considered within the width
                                },
                            }}
                        >
                            <List>
                                {[
                                    "Home",
                                    "Shops",
                                    "Trending Categories",
                                    "Brands",
                                    "Categories",
                                    "Others",
                                    "Contact Us",
                                ].map((text, index) => (
                                    <Box key={index}>
                                        <ListItem
                                            component="button"
                                            onClick={() => {
                                                // Set specific links for Home, Shops, and Contact Us
                                                if (text === "Home") {
                                                    window.location.href = "/";
                                                } else if (text === "Shops") {
                                                    window.location.href = "/shops";
                                                } else if (text === "Contact Us") {
                                                    window.location.href = "/contact-us";
                                                } else if (["Trending Categories", "Brands", "Categories", "Others"].includes(text)) {
                                                    toggleDrawerDropdown(text);
                                                }
                                            }}
                                            sx={{
                                                borderBottom: "1px solid #ddd", // Add a light border under each menu item
                                            }}
                                        >
                                            <ListItemText primary={text} />
                                            {["Trending Categories", "Brands", "Categories", "Others"].includes(text) &&
                                                (drawerDropdownOpen[text] ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
                                        </ListItem>

                                        {["Trending Categories", "Brands", "Categories", "Others"].includes(text) && (
                                            <Collapse in={drawerDropdownOpen[text]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {text === "Trending Categories" &&
                                                        categories?.data?.map((category: any) => (
                                                            <ListItem
                                                                key={category.id}
                                                                onClick={handleDropdownOptionClick}
                                                                sx={{
                                                                    cursor: "pointer",
                                                                    borderBottom: "1px solid #ddd", // Border under each sub-option
                                                                }}
                                                            >
                                                                <Link href={`/shops/category/${category.id}`}>
                                                                    <ListItemText primary={category.title} />
                                                                </Link>
                                                            </ListItem>
                                                        ))}
                                                    {text === "Brands" &&
                                                        brands?.data?.map((brand: any) => (
                                                            <ListItem
                                                                key={brand.id}
                                                                onClick={handleDropdownOptionClick}
                                                                sx={{
                                                                    cursor: "pointer",
                                                                    borderBottom: "1px solid #ddd", // Border under each sub-option
                                                                }}
                                                            >
                                                                <Link href={`/shops/brand/${brand.id}`}>
                                                                    <ListItemText primary={brand.title} />
                                                                </Link>
                                                            </ListItem>
                                                        ))}
                                                    {text === "Categories" &&
                                                        categories?.data?.map((category: any) => (
                                                            <ListItem
                                                                key={category.id}
                                                                onClick={handleDropdownOptionClick}
                                                                sx={{
                                                                    cursor: "pointer",
                                                                    borderBottom: "1px solid #ddd", // Border under each sub-option
                                                                }}
                                                            >
                                                                <Link href={`/shops/category/${category.id}`}>
                                                                    <ListItemText primary={category.title} />
                                                                </Link>
                                                            </ListItem>
                                                        ))}
                                                    {text === "Others" &&
                                                        ["Option 1", "Option 2", "Option 3"].map((subOption, subIdx) => (
                                                            <ListItem
                                                                component="button"
                                                                key={subIdx}
                                                                onClick={handleDropdownOptionClick}
                                                                sx={{
                                                                    borderBottom: "1px solid #ddd", // Border under each sub-option
                                                                }}
                                                            >
                                                                <ListItemText primary={subOption} />
                                                            </ListItem>
                                                        ))}
                                                </List>
                                            </Collapse>
                                        )}
                                    </Box>
                                ))}
                            </List>

                        </Drawer>



                    </Box>

                    {/* Logo */}
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        EuroSnack
                    </Typography>
                    {/* Centered Search Bar (Visible on Large Screens) */}
                    <Box sx={{ display: { xs: "none", lg: "flex" }, justifyContent: "center", flexGrow: 1 }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search products..."
                            size="small"
                            sx={{
                                width: "100%",
                                maxWidth: "800px",
                                bgcolor: "#f0f0f0",
                                borderRadius: "4px",
                            }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={handleSearchFocus}
                            onBlur={handleSearchBlur}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "gray" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {showSuggestions && filteredProducts?.length > 0 && (
                            <Paper
                                elevation={3}
                                sx={{
                                    position: "absolute",
                                    top: "55px", // Adjust if necessary to align with the search box
                                    left: '175px',
                                    right: 0,
                                    zIndex: 10,// Ensures it matches the width of the search box
                                    maxWidth: '800px',
                                    width: '100%',
                                    overflowY: "auto",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional for better styling
                                }}
                            >
                                <List>
                                    {filteredProducts.map((product: any) => (
                                        <ListItemButton
                                            key={product.id}
                                            onClick={() => {
                                                setSearchTerm(product.productName);
                                                setShowSuggestions(false);
                                            }}
                                            sx={{
                                                padding: "8px 16px",
                                                "&:hover": { backgroundColor: "#f9f9f9" }, // Adds a hover effect
                                            }}
                                        >
                                            <Link href={`/product-details/${product.id}`}>
                                                <ListItemText primary={product.productName} />
                                            </Link>
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Paper>
                        )}

                    </Box>
                    {/* User Action Icons with Text */}
                    <Box sx={{ display: "flex", gap: 3 }}>
                        {/* Compare Icon */}
                        <Tooltip title="Compare">
                            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: "center", gap: 1 }}>
                                <IconButton sx={{ color: "#fff" }}>
                                    <CompareIcon />
                                </IconButton>
                                <Typography sx={{ display: { xs: "none", lg: "block" } }}>Compare</Typography>
                            </Box>
                        </Tooltip>

                        {/* Wishlist Icon */}
                        <Tooltip title=''>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <IconButton sx={{ color: "#fff" }}>
                                    <FavoriteIcon />
                                </IconButton>
                                <Typography sx={{ display: { xs: "none", lg: "block" } }}>Wishlist</Typography>
                            </Box>
                        </Tooltip>

                        {/* Cart Icon with Dropdown */}
                        <Tooltip title="">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <IconButton sx={{ color: "#fff" }} onClick={handleCartClick}>
                                    <ShoppingCartIcon />
                                </IconButton>
                                <Typography sx={{ display: { xs: "none", lg: "block" } }}>Cart</Typography>

                                {/* Cart Menu */}
                                <Menu
                                    anchorEl={anchorElCart}
                                    open={Boolean(anchorElCart)}
                                    onClose={handleMenuClose}
                                    MenuListProps={{
                                        "aria-labelledby": "cart-button",
                                    }}
                                >
                                    {
                                        user?.email ? (<Cart cartItems={carts?.data} onRemove={handleRemove} onCheckout={handleCheckout} handleMenuClose={handleMenuClose} />) : (<p>Please log in to view your cart</p>)
                                    }

                                </Menu>
                            </Box>
                        </Tooltip>

                        {/* Account Icon with Dropdown */}
                        {/* Account Icon with Dropdown */}
                        <Tooltip title="">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <IconButton sx={{ color: "#fff" }} onClick={handleAccountClick}>
                                    <AccountCircleIcon />
                                </IconButton>
                                <Typography sx={{ display: { xs: "none", lg: "block" } }}>Account</Typography>

                                {/* Account Menu */}
                                <Menu
                                    anchorEl={anchorElAccount}
                                    open={Boolean(anchorElAccount)}
                                    onClose={handleMenuClose}
                                    MenuListProps={{
                                        "aria-labelledby": "account-button",
                                    }}
                                    sx={{
                                        padding: 2,
                                        borderRadius: 1,
                                        minWidth: "200px", // Adjust width if needed
                                    }}
                                >
                                    {user ? (
                                        <>
                                            {/* Order Tracking */}
                                            <MenuItem onClick={handleMenuClose}>
                                                <Link href="/order-tracking" passHref>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <LocalShippingIcon />
                                                        <Typography sx={{ color: "inherit" }}>Order Tracking</Typography>
                                                    </Box>
                                                </Link>
                                            </MenuItem>

                                            {/* My Wishlist */}
                                            <MenuItem onClick={handleMenuClose}>
                                                <Link href="/wishlist" passHref>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <FavoriteIcon />
                                                        <Typography sx={{ color: "inherit" }}>My Wishlist</Typography>
                                                    </Box>
                                                </Link>
                                            </MenuItem>

                                            {/* My Profile */}
                                            <MenuItem onClick={handleMenuClose}>
                                                <Link
                                                    href={
                                                        user.role === "admin" || user.role === "super_admin"
                                                            ? "/dashboard"
                                                            : user.role === "customer"
                                                                ? "/customer-dashboard"
                                                                : "/"
                                                    }
                                                    passHref
                                                >
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <AccountCircleIcon />
                                                        <Typography sx={{ color: "inherit" }}>My Profile</Typography>
                                                    </Box>
                                                </Link>
                                            </MenuItem>

                                            {/* Logout */}
                                            {/* Logout */}
                                            <MenuItem
                                                onClick={() => {
                                                    logout(); // Call the logout function
                                                    handleMenuClose(); // Close the menu after logout
                                                }}
                                            >
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <LogoutIcon />
                                                    <Typography sx={{ color: "inherit" }}>Logout</Typography>
                                                </Box>
                                            </MenuItem>

                                        </>
                                    ) : (
                                        <>
                                            {/* Sign In */}
                                            <MenuItem onClick={handleMenuClose}>
                                                <Link href="/sign-in" passHref>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <LoginIcon />
                                                        <Typography sx={{ color: "inherit" }}>Sign In</Typography>
                                                    </Box>
                                                </Link>
                                            </MenuItem>

                                            {/* Sign Up */}
                                            <MenuItem onClick={handleMenuClose}>
                                                <Link href="/sign-up" passHref>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <PersonAddIcon />
                                                        <Typography sx={{ color: "inherit" }}>Sign Up</Typography>
                                                    </Box>
                                                </Link>
                                            </MenuItem>
                                        </>
                                    )}
                                </Menu>
                            </Box>
                        </Tooltip>

                    </Box>
                </Toolbar>
            </AppBar>


            <Box
                sx={{
                    display: { xs: "block", md: "none" },
                    justifyContent: "center",
                    flexGrow: 1,
                    marginTop: "8px",
                    bgcolor: "#fff",
                    position: "relative",
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "gray" }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: "100%",
                        bgcolor: "#fff",
                        "& .MuiOutlinedInput-root": { borderRadius: 1 },
                    }}
                />
                {showSuggestions && filteredProducts?.length > 0 && (
                    <Paper
                        elevation={3}
                        sx={{
                            position: "absolute",
                            top: "60px", // Adjust to position the suggestion box right below the search box
                            left: 0,
                            right: 0,
                            zIndex: 10,
                            maxWidth: "800px",
                            width: "100%",
                            overflowY: "auto",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional for better styling
                        }}
                    >
                        <List>
                            {filteredProducts.map((product: any) => (
                                <ListItemButton
                                    key={product.id}
                                    onClick={() => {
                                        setSearchTerm(product.productName);
                                        setShowSuggestions(false);
                                    }}
                                    sx={{
                                        padding: "8px 16px",
                                        "&:hover": { backgroundColor: "#f9f9f9" }, // Adds a hover effect
                                    }}
                                >
                                    <Link href={`/product-details/${product.id}`} passHref>
                                        <ListItemText primary={product.productName} />
                                    </Link>
                                </ListItemButton>
                            ))}
                        </List>
                    </Paper>
                )}
            </Box>


            {/* Step 3: Secondary Navbar (Visible on Larger Screens) */}






            <AppBar position="static" sx={{ background: "#f8f9fa", color: "#000", padding: "0 16px", display: { xs: "none", md: "block" } }}>
                <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    {/* Navigation Links */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        {["Home", "Shops", "Trending Categories", "Brands", "Categories", "Others", "Contact Us"].map((item, index) => (
                            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                                    <Typography
                                        onClick={(event) => {
                                            // Set specific links for Home, Shops, and Contact Us
                                            if (item === "Home") {
                                                window.location.href = "/";
                                            } else if (item === "Shops") {
                                                window.location.href = "/shops";
                                            } else if (item === "Contact Us") {
                                                window.location.href = "/contact-us";
                                            } else if (["Trending Categories", "Brands", "Categories"].includes(item)) {
                                                handleDropdownClick(event, item);
                                            }
                                        }}
                                        sx={{
                                            cursor: "pointer",
                                            fontWeight: 500,
                                            "&:hover": { color: "#4caf50" },
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        {item}
                                        {["Trending Categories", "Brands", "Categories"].includes(item) && <ExpandMoreIcon sx={{ fontSize: "1rem", marginLeft: "4px" }} />}
                                    </Typography>
                                </motion.div>
                            </Box>
                        ))}
                    </Box>

                    {/* Categories Dropdown */}
                    <Menu anchorEl={anchorElCategories} open={Boolean(anchorElCategories)} onClose={handleDropdownClose}>
                        {categories?.data?.map((category: ICategory) => (
                            <Link href={`/shops/category/${category.id}`}>
                                <MenuItem key={category.id} onClick={() => handleMenuItemClick(category)}>
                                    <Avatar src={category.icon} sx={{ width: 24, height: 24, marginRight: 1 }} />
                                    {category.title}
                                </MenuItem>
                            </Link>
                        ))}
                    </Menu>

                    {/* Brands Dropdown */}
                    <Menu anchorEl={anchorElBrands} open={Boolean(anchorElBrands)} onClose={handleDropdownClose}>
                        {brands?.data?.map((brand: IBrand) => (
                            <Link href={`/shops/brand/${brand.id}`}>
                                <MenuItem key={brand.id} onClick={() => handleMenuItemClick(brand)}>
                                    <Avatar src={brand.icon} sx={{ width: 24, height: 24, marginRight: 1 }} />
                                    {brand.title}
                                </MenuItem>
                            </Link>
                        ))}
                    </Menu>

                    {/* Right Section: Contact */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Tooltip title="Customer Support">
                            <IconButton>
                                <HeadsetMicIcon sx={{ color: "#4caf50" }} />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            +880 1234 567890
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>



        </Box>
    );
};

export default TwoStepNavbar;
