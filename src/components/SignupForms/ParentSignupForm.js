import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";



const SIGNUP = gql`
	mutation Mutation($input: SignupInput) {
		parentSignUp(input: $input) {
			id
			firstName
			lastName
			email
			title
		}
	}
`;

const titleOptions = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'];

export const ParentSignupForm = () => {
	const [executeSignUp, { data, loading, error }] = useMutation(SIGNUP);

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data);

		if (data.password !== data.confirmPassword) {
			setError('confirmPassword', {
				type: 'manual',
				message: 'Passwords do not match',
			});
		}

		await executeSignUp({
			variables: {
				input: {
					title: data.title,
					firstName: data.firstName,
					lastName: data.lastName,
					phoneNumber: data.phoneNumber,
					email: data.personalEmail,
					password: data.password,
					houseNumber: data.houseNumber,
					street: data.street,
					city: data.city,
					postCode: data.postCode,
				},
			},
		});

		if (data) {
			navigate('/login', { replace: true });
		}
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
			}}
			spacing={2}>
			<Grid container spacing={2}>
				<FormControl sx={{ width: 420 }}>
					<InputLabel id='title'>Title</InputLabel>
					<Select
						labelId='title'
						id='title'
						label='Title'
						{...register('title')}
						defaultValue='Mr'>
						{titleOptions.map((title, index) => {
							return (
								<MenuItem key={index} value={title}>
									{title}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<TextField
        required
					margin='normal'
					id='firstName'
					label='First Name'
					variant='outlined'
					name='firstName'
					autoFocus
					fullWidth
					{...register('firstName', { required: true })}
          error={!!errors.firstName}
				/>
				{errors.firstName && (<Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ color: "#d32f2f" }}
        >First name is required</Typography>)}

				<TextField
        required
					margin='normal'
					id='lastName'
					label='Last Name'
					variant='outlined'
					name='lastName'
					autoFocus
					fullWidth
					{...register('lastName', { required: true })}
          error={!!errors.lastName}
				/>
				{errors.lastName && (<Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ color: "#d32f2f" }}
        >Last name is required</Typography>)}

				<TextField
        required
					margin='normal'
					id='personalEmail'
					label='Personal Email'
					variant='outlined'
					name='personalEmail'
					autoFocus
					fullWidth
					{...register('personalEmail', {
						required: true,
						pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
					})}
          error={!!errors.personalEmail}
				/>
				{errors.personalEmail && (<Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ color: "#d32f2f" }}
        >Please enter a valid email</Typography>)}

				<TextField
        required
					margin='normal'
					id='password'
					label='Password'
					variant='outlined'
					name='password'
					type='password'
					autoFocus
					fullWidth
					{...register('password', {
						required: true,
						pattern:
							/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
					})}
          error={!!errors.password}
				/>

				{errors.password && (<Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ color: "#d32f2f" }}
        >Password must be 8 characters, and include both lower and uppercase characters, with 1 special character required</Typography>)}

				<TextField
        required
					margin='normal'
					id='confirmPassword'
					label='Confirm Password'
					variant='outlined'
					name='confirmPassword'
					type='password'
					autoFocus
					fullWidth
					{...register('confirmPassword', { required: true })}
          error={!!errors.confirmPassword}
				/>
        	{!!errors.houseNumber && (<Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ color: "#d32f2f" }}
        >Confirm Password cannot be empty</Typography>) || errors.confirmPassword && (<Typography variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ color: "#d32f2f" }}>{errors?.confirmPassword.message}</Typography>) }

				<TextField
        required
					margin='normal'
					id='houseNumber'
					label='House Number'
					variant='outlined'
					name='houseNumber'
					autoFocus
					fullWidth
					{...register('houseNumber', { required: true })}
          error={!!errors.houseNumber}
				/>
				{errors.houseNumber && (<Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ color: "#d32f2f" }}
        >Please enter your house number</Typography>)}

				<TextField
        required
					margin='normal'
					id='street'
					label='Street Name'
					variant='outlined'
					name='street'
					autoFocus
					fullWidth
					{...register('street', { required: true })}
          error={!!errors.street}
				/>
				{errors.street && (<Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ color: "#d32f2f" }}
        >Please enter your street name</Typography>)}

				<TextField
        required
					margin='normal'
					id='city'
					label='City'
					variant='outlined'
					name='city'
					autoFocus
					fullWidth
					{...register('city', { required: true })}
          error={!!errors.city}
				/>
				{errors.city && (<Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ color: "#d32f2f" }}
        >Please enter your city</Typography>)}
				<TextField
        required
					margin='normal'
					id='postCode'
					label='Post Code'
					variant='outlined'
					name='postCode'
					autoFocus
					fullWidth
					{...register('postCode', { required: true })}
          error={!!errors.postCode}
				/>
				{errors.postCode && (<Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ color: "#d32f2f" }}
        >Please enter a valid post code</Typography>)}

				<TextField
        required
					margin='normal'
					id='phoneNumber'
					label='Phone Number'
					variant='outlined'
					name='phoneNumber'
					autoFocus
					fullWidth
					{...register('phoneNumber', { required: true })}
          error={!!errors.phoneNumber}
				/>
				{errors.phoneNumber && (<Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          sx={{ color: "#d32f2f" }}
        >Telephone number is required</Typography>)}

				<Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
					Next
				</Button>
			</Grid>
		</Box>
	);
};
