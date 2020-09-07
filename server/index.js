const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const rateLimit = require("express-rate-limit");
const {
  getHtml,
  getAsinByName,
  getAsinByPrice,
  getProductInfo,
} = require("./util");
require("dotenv").config();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(helmet());

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to the amazon product search API!",
  });
});

app.use(
  rateLimit({
    windowMs: 30 * 1000, // Every 30 seconds
    max: 1, // Max of 1 request
  })
);

app.get("/search", async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query;
    if (!name)
      return res.status(400).json({
        message: `Please provide the /name/ of the product you would like to search up!`,
      });

    if ((minPrice && isNaN(minPrice)) || (maxPrice && isNaN(maxPrice)))
      return res.status(400).json({
        message: `The parameter /minPrice/ or /maxPrice/ that you provided is not a number!`,
      });

    const asin =
      minPrice || maxPrice
        ? await getAsinByPrice(
            name,
            Number(minPrice) || 0,
            Number(maxPrice) || 0
          )
        : await getAsinByName(name);

    if (!asin)
      return res.status(400).json({
        message: `There was no product found with the /name/ you provided!`,
      });

    const $ = await getHtml(`https://amazon.com/dp/${asin}`);
    const productInfo = await getProductInfo($);

    if (!productInfo)
      return res.status(400).json({
        message: `The product information was not able to be loaded!`,
      });

    productInfo.asin = asin;

    res.status(200).json(productInfo);
  } catch (e) {
    console.error;
  }
});

app.listen(process.env.PORT || 3000);
