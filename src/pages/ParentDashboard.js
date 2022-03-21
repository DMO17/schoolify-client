import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { ChildrenCards } from "../components/ChildrenCards";
import { PageContainer } from "../components/PageContainer";
import { useAuth } from "../context/AppProvider";
import { GET_ALL_CHILDREN } from "../graphql/query";
import { PageTitle } from "../components/PageTitle";

export const ParentDashboard = () => {
  const { loading, error, data } = useQuery(GET_ALL_CHILDREN, {
    pollInterval: 1000,
  });

  const { user } = useAuth();

  const navigate = useNavigate();

  const renderLoading = () => {
    if (loading) {
      return <LinearProgress style={{ backgroundColor: "purple" }} />;
    }
  };

  const renderError = () => {
    if (!loading && error) {
      return (
        <Alert severity="error">
          Something went wrong, please tray again later.
        </Alert>
      );
    }
  };

  const renderData = () => {
    if (!loading && !error && data?.parentsChildren?.children) {
      return (
        <Stack spacing={2}>
          <PageTitle>
            Hi {user.firstName} {user.lastName}!
          </PageTitle>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            Select your child's card to go to their dashboard
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{
              color: "black",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Please note: If you have more than one child attending the same
            school, you are able to add multiple children to your app.
          </Typography>
          <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
            <Button
              variant="contained"
              type="button"
              sx={{ my: 3 }}
              startIcon={<PersonAddIcon />}
              onClick={() => {
                navigate("/children/new", { replace: true });
              }}
            >
              Add Child
            </Button>
          </Box>
          {data?.parentsChildren?.children?.length === 0 && (
            <Alert severity="info">
              There are no children register on this account. Please click on
              the "Add Child" button to get started.
            </Alert>
          )}
          <ChildrenCards data={data} />
        </Stack>
      );
    }
  };

  return (
    <PageContainer>
      {renderLoading()}
      {renderError()}
      {renderData()}
    </PageContainer>
  );
};
