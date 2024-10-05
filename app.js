(function () {

  const bgColors = [
    { background: "#f4f0ea", color: "#544b43" },
    { background: "#aa5a2e", color: "#f5f3f3" },
    { background: "#dfc7a9", color: "#544b43" },
    { background: "#533320", color: "#d3cfcb" },
    { background: "#373737", color: "#d3cfcb" },
    { background: "#b5a886", color: "#544b43" },
    { background: "#d418d4", color: "#ffffff"},
    { background: "#ff00ff8f", color: "#ffffff"},
    { background: "#81ad6c", color: "#ffffff"},
    { background: "#6ca0ad", color: "#ffffff"},
    { background: "#c764a6", color: "#ffffff"},
    { background: "#c76464", color: "#413f3f"},
    { background: "#c76471", color: "#ffffff"},
    { background: "#cab058", color: "#252525"},
  ];

  const elements = {
    nextButton: document.querySelector(".next"),
    author: document.querySelector("#author"),
    loader: document.querySelector("#loader"),
    quote: document.querySelector("#quote"),
  };

  let quotesArray = [];
  let authorArray = [];
  let currentArrayIndex = 0;

  async function fetchAndHandleQuote() {
    try {
      const response = await fetch("https://quotes-api-self.vercel.app/quote");
      //fetch('https://example.com/resource', { mode: 'no-cors' })
      const data = await response.json();
      addContentToHtml(data);
    } catch (error) {
      elements.loader.textContent =
        "Site can't be reached, check the connection.";
      elements.nextButton.textContent = "Reload";
    };
  };

  function addContentToHtml(data) {
    elements.loader.style.display = "none";
    elements.quote.textContent = data.quote;
    elements.author.textContent = data.author;
    elements.nextButton.style.display = "";
    elements.nextButton.textContent = "next";
    quotesArray.push(data.quote);
    authorArray.push(data.author);
    currentArrayIndex = quotesArray.length - 1;
  };

  function goToPreviousWord() {
    if (currentArrayIndex > 0) {
      elements.quote.textContent =
        quotesArray[--currentArrayIndex];
      elements.author.textContent =
        authorArray[--currentArrayIndex];
    };
  };

  function setRandomBgColor(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    document.body.style.backgroundColor = arr[randomIndex].background;
    document.body.style.color = arr[randomIndex].color;
  };

  function popUpMsg(txt) {
    const popUpMsgEl = document.querySelector(".help");
    popUpMsgEl.textContent = txt;
    setTimeout(() => popUpMsgEl.remove(), 2999);
  };

  function showAuthorName() {
    elements.author.style
      .display = elements.author.style.display == 'none' ? '' : 'none';
  };

  const hammertime = new Hammer(document.querySelector("body"));

  hammertime.on("swiperight", goToPreviousWord);
  hammertime.on("swipeleft", fetchAndHandleQuote);
  hammertime.on("doubletap", () => setRandomBgColor(bgColors));
  hammertime.on("pandown", () => setRandomBgColor(bgColors));
  hammertime.on("panup", () => setRandomBgColor(bgColors));

  elements.quote
    .addEventListener("click", showAuthorName);

  elements.nextButton
    .addEventListener("click", fetchAndHandleQuote);

  document.addEventListener("DOMContentLoaded", () => {
    setRandomBgColor(bgColors);
    popUpMsg("‹ swipe & tap ›");
    fetchAndHandleQuote();
  });

})();