import React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import FamilyRestroomSharpIcon from '@mui/icons-material/FamilyRestroomSharp';
import SchoolSharpIcon from '@mui/icons-material/SchoolSharp';
import InfoIcon from '@mui/icons-material/Info';
import Link from '@mui/material/Link';
import FaceIcon from '@mui/icons-material/Face';
import GridViewIcon from '@mui/icons-material/GridView';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LogoutIcon from '@mui/icons-material/Logout';

const publicNavArray = [
	{
		name: 'Home',
		icon: <HomeIcon />,
		link: '/',
	},
	{
		name: 'Login',
		icon: <LoginIcon />,
		link: '/login',
	},
	{
		name: 'Parent Signup',
		icon: <FamilyRestroomSharpIcon />,
		link: '/parent/sign-up',
	},
	{
		name: 'Teacher Signup',
		icon: <SchoolSharpIcon />,
		link: '/teacher/sign-up',
	},
	{
		name: 'About',
		icon: <InfoIcon />,
		link: '/about',
	},
];

const parentNavArray = [
	{
		name: 'Dashboard',
		icon: <GridViewIcon />,
		link: '/dashboard/parent',
	},
	{
		name: 'My Children',
		icon: <FaceIcon />,
		link: '/children/view',
	},
	{
		name: 'Add Child',
		icon: <PersonAddIcon />,
		link: '/children/new',
	},
	{
		name: 'Add Medical',
		icon: <MedicalServicesIcon />,
		link: '/medical/new',
	},
	{
		name: 'Add Absence Request',
		icon: <AddBoxIcon />,
		link: '/absenceRequest/new',
	},
	{
		name: 'View Absences',
		icon: <EventAvailableIcon />,
		link: '/absenceRequest/view',
	},
	{
		name: 'About',
		icon: <InfoIcon />,
		link: '/about',
	},
	{
		name: 'Logout',
		icon: <LogoutIcon />,
		link: '',
	},
];

const teacherNavArray = [
	{
		name: 'Dashboard',
		icon: <GridViewIcon />,
		link: '/dashboard/teacher',
	},
	{
		name: 'My Children',
		icon: <FaceIcon />,
		link: '/view/students',
	},
	{
		name: 'View Absence Requests',
		icon: <EventAvailableIcon />,
		link: '/absence-requests',
	},
	{
		name: 'About',
		icon: <InfoIcon />,
		link: '/about',
	},
	{
		name: 'Logout',
		icon: <LogoutIcon />,
		link: '',
	},
];

const navbarArray = () => {
	const userType = JSON.parse(localStorage.getItem('user'))?.role;
	if (userType === 'teacher') {
		return teacherNavArray;
	} else if (userType === 'parent') {
		return parentNavArray;
	} else {
		return publicNavArray;
	}
};

const drawerWidth = 200;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export const SideNavbar = () => {
	const [open, setOpen] = useState(false);

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	return (
		<Box>
			<CssBaseline />
			<Drawer
				variant='permanent'
				open={open}
				sx={{
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						backgroundColor: '#212227',
					},
				}}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerToggle}>
						{!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />

				<List>
					{navbarArray().map((each, index) => (
						<ListItemButton
							component={Link}
							href={each.link}
							key={each.name}
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}>
								{each.icon}
							</ListItemIcon>
							<ListItemText
								primary={each.name}
								sx={{ opacity: open ? 1 : 0 }}
							/>
						</ListItemButton>
					))}
				</List>
			</Drawer>
		</Box>
	);
};
