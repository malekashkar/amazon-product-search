const fetch = require("node-fetch");
const cheerio = require("cheerio");

const cookie = `aws-priv=eyJ2IjoxLCJldSI6MCwic3QiOjB9; aws_lang=en; s_cc=true; skin=noskin; session-id=131-0326934-7049455; ubid-main=135-0641870-4824268; s_fid=5125478F1078C520-1E8ECCC4B693BD3A; JSESSIONID=FDA89508CC134A4F57C754883A79ABE8; lc-main=en_US; _rails-root_session=TjArNDZSV1hOcW8yR2tKY2JhR3FRV1ZuOStVVjI3UVA2WjYyUWJHS283dzdDWmdUa0FZSmRLVlplazJXbkVyS2MxVVBMTklPSEN4ekoxM2lvTVVQUjJyZkJYTEh2UmpoaXduNGtvY0RkNlhYZWdQKzI2Wnl1dzlLYnprZHRQOVdLN3dabSsrZ2EzaEJkV2tLZ0lXa1Y4WmtHNFhteFJaQ2U2R1R6TGkyUW5ITXlUU1ZORjI3MFppTHRyWEhWeWsxLS05RXNFQjJPeTVETXZBZHVVMklXZzFRPT0%3D--0ef1f8e55b7dc2fd8fff16a393f0bcfc88bbaa27; aws-target-static-id=1592800631542-498340; aws-target-visitor-id=1592800631544-963313; aws-target-data=%7B%22support%22%3A%221%22%7D; regStatus=pre-register; s_vnum=2024882672587%26vn%3D1; s_ppv=37; aws-ubid-main=762-5375663-8030766; aws-userInfo=%7B%22arn%22%3A%22arn%3Aaws%3Asts%3A%3A265111720517%3Aassumed-role%2FstudentRole%2F8dd6f76e-1582-456a-ab77-387c7065d163%22%2C%22alias%22%3A%22265111720517%22%2C%22username%22%3A%22assumed-role%252FstudentRole%252F8dd6f76e-1582-456a-ab77-387c7065d163%22%2C%22keybase%22%3A%22U8IX5T2g8IyDeCtv9o%2FXLp940P7cVm0YIa2o7VZlOY8%5Cu003d%22%2C%22issuer%22%3A%22ide.cs50.io%22%2C%22signinType%22%3A%22PUBLIC%22%7D; x-main=\"aVRvL140NKcR?EH2ExxXbO2R0JTFR8qVKi6cI24nZNgQWXdXGdNtKcYzTTal?IVh\"; at-main=Atza|IwEBIIVkqBTSk4ou3U-dBS69R7t4siG0C86SdNFh1RuydMOeXiKiLBgp8ammU6haTEfpLzoxYt9jpotgnDNdbnx-YVXaOpj1Q-GMFMZN9v0UKS7VZCI1nOnc_kYZ65148dnfxRnkdxIHDULPSLLLmrwpb_TVT9YcqvzKRXO1m3ustO-jqklW2z9ncrrDI2LfZwmFj3tzzTpukmH_qObV5NYf8dEL; sess-at-main=\"xIrNm4FmrzYviA8JDjl55BQNmPHkPQjjiNIRqVnD6d8=\"; sst-main=Sst1|PQGHITFOECb2lSBpZEYilt48EMKX1drYd-ui-Q3Kb3ZpguBkYg02stx2GFDI_l7qGdFFahVX9B38MCCpf9HSMML3K5G6qhECr4geLumutcQwWXCsyPcfCDOcvD1wmb_pMxvqBTofLCYHKZhlkMis7jdbNAd2U37FP45lFmtqMcdCGaGxkFd1uLx2oWoD4poHOIIq7NwKpNA2BPg5I9M3VLdw_5WulVqvxqGiNlHJx6d02BfjKqea2osj1ciyDIJEaAlZ0GAHv0bCJQ1HE-OCMZUwAvncM2D26UnjFFcmBZ-ZQPqygqO1UvIhGL_XcxdPoyTqZrhtUdHI-7ANiGy5WO46wVYhk0UPt6nLlu8aeUBT4JhR1y7bL7ZFw0sEb1jQxPX4d3ywKCZc9aY2y2hNzpxr4DpVFBmfoZXmrp3BI5Upd4CZLCrnxORD2bf_AQtZ5cjB; session-id-time=2082787201l; i18n-prefs=USD; s_vn=1624336631688%26vn%3D2; s_eVar60=ha%7Cacq_freetier%7Cawssm-evergreen-default-hero%7Chero%7Cha_awssm-evergreen-default-hero; s_sq=%5B%5BB%5D%5D; s_dslv=1595540921704; s_nr=1595540921706-Repeat; session-token=xd//H8gwaoSJOhdMj/C5TZ6vydZGYLmXdp+/XHQmLHGzlDIlbzw6C399oQW50LAQiS4FsbBfkQRab1PbbUYEozbhIxhBCFE6BbdYJRIKvpE0CeT7gjhyv8RKnIkEyJT/B26znPnZ5u+8up+1p/vO0fAUJ6yRFNQdjL0XJnGLcNk5TGHKwVLJxsyM7AP7gjF/VKV1yrYkgqZ5hM8umihCJvw4DcE38G9n1PWCaP/BHIRSQAgFDzcw3UlNlRBpnTKerxFQCLnCLUgIrIBXnKbX8iqGItSvCc79; csm-hit=tb:s-HTVSJVWP5RVEPACH2Y4P|1599274165491&t:1599274166477&adb:adblk_yes`;

