import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Box, ButtonGroup, Container, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { getGalleryCats } from "../../redux/store/selectors/getGalleryCats";
import CachedIcon from "@mui/icons-material/Cached";
import {
  GET_CATS,
  GET_CATS_LOADING,
  GET_CATS_ERROR,
  GET_CATS_CLEAR_ERROR,
} from "../../redux/actionTypes";

import "./Cats.css";

const Cats = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const data = useSelector(getGalleryCats());
  const dispatch = useDispatch();

  const getCats = async () => {
    dispatch({ type: GET_CATS_CLEAR_ERROR });
    dispatch({ type: GET_CATS_LOADING });
    try {
      const request = await fetch(
        "https://api.thecatapi.com/v1/images/search?format=json&limit=10"
      );
      const json = await request.json();
      dispatch({ type: GET_CATS, payload: json });
    } catch (error) {
      dispatch({ type: GET_CATS_ERROR, payload: error.toString() });
    }
  };

  useEffect(() => {
    getCats();
    // eslint-disable-next-line
  }, []);

  const childElements = data.map((photo) => (
    <Grid item xs={12} sm={4} md={3} key={photo.id}>
      <Item>
        <img className="img" src={photo.url} alt={photo.id} />
      </Item>
    </Grid>
  ));

  if (loading) {
    return (
      <Container>
        <div className="cats">
          <CircularProgress size={100} />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="cats">
          <div className="error">Oops! {error}</div>
          <ButtonGroup
            className="btn-group"
            variant="outlined"
            aria-label="outlined button group"
          >
            <Link className="link" to={"/"}>
              <HomeIcon className="icon-home" />
            </Link>
            <div onClick={getCats}>
              <CachedIcon fontSize="large" className="icon-refresh" />
            </div>
          </ButtonGroup>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="cats">
        <h1 className="title">Gallery of cats</h1>
        <Box className="gallery-box" sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {childElements}
          </Grid>
        </Box>
        <ButtonGroup
          className="btn-group"
          variant="outlined"
          aria-label="outlined button group"
        >
          <Link className="link" to={"/"}>
            <HomeIcon className="icon-home" />
          </Link>
          <div onClick={getCats}>
            <CachedIcon fontSize="large" className="icon-refresh" />
          </div>
        </ButtonGroup>
      </div>
    </Container>
  );
};

export default Cats;
