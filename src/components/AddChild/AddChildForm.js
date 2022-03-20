import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";

import { ADD_STUDENT } from "../../graphql/mutations";
import { GET_YEAR_GROUP_DATA } from "../../graphql/query";
import { item, colors } from "../../styles";
import { UploadChildImage } from "../UploadChildImage";

export const AddChildForm = () => {
  const { loading, error, data } = useQuery(GET_YEAR_GROUP_DATA);

  const [
    executeAddStudent,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_STUDENT);

  const [childImage, setChildImage] = useState("");

  const [dateOfBirth, setDateOfBirth] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    control,
  } = useForm();

  const value = getValues("dob");

  useEffect(() => {
    register("dob");
  }, [register]);

  useEffect(() => {
    setDateOfBirth(value || null);
  }, [setDateOfBirth, value]);

  const onSubmit = async (studentData) => {
    const { data } = await executeAddStudent({
      variables: {
        input: {
          firstName: studentData.childFirstName,
          lastName: studentData.childLastName,
          dob: studentData.dob,
          yearGroup: studentData.yearGroup,
          profileImageUrl: childImage.src,
        },
      },
    });

    if (data?.addStudent) {
      navigate("/children/view", { replace: true });
    }
  };

  const styles = {
    loadingButton: { marginTop: 3, marginBottom: 2 },
    errorContainer: {
      marginTop: 2,
      color: "#d32f2f",
      textAlign: "center",
    },
  };

  // TODO: Add error component here
  if (error || mutationError) {
    return <div>ERROR</div>;
  }

  // TODO: Add loading spinner component here
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container sx={item.outerContainer}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ textAlign: "center" }}
          >
            Child . Registration . Form
          </Typography>
        </Grid>
        <Grid item xs={12} sx={colors.purple}>
          <UploadChildImage
            uploadedImage={childImage}
            setUploadedImage={setChildImage}
          />
          <Box onSubmit={handleSubmit(onSubmit)} component="form">
            <TextField
              color="secondary"
              autoFocus
              margin="normal"
              id="childFirstName"
              label="First Name"
              variant="outlined"
              name="childFirstName"
              fullWidth
              {...register("childFirstName", { required: true })}
              error={!!errors.childFirstName}
              disabled={mutationLoading}
            />
            <TextField
              color="secondary"
              margin="normal"
              id="childLastName"
              label="Last Name"
              variant="outlined"
              name="childLastName"
              fullWidth
              {...register("childLastName", { required: true })}
              error={!!errors.childLastName}
              disabled={mutationLoading}
            />
            <DesktopDatePicker
              disabled={mutationLoading}
              label="Date of Birth"
              inputFormat="MM/dd/yyyy"
              value={dateOfBirth}
              onChange={(value) => {
                setDateOfBirth(value);
                setValue("dob", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register("dob", { required: true })}
                  error={!!errors.dob}
                  color="secondary"
                  margin="normal"
                  id="dob"
                  variant="outlined"
                  name="dob"
                  fullWidth
                />
              )}
            />
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel id="yearGroup" color="secondary">
                Year Group
              </InputLabel>
              <Controller
                control={control}
                name="yearGroup"
                render={({ field: { onChange, value } }) => (
                  <Select
                    color="secondary"
                    labelId="yearGroup"
                    id="yearGroup"
                    value={value || ""}
                    onChange={onChange}
                    label="Year Group"
                    disabled={mutationLoading}
                    error={!!errors.yearGroup}
                    {...register("yearGroup", { required: true })}
                  >
                    {data?.yearGroups?.map((yearGroupObj, index) => {
                      return (
                        <MenuItem key={index} value={yearGroupObj.id}>
                          {yearGroupObj.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
            </FormControl>

            {/* {uploadComplete && !loading && (
						<Alert severity='success'>Successfully uploaded image</Alert>
					)} */}
            <Box sx={item.comment}>
              <LoadingButton
                loading={mutationLoading}
                loadingIndicator="Loading..."
                variant="contained"
                type="submit"
                sx={styles.loadingButton}
                startIcon={mutationError && <ErrorIcon />}
                color={mutationError ? "error" : "secondary"}
              >
                Add Child
              </LoadingButton>

              {!!mutationError && (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  sx={{ mt: 2, textAlign: "center", color: "#d32f2f" }}
                >
                  Failed to add child.
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
