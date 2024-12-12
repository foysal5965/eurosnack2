'use client';

import { useEffect, useState } from 'react';
import {
    Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton, Collapse,
    Button,
    Stack,
    Badge,
    Avatar,
} from '@mui/material';
import { Class, Group, Inbox, Menu, Person, School, ExpandLess, ExpandMore, Category, Create, Update } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getUserInfo, isLoggedIn } from '@/services/authService';
import Link from 'next/link';
import { logoutUser } from '@/services/actions/logoutUser';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useAuth } from '@/lib/Providers/AuthProvider';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountMenu from './AccountMenu/AccountMenu';
import HomeIcon from '@mui/icons-material/Home';
import TuneIcon from '@mui/icons-material/Tune';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';









const drawerWidth = 240;

const menuItems: any = {

    admin: [
        {
            text: 'Dashboard', icon: <Category />

        },
        {
            text: 'Exam', icon: <Category />, submenu: [
                { text: 'Create Exam', icon: <Category />, href: '/dashboard/admin/exam/create' }
            ]
        },

        {
            text: 'Course Category', icon: <Category />, submenu: [
                { text: 'Categories', icon: <Category />, href: '/dashboard/admin/courseCategory' },
                { text: 'Create Category', icon: <Create />, href: '/dashboard/admin/courseCategory/create' }
            ]
        },
        {
            text: 'Courses', icon: <Class />, submenu: [
                { text: 'Course', icon: <Class />, href: '/dashboard/admin/course' },
                { text: 'Create Course', icon: <Create />, href: '/dashboard/admin/course/create' }
            ]
        },
        { text: 'Students', icon: <Group />, href: '/dashboard/admin/student' },
        { text: 'Contests', icon: <Group />, href: '/dashboard/admin/contest' },
        { text: 'Contest Participants', icon: <Group />, href: '/dashboard/admin/contest-participants' },
        {
            text: 'Profile',
            icon: <Person />,
            submenu: [
                { text: 'View Profile', href: '/dashboard/view' },
                { text: 'Edit Profile', href: '/dashboard/edit' },
                { text: 'Change Password', href: '/dashboard/change-password' },
            ],
        },
    ],
    super_admin: [
        {
            text: 'Dashboard', icon: <HomeIcon />, href: '/dashboard'

        }, {
            text: 'Admin', icon: <SupervisorAccountIcon />, submenu: [
                { text: 'Admins', href: '/dashboard/super-admin/admin' },
                { text: 'Create admin', href: '/dashboard/super-admin/admin/create' },
            ]
        },
        {
            text: 'Slider & Banner', icon: <TuneIcon />, href: '/slider-banner'

        },
        {
            text: 'Brand Manage', icon: <StoreIcon />, href: '/dashboard/admin/brand-list'

        },
        {
            text: 'Categories Manage', icon: <CategoryIcon />, href: '/dashboard/admin/categories-manage'

        },
        {
            text: 'Products Manage', icon: <ShoppingCartIcon />, href: '/dashboard/admin/product-manage'

        },
        {
            text: 'Coupon Manage', icon: <LocalOfferIcon />, href: '/dashboard/admin/coupon-manage'

        },
        {
            text: 'Order Manage', icon: <ReceiptIcon />, href: '/dashboard/admin/order-manage'

        },
        {
            text: 'Payment Method Mange', icon: <CreditCardIcon />, href: '/slider-banner'

        },
        {
            text: 'Shipping charge manage', icon: <LocalShippingIcon />, href: '/slider-banner'

        },
        {
            text: 'Customer manage', icon: <Group />, href: '/dashboard/admin/customer-manage'

        },
        {
            text: 'Reports', icon: <AssessmentIcon />, href: '/dashboard/admin/reports'

        },


        {
            text: 'Profile',
            icon: <Person />,
            submenu: [
                { text: 'View Profile', href: '/dashboard/view' },
                { text: 'Edit Profile', href: '/dashboard/edit' },
                { text: 'Change Password', href: '/dashboard/change-password' },
            ],
        },
    ],
    // Add more roles here if needed
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState<'student' | 'admin' | 'super_admin' | null>(null);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null); // Track the open menu index for dropdown
    const [showLogo, setShowLogo] = useState(true);
    const [lastScrollPos, setLastScrollPos] = useState(0);
    const { logout, user } = useAuth()
    // const { data } = useGetSingleUserQuery({});

    const handleLinkClick = () => {
        setMobileOpen(false);
    };
    const router = useRouter();

    const handleLogOut = () => {
        logoutUser(router);
        logout()
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (index: number) => {
        // Toggle the dropdown menu
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            const LoggedIn = isLoggedIn();
            if (!LoggedIn) {
                router.push('/login');
                return;
            }

            const { role } = getUserInfo() as any;
            if (role) {
                setRole(role);
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, [router]);
    // Scroll event listener to handle logo show/hide
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (currentScrollPos > lastScrollPos) {
                // Scrolling down
                setShowLogo(false);
            } else {
                // Scrolling up
                setShowLogo(true);
            }
            setLastScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollPos]);


    if (!role || !menuItems[role]) {
        return <Typography variant="h6">Unauthorized access</Typography>;
    }

    const contentVariants = {
        hidden: { opacity: 0, x: '100vw' },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 80, damping: 20 },
        },
        exit: { opacity: 0, x: '-100vw', transition: { ease: 'easeInOut' } },
    };

    const drawer = (
        <div>

            <Toolbar />
            <Link href='/'><Typography align='center' sx={{ fontSize: '28px' }}>Eursnack</Typography></Link>
            <List>
                {menuItems[role].map((item: any, index: number) => (
                    <div key={item.text}>
                        <ListItem

                            onClick={() => (item.submenu ? handleMenuClick(index) : handleLinkClick())}
                            component={item.submenu ? 'div' : Link}
                            href={item.submenu ? undefined : item.href}
                            passHref
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                            {item.submenu ? (openMenuIndex === index ? <ExpandLess /> : <ExpandMore />) : null}
                        </ListItem>

                        {item.submenu && (
                            <Collapse in={openMenuIndex === index} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.submenu.map((subitem: any) => (
                                        <Link onClick={handleLinkClick} href={subitem.href} passHref key={subitem.text}>
                                            <ListItem
                                                sx={{ pl: 4 }}

                                                component={motion.li}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <ListItemText primary={subitem.text} />
                                            </ListItem>
                                        </Link>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </div>
                ))}
            </List>

            <Button sx={{
                background: 'linear-gradient(45deg, #4CAF50, #81C784)', // Gradient color
                borderRadius: '15px', // Rounded button
                padding: '10px 20px',
                color: '#fff', // Text color
                fontSize: '15px',
                fontWeight: 'bold',
                marginLeft: '30px',
                width: '150px' // Initial shadow

            }} onClick={handleLogOut}>Logout</Button>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>


            {/* AppBar */}
            {
    showLogo && (
        <AppBar
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px`, backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            }}
        >
            <Toolbar>
                {/* Menu Icon for Mobile */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }} // Hide on large screens
                >
                    <Menu />
                </IconButton>

                {/* Main Container */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "space-between", sm: "space-between", md: "space-between" }, // Adjust for screen sizes
                        width: "100%",
                    }}
                >
                    {/* Left Section (Text and Welcome) */}
                    <Box>
                        <Typography
                            variant="body2"
                            noWrap
                            component="div"
                            sx={{ color: "rgba(11, 17, 52, 0.6)" }}
                        >
                            Hi, foysal
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            Welcome to your dashboard
                        </Typography>
                    </Box>

                    {/* Right Section (Icons and Avatar) */}
                    <Stack direction="row" gap={3} alignItems="center" sx={{ display: { xs: "none", sm: "flex" } }}>
                        <Badge badgeContent={1} color="primary">
                            <IconButton sx={{ background: "#ffffff" }}>
                                <NotificationsNoneIcon color="action" />
                            </IconButton>
                        </Badge>
                        <Avatar />
                        <AccountMenu />
                    </Stack>

                    {/* Mobile View: Icons and Avatar */}
                    <Stack direction="row" gap={2} alignItems="center" sx={{ display: { xs: "flex", sm: "none" } }}>
                        <Badge badgeContent={1} color="primary">
                            <IconButton sx={{ background: "#ffffff" }}>
                                <NotificationsNoneIcon color="action" />
                            </IconButton>
                        </Badge>
                        <Avatar />
                    </Stack>
                </Box>
            </Toolbar>
        </AppBar>
    )
}



            {/* Drawer/Sidebar */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* Mobile drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Permanent drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main content */}
            <Box
                component={motion.main}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, md: 3 }, // Adjust padding based on screen size
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />

                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;