async function getHtml(link) {
  const pageResponse = await fetch(link, {
    headers: {
      cookie,
    },
  });
  const pageHtml = await pageResponse.text();
  return cheerio.load(pageHtml);
}

async function getAsinByName(name) {
  const $ = await getHtml(`https://www.amazon.com/s?k=${name}/`);

  return $(
    `#search > div.s-desktop-width-max.s-opposite-dir > div > div.sg-col-20-of-24.s-matching-dir.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(5)`
  )
    .get()
    .map((x) => $(x).attr("data-asin"))[0];
}

async function getAsinByPrice(name, minPrice, maxPrice) {
  if (!minPrice) minPrice = 0;
  if (!maxPrice) maxPrice = 1000000;

  const $ = await getHtml(`https://www.amazon.com/s?k=${name}/`);
  const products = $(`.s-asin`);
  const validProducts = products
    .map((index, el) => {
      const productAsin = $(el).attr("data-asin");
      const priceWhole = $(el)
        .find(`span.a-price-whole`)
        .text()
        .replace(".", "");
      const priceFraction = $(el)
        .find(`span.a-price-fraction`)
        .text()
        .replace(".", "");

      const price = Number(`${priceWhole}.${priceFraction}`);

      if (minPrice < price && price < maxPrice) return productAsin;
    })
    .get();
  const random = Math.floor(Math.random() * Math.floor(validProducts.length));

  return validProducts[random];
}

async function getProductInfo($) {
  const asin = $(`#cerberus-data-metrics`)
    .get()
    .map((x) => $(x).attr("data-asin"))[0];
  const price =
    Number($(`#priceblock_ourprice`).text().replace("$", "")) ||
    Number($(`#priceblock_saleprice`).text().replace("$", ""));
  const title = $(`#productTitle`)
    ? $(`#productTitle`).text().trim("")
    : `No title provided.`;

  const ratings = $(
    `#averageCustomerReviews > span.a-declarative > #acrPopover > span.a-declarative > a.a-popover-trigger > i.a-icon > span.a-icon-alt`
  )
    ? $(
        `#averageCustomerReviews > span.a-declarative > #acrPopover > span.a-declarative > a.a-popover-trigger > i.a-icon > span.a-icon-alt`
      )
        .html()
        .trim("")
    : "No rating provided";

  const totalRatings = $("#acrCustomerReviewText")
    ? $("#acrCustomerReviewText").html().trim()
    : "No total ratings provided.";

  const isAmazonChoice = $("span").hasClass("ac-badge-text-primary")
    ? "Yes"
    : "No";

  const stock = $(`#availability > span`)
    ? $(`#availability > span`).text().trim("")
    : `No stock provided.`;
  const listPrice = $(
    `#price > table > tbody > tr:nth-child(1) > td.a-span12.a-color-secondary.a-size-base > span.priceBlockStrikePriceString.a-text-strike`
  ).text()
    ? Number(
        $(
          `#price > table > tbody > tr:nth-child(1) > td.a-span12.a-color-secondary.a-size-base > span.priceBlockStrikePriceString.a-text-strike`
        )
          .text()
          .replace("$", "")
      )
    : price;
  const discount = listPrice ? parseInt(listPrice - price) : 0;

  return {
    asin,
    price,
    ratings,
    totalRatings,
    title,
    stock,
    listPrice,
    discount,
    isAmazonChoice,
  };
}

module.exports = {
  getHtml,
  getAsinByName,
  getAsinByPrice,
  getProductInfo,
};
