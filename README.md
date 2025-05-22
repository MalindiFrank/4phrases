# 4 Phrases

4Phrases is a simple web application that displays random quotes with interactive features. Users can swipe or tap to change quotes, view authors, and alter background colors. The idea for the application is a minimal and user-friendly interface. 
Feel free to add any improvements. [Check It Out!](https://4phrases.netlify.app/)

# Some Features To Note

- **Swipe and Tap Interactions**: Utilizes Hammer.js to detect swipe and tap gestures.
- **Dynamic Background Colors**: Changes background colors randomly from a predefined set.
- **Toggle Author Visibility**: Allows users to show or hide the author of the quote.

# An Even Better Web Feature 

- Project includes `manifest.webmanifest`: Web app manifest for progressive web app features.
  - The site can be installed as an app in any device and still feel and look the same, [Try It!](https://4phrases.netlify.app/)

# How It Actually Works

- **Fetching Quotes**: On page load and whenever the "next" button is clicked, a quote is fetched from the API endpoint `https://quotes-api-self.vercel.app/quote`.
- **Swipe Gestures**:
  - Swiping right displays the previous quote(s), continuous right swiping will keep revealing quotes you've seen so far
  - Swiping left fetches a new quote.
    
- **Tap Gestures**:
  - Double-tapping or panning/swiping up or down changes the background color.
    
- **Click Events**:
  - Clicking the quote toggles the visibility of the author.

# Dependencies

- [Hammer.js](https://hammerjs.github.io/): For gesture detection.

# Troubleshooting

- If the application shows "Site can't be reached," ensure you have an active internet connection.
- If background colors or quote interactions are not working well, check for errors in the browser console.

# Acknowledgements

- Thanks to the creators of Hammer.js for the gesture detection library.
- The quotes API used in this project is provided by [Quotes API](https://quotes-api-self.vercel.app/).
_________________________________________