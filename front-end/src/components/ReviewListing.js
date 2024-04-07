import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import Rating from "@material-ui/lab/Rating";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import User1 from "../img/profile.png";
import Ellipse1 from "../img/Ellipse3.png";
import Ellipse2 from "../img/Ellipse4.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    maxWidth: 1000,
    margin: "auto",
    marginTop: theme.spacing(10),
    padding: theme.spacing(2),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(2),
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
    marginTop: "15px",
  },
  yellowStar: {
    color: "#FFD700",
  },
  addReview: {
    background: "linear-gradient(90deg, #002BC5 0%, #D100F3 100%)",
    color: "white",
    width: "150px",
    marginTop: "auto",
    alignSelf: "flex-end",
  },
  line: {
    color: "grey",
    position: "relative",
    bottom: "90px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formDialog: {
    width: 414,
    height: 494,
    padding: theme.spacing(3),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "20%",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  button: {
    background: "linear-gradient(90deg, #002BC5 0%, #D100F3 100%)",
    color: "white",
  },

  userImg: {
    height: 51,
    width: 51,
  },

  reviewButton: {
    position: "relative",
    bottom: "150px",
    left: "800px",
  },
  comments: {
    position: "relative",
    bottom: "90px",
    left: "15px",
  },
  content: {
    position: "relative",
    bottom: "55px",
    left: "60px",
  },
  description: {},
}));

const ReviewListing = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const companyId = urlParams.get("companyId");

        const response = await axios.get(
          `http://localhost:5000/companies/${companyId}`
        );
        console.log("company response", response);
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompanyDetails();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const companyId = urlParams.get("companyId");

        const response = await axios.get(
          `http://localhost:5000/reviews/${companyId}`
        );
        console.log("review response", response);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    reviewText: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const companyId = urlParams.get("companyId");
      const response = await axios.post(
        `http://localhost:5000/reviews/${companyId}`,
        formData
      );
      console.log("Review added successfully:", response.data);
      toast.success("Reviews added successfully");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div>
      <Card className={classes.card}>
        <ToastContainer />
        <CardContent className={classes.cardContent}>
          <img
            src={
              company?.companyLogo
                ? company?.companyLogo
                : "https://assets.materialup.com/uploads/5c7c5036-e550-4a57-9caf-db664bee2d8d/preview.jpg"
            }
            alt="Company Logo"
            className={classes.image}
          />
          <div>
            <div
              style={{
                position: "relative",
                bottom: "100px",
                left: "120px",
                display: "flex",
              }}
            >
              <Typography variant="h6" gutterBottom>
                {company?.name}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  fontSize: "12px",
                  color: "grey",
                  position: "relative",
                  left: "600px",
                }}
                gutterBottom
              >
                Founded On {new Date(company?.foundedOn).toLocaleDateString()}
              </Typography>
            </div>

            <div
              style={{
                position: "relative",
                bottom: "100px",
                left: "120px",
                width: "800px",
              }}
            >
              <Typography variant="body1" gutterBottom>
                {company?.description}
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
          <div className={classes.reviewButton}>
            <Button className={classes.addReview} onClick={handleClickOpen}>
              +Add Review
            </Button>
          </div>

          <hr className={classes.line} />
        </CardContent>

        <div className={classes.comments}>
          <img src={User1} className={classes.userImg} alt="" />
          <div className={classes.content}>
            <Typography variant="body1" gutterBottom>
              Jorgue watson
            </Typography>
            <div>
              <div
                style={{ display: "flex", position: "relative", left: "5px" }}
              >
                <Typography
                  variant="body1"
                  style={{ fontSize: "12px", color: "black" }}
                  gutterBottom
                >
                  09-09-2024 20:45
                </Typography>

                <div style={{ position: "relative", left: "600px" }}>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                    icon={<StarIcon style={{ color: "#FFD700" }} />}
                  />
                </div>
              </div>

              <Typography
                variant="body1"
                style={{
                  fontSize: "12px",
                  color: "black",
                  height: "10px",
                  width: "850px",
                }}
                gutterBottom
              >
                He was first caught doing so when he was 14; The bell miner
                (Manorina melanophrys), also known as the bellbird, is a
                colonial honeyeater species endemic to southeastern Australia.
                The name miner is derived from an old alternative spelling of
                myna, and is shared with other members of the genus Manorina.
                although he was found with items lorem he had stolen, he escaped
                a prison sentence. He broke into the palace again in December
                1840, and was caught
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.comments}>
          {reviews.map((review, index) => (
            <div key={index}>
              <img src={User1} className={classes.userImg} alt="" />
              <div className={classes.content}>
                <Typography variant="body1" gutterBottom>
                  {review.fullName}
                </Typography>
                <div
                  style={{ display: "flex", position: "relative", left: "5px" }}
                >
                  <Typography
                    variant="body1"
                    style={{ fontSize: "12px", color: "black" }}
                    gutterBottom
                  >
                    {new Date(review.createdAt).toLocaleString()}
                  </Typography>
                  <div style={{ position: "relative", left: "600px" }}>
                    <Rating
                      name="rating"
                      value={review.rating}
                      readOnly
                      icon={<StarIcon style={{ color: "#FFD700" }} />}
                    />
                  </div>
                </div>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "12px",
                    color: "black",
                    height: "10px",
                    width: "850px",
                  }}
                  gutterBottom
                >
                  {review.reviewText}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Card>

  
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.modal}
      >
        <div style={{ position: "relative" }}>
          <img
            src={Ellipse2}
            alt=""
            className={classes.icons}
            style={{ position: "absolute", zIndex: 0 }}
          />
          <img
            src={Ellipse1}
            alt=""
            className={classes.icons}
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
            Add Review
          </DialogTitle>
          <TextField
            autoFocus
            margin="dense"
            id="fullName"
            label="Full Name"
            type="text"
            fullWidth
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            value={formData.subject}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="reviewText"
            multiline
            rows={4}
            label="Enter your review"
            type="text"
            fullWidth
            value={formData.reviewText}
            onChange={handleChange}
          />
          <Typography>Rating</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            icon={<StarIcon style={{ color: "#FFD700" }} />}
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
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewListing;
