import "./App.css";
import React, { useStyle, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import TopAppBar from "./Components/TopAppBar";

import { withAuthenticator } from "@aws-amplify/ui-react";
import Amplify from "@aws-amplify/core";
import awsmobile from "./aws-exports";
Amplify.configure(awsmobile);

const Fast = window.Fast;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  header: {
    margin: "50px"
  }
}));

function App() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    document
    .querySelector("#fast_login")
    .addEventListener("complete", event => {
      const data = { token: event.detail.token };
      console.log("----------- success login -----------");
      console.log(data);
      console.log("----------- success login -----------");
      // Http.Post('/api/auth/fast-login', data)
      //   .then(() => {
      //           window.location.href = '/landing-page';
      //   })
    });
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  useEffect(() => {
      var checkoutButton = window.document.querySelector('fast-checkout-button');
      console.log('2222222222222')
      console.log(checkoutButton)
      console.log('2222222222222')

      checkoutButton.addEventListener('click', (event) => {
        console.log('button clicked');
        const payload = {
                // Required. appId is your Fast app ID that you were provided during seller onboarding.
                appId: 'cde3df14-df9b-44d4-9d83-4d9bf7b0f646',

          // Required. buttonId is the id attribute of the button that was clicked
          // after an order was placed or canceled, as well as let you identify which button was clicked when listening for
          // postMessage events.
          // If you gave your fast-checkout-button an id attribute, then you can just use event.target.id here.
          buttonId: event.target.id,

          // Either cartId or products must be provided. If both or neither are provided, an error will be thrown before
          // checkout is opened.

                // When performing a cart checkout, you only need to provide buttonId and cartId.
          // cartId is a unique identifier for a user's cart.
          // cartId: 'cart-1',

                // When performing a products checkout, you only need to provide buttonId and products. You can also optionally
                // provide couponCode and affiliateInfo
          // products is a list of products the user is ordering.
          products: [
            {
              // Each product has an identifier, a variant identifier, and, optionally, a set of configurations (called
                        // options) that are used to describe the exact product being ordered.
              // You can think of the id as the product SKU, the variant ID as a sub-identifier to the product, and the
                        // options as things like color, size, etc. Or, if your product identifiers already define exactly one
                        // product, you can just use id and forgo providing options.
              // The data provided here is what will reach your backend, so describe your products however makes the most
              // sense to you.
              // Required. id is an identifier for the product being ordered
              id: '1',
              // Optional. options is a set of configurations that further describe the product being ordered (e.g. color
              // and size).
              options: [
                {
                  // Required. id is the name of the option.
                  id: 'color',
                  // Required. value is the value of the option.
                  value: 'blue',
                }
              ],
              // Required. quantity is the number of this product with these configurations being ordered.
              quantity: 1,
            }
          ]
        }
        console.log(payload)
        Fast.checkout(payload);
    });

  }, []);

  
  // const fastCheckoutClicked = event => {
  //   console.log("111111111111111");
  //   console.log("success test");
  //   console.log("111111111111111");

  //   Fast.checkout({
  //     // Required. appId is your Fast app ID that you were provided during seller onboarding.
  //     appId: "6ab96a81-e133-4176-803f-90a45d75156b",

  //     // Required. buttonId is the id attribute of the button that was clicked
  //     // after an order was placed or canceled, as well as let you identify which button was clicked when listening for
  //     // postMessage events.
  //     // If you gave your fast-checkout-button an id attribute, then you can just use event.target.id here.
  //     buttonId: event.target.id,

  //     // Either cartId or products must be provided. If both or neither are provided, an error will be thrown before
  //     // checkout is opened.

  //     // When performing a cart checkout, you only need to provide buttonId and cartId.
  //     // cartId is a unique identifier for a user's cart.
  //     cartId: "my-unique-cart-id",

  //     // When performing a products checkout, you only need to provide buttonId and products. You can also optionally
  //     // provide couponCode and affiliateInfo
  //     // products is a list of products the user is ordering.
  //     products: [
  //       {
  //         // Each product has an identifier, a variant identifier, and, optionally, a set of configurations (called
  //         // options) that are used to describe the exact product being ordered.
  //         // You can think of the id as the product SKU, the variant ID as a sub-identifier to the product, and the
  //         // options as things like color, size, etc. Or, if your product identifiers already define exactly one
  //         // product, you can just use id and forgo providing options.
  //         // The data provided here is what will reach your backend, so describe your products however makes the most
  //         // sense to you.
  //         // Required. id is an identifier for the product being ordered
  //         id: "my-product-id",
  //         // Optional. variantId represents a unique sub-idenfifier for this product. These are sometimes used to
  //         // denote size / color, etc.
  //         variantId: "my-large-product-variant-id",
  //         // Optional. options is a set of configurations that further describe the product being ordered (e.g. color
  //         // and size).
  //         options: [
  //           {
  //             // Required. id is the name of the option.
  //             id: "color",
  //             // Required. value is the value of the option.
  //             value: "blue"
  //           }
  //         ],
  //         // Required. quantity is the number of this product with these configurations being ordered.
  //         quantity: 1
  //       }
  //     ],
  //     // Optional. couponCode is a coupon that the user might have entered that you would like to pass on to your
  //     // backend.
  //     couponCode: "10OFF",
  //     // Optional. affiliateInfo contains information about affiliates that you would like to attribute this purchase
  //     // with on your backend.
  //     affiliateInfo: {
  //       // affiliateInfo contains a single field named affiliates, that is an array of affiliate objects.
  //       affiliates: [
  //         // An affiliate object contains a single field named id, which is a unique identifier associated with this
  //         // affiliate. This ID can be whatever string your system is prepared to interpret.
  //         { id: "my-affiliate" }
  //       ]
  //     }
  //   });
  // };

  return (
    <Box color="text.primary" component="span" m={0}>
      <TopAppBar />
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.header}>
            <fast-login-button
              id="fast_login"
              app_id="6ab96a81-e133-4176-803f-90a45d75156b"
            ></fast-login-button>
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6} container justify="center">
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia
              className={classes.media}
              image="/assets/images/food2.jpg"
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep
                  skillet over medium-high heat. Add chicken, shrimp and
                  chorizo, and cook, stirring occasionally until lightly
                  browned, 6 to 8 minutes. Transfer shrimp to a large plate and
                  set aside, leaving chicken and chorizo in the pan. Add
                  pimentón, bay leaves, garlic, tomatoes, onion, salt and
                  pepper, and cook, stirring often until thickened and fragrant,
                  about 10 minutes. Add saffron broth and remaining 4 1/2 cups
                  chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with
                  artichokes and peppers, and cook without stirring, until most
                  of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                  medium-low, add reserved shrimp and mussels, tucking them down
                  into the rice, and cook again without stirring, until mussels
                  have opened and rice is just tender, 5 to 7 minutes more.
                  (Discard any mussels that don’t open.)
                </Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then
                  serve.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.header}>
            <fast-checkout-button
              id="fast-checkout-button-id"
              // onClick={fastCheckoutClicked}
            ></fast-checkout-button>
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
}

export default withAuthenticator(App);
