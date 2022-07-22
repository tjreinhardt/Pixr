# Welcome to Sweetr!

Thanks for using Sweetr app! Here you can share images of your favorite sweets/desserts/recipes with the rest of the world! Feel free to browse and explore all the sweet treats that humanity has to offer!!


Live-link to Sweetr here: https://sweetr.herokuapp.com/signup

## Sweetr User Guide

Phase 1:
1) Clone the repo and run npm install
2) Create a .env file and fill all required fields, refer to the .env.example for reference
3) Create a database user (with createDB) using the same information you wrote inside of your .env file
3) After that you will want -->


On the top of the page, in the nav bar, you'll find "Log In", "Sign Up"". Using the "Log In" link you will be redirected to the "Log In Page" where you can log in with your credentials or login as a demo user! If you do not have an account you can create one via the "Signup" button in the navbar.

You may login as a demo user from the signup page as well as the login page.

After logging in, you may add images URL image using the "Upload" link that will now appear in the nav bar.

While logged in, a user can browse all images posted on the app, as well as view specific details such as the title/description of the image upon clicking the image in the browse image feed. Logged in users also can create collections, view all of their created collections, and delete collections they have created. Users may also edit uploaded images and change all information about the image, such as the title, URL, and description.


## List of Technologies Used

### For this project, I used the PERN Stack

- Javascript
- React
- Redux
- SEQEULIZE
- PostgreSQL
- Node.js
- Express.js
- HTML
- CSS
- React-Map-GL
- React-Mapbox-GL
- Turf

## Features of Sweetr

- Sign-In/Log-In with user creditionals
- Demo User
- Create, Read, Update, and Destroy Images with geolocation and error handling
- Create, Read and Destroy Collections with error gandling
- Interactive Map Tool that users may view/update

## Future Goals For This App

- Edit Collections
- Merry-Go-Round style image-feeds, more dynamic scaling depending on image size uploaded
- Tags
- Add Comments, Upvotes, Downvotes
- Saved Images incorporated with "trend" algorithm
- Location Tags, Hashtags, Search Algorithms

## Unique Technical Implementation

Approaching this project as a former audio engineer, I know firsthand how data storage can be an issue when designing an app. After researching a few methods on how to better store, or cache data, I made a cool implementation to the image feed! I used a technique that my brother taught me during my first week of react, called useMemo. This method uses 'Memoization', which will store data in a cache, causing data to load much quicker upon a re-render, as it only has to return that data from the stored cache. Upon using the app, youll notice that the image-feed loads incredibly quick, despite the fact that most of the images used are 4k resolution images! Check out the implementation below:

```
  const memoImages = React.useMemo(
    () => images.map((image) => {
      return (
        <NavLink className="image-cards" key={image.id} to={`/images/${image.id}`}>
          <ImageCard className="image-card" imageURL={image.imageUrl} />
        </NavLink>
      );
    }),
    [images]
  )
  React.useEffect(() => {
    dispatch(getImages());
  }, [dispatch])

  if (!images.length) {
    return null;
  }


  return (
    <div className='image-feed-container-div'>
      <div className="image-container">
        {memoImages}
      </ div>
    </div>
  );
};
```
