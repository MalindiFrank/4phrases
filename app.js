(function () {
  const bgColors = [
    { background: "#f4f0ea", color: "#544b43" },
    { background: "#aa5a2e", color: "#f5f3f3" },
    { background: "#dfc7a9", color: "#544b43" },
    { background: "#533320", color: "#d3cfcb" },
    { background: "#373737", color: "#d3cfcb" },
    { background: "#b5a886", color: "#544b43" },
    { background: "#d418d4", color: "#ffffff" },
    { background: "#81ad6c", color: "#ffffff" },
    { background: "#6ca0ad", color: "#ffffff" },
    { background: "#c764a6", color: "#ffffff" },
    { background: "#c76464", color: "#413f3f" },
    { background: "#c76471", color: "#ffffff" },
    { background: "#cab058", color: "#252525" },
  ];

  const htmlTag = {
    nextButton: document.querySelector(".next"),
    author: document.querySelector("#author"),
    loader: document.querySelector("#loader"),
    quote: document.querySelector("#quote"),
    AnimationMsg: document.querySelector(".help"),
  };

  let quotesArray = [];
  let authorArray = [];
  let currentArrayIndex = 0;

  async function fetchAndHandleQuote() {
    try {
      const response = await fetch("https://quotes-api-self.vercel.app/quote");
      const data = await response.json();
      addContentToHtml(data);
    } catch (error) {
      htmlTag.loader.textContent =
        "Site can't be reached, check the connection.";
      htmlTag.nextButton.textContent = "Reload";
    }
  }

  function addContentToHtml(data) {
    htmlTag.loader.style.display = "none";
    htmlTag.quote.textContent = data.quote;
    htmlTag.author.textContent = data.author;
    htmlTag.nextButton.style.display = "";
    htmlTag.nextButton.textContent = "next";
    handlePreviousData(data.quote, data.author);
  }

  function goToPreviousWord() {
    if (currentArrayIndex > 0) {
      htmlTag.quote.textContent = quotesArray[--currentArrayIndex];
      htmlTag.author.textContent = authorArray[--currentArrayIndex];
    }
  }

  function handlePreviousData(quote, author) {
    quotesArray.push(quote);
    authorArray.push(author);
    currentArrayIndex = quotesArray.length - 1;
  }

  function setRandomBgColor(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    document.body.style.backgroundColor = arr[randomIndex].background;
    document.body.style.color = arr[randomIndex].color;
  }

  function showAuthorName() {
    htmlTag.author.style.display =
      htmlTag.author.style.display == "none" ? "" : "none";
  }

  function popUpMsg(txt) {
    htmlTag.AnimationMsg.textContent = txt;
    setTimeout(() => htmlTag.AnimationMsg.remove(), 3999);
  }

  const hammertime = new Hammer(document.querySelector("body"));

  hammertime.on("swiperight", goToPreviousWord);
  hammertime.on("swipeleft", fetchAndHandleQuote);
  hammertime.on("doubletap", () => setRandomBgColor(bgColors));
  hammertime.on("pandown", () => setRandomBgColor(bgColors));
  hammertime.on("panup", () => setRandomBgColor(bgColors));

  htmlTag.quote.addEventListener("click", showAuthorName);

  htmlTag.nextButton.addEventListener("click", fetchAndHandleQuote);

  document.addEventListener("DOMContentLoaded", () => {
    setRandomBgColor(bgColors);
    popUpMsg("‹ swipe & double tap›");
    fetchAndHandleQuote();
  });
})();
