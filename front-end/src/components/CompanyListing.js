import React, { useState, useEffect } from "react";
import {
  makeStyles,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import Ellipse1 from "../img/Ellipse3.png";
import Ellipse2 from "../img/Ellipse4.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    padding: "0 20px",
    marginTop: "2%",
    margin: "10%",
    height: "100px",
    width: "900px",
  },
  formControl: {
    minWidth: 120,
    marginLeft: theme.spacing(2),
  },
  input: {
    width: 300,
    marginRight: theme.spacing(2),
  },
  button: {
    background: "linear-gradient(90deg, #D100F3 0%, #002BC5 100%)",
    color: "white",
    marginLeft: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formDialog: {
    width: 414,
    height: 494,
    padding: theme.spacing(2),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "20%",
  },
  icons: {
    height: 100,
    width: 100,
    borderRadius: "50%",
  },
  card: {
    width: "100%",
    maxWidth: "1000px",
    margin: "20px auto",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: theme.spacing(2),
    objectFit: "cover",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
  yellowStar: {
    color: "#FFD700",
  },
  companyName: {
    fontWeight: "bold",
  },
  companyDesc: {
    fontSize: "13px",
    color: "grey",
  },
  reviewButton: {
    color: "white",
    background: "black",
    marginTop: "auto",
    alignSelf: "flex-end",
    "&:hover": {
      background: "linear-gradient(90deg, #002BC5 0%, #D100F3 100%)",
    },
  },

  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const CompanyListing = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getCompanies = async (searchQuery) => {
    try {
      let url = "http://localhost:5000/companies";
   
      if (searchQuery) {
        url += `/search/filter?name=${searchQuery}`;
      }
      const response = await axios.get(url);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleSearch = () => {
    getCompanies(searchQuery);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    foundedOn: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log("form data", formData);

      const response = await axios.post(
        "http://localhost:5000/companies",
        formData
      );
      toast.success("Company listed successfully");
      console.log(response.data);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetailReview = (companyId) => {
    const reviewPageUrl = `http://localhost:3000/reviews?companyId=${companyId}`;

    window.location.href = reviewPageUrl;
  };
  return (
    <div>
      <ToastContainer />
      <div className={classes.root}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            id="searchQuery"
            className={classes.input}
            label="Select Company"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleSearch}
          >
            Find Company
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleClickOpen}
          >
            + Add Company
          </Button>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              label="Sort By"
              value={""}
              onChange={() => {}}
            >
              <MenuItem value={"name"}>Date</MenuItem>
              <MenuItem value={"rating"}>Rating</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {companies.map((company) => (
        <Card key={company._id} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <img
              src={
                company.companyLogo
                  ? company.companyLogo
                  : "https://assets.materialup.com/uploads/5c7c5036-e550-4a57-9caf-db664bee2d8d/preview.jpg"
              }
              alt="Company Logo"
              className={classes.image}
            />
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography
                    variant="h6"
                    className={classes.companyName}
                    gutterBottom
                  >
                    {company.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: "10px",
                      color: "grey",
                      position: "relative",
                      left: "700px",
                      bottom: "50px",
                    }}
                    gutterBottom
                  >
                    Founded On{" "}
                    {new Date(company.foundedOn).toLocaleDateString()}
                  </Typography>
                </div>
                <Button
                  className={classes.reviewButton}
                  style={{ position: "relative", left: "570px", top: "30px" }}
                  onClick={() => handleDetailReview(company._id)}
                >
                  Detail Review
                </Button>
              </div>
              <div></div>
              <div style={{ position: "relative", bottom: "25px" }}>
                <Typography
                  variant="body1"
                  className={classes.companyDesc}
                  style={{ display: "flex", alignItems: "center" }}
                  gutterBottom
                >
                  <AddLocationIcon size={"small"} /> {company.location}
                </Typography>

                <div className={classes.rating}>
                  <Typography
                    variant="body2"
                    style={{ marginLeft: 5, fontWeight: "bold" }}
                  >
                    5.0
                  </Typography>
                  <StarIcon className={classes.yellowStar} />
                  <StarIcon className={classes.yellowStar} />
                  <StarIcon className={classes.yellowStar} />
                  <StarIcon className={classes.yellowStar} />
                  <StarIcon className={classes.yellowStar} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.modal}
      >
        <div style={{ position: "relative" }}>
          <img
            src={Ellipse2}
            className={classes.icons}
            alt=""
            style={{ position: "absolute", zIndex: 0 }}
          />
          <img
            src={Ellipse1}
            className={classes.icons}
            alt=""
            style={{
              position: "absolute",
              zIndex: 1,
              marginLeft: "-30px",
              marginTop: "-1px",
            }}
          />
          <Button className={classes.closeButton} onClick={handleClose}>
            X
          </Button>
        </div>

        <DialogContent className={classes.formDialog}>
          <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
            Add Company
          </DialogTitle>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Company Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="description"
            multiline
            rows={4}
            label="Enter company description"
            type="text"
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="foundedOn"
            label="Founded On"
            type="text"
            fullWidth
            value={formData.foundedOn}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
            value={formData.city}
            onChange={handleChange}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleSubmit}
              className={classes.button}
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyListing;
