# Task requirements

Create a basic React Native app that allows users to view a list of recipes, each with a title, pictures, ingredients list and instructions.

When opening the app we should be prompted to enter our name. This should be kept in the phone's storage and used later on throughout the app, alongside the name we can store a uuid that can be used for favoriting or editing/deleting recipes. After we successfully enter our name we will no longer be prompted to enter it when opening the app, only if the value is no longer set.

When we have our name we will be greeted with a list of recipes. As this list can be huge we should virtualize it and paginate it, that is very important. We can simply paginate it with our json-server using paginate or slice options. New data should be loaded in on scroll down when we are reaching the end. And there should be an option to swipe down and refresh the list. It is also very important that all data is kept in memory while the app is running so that when we go from one page and back the data is still there and not fetched again.

Each item in the list should have a picture, title, snipped from the description and some more metadata like cook time, author, difficulty and such. It is all on you what data you want to display in any way you desire.

When clicking on an item in the list you should be redirected to the recipe details screen, where you create a new API for that specific recipe. Display all the data in any way you think is pleasing to the eye. You can display the images in a carousel. It is important that no subsequent API calls are made when we enter the same recipe twice.

In the topbar there should be an add recipe icon that when clicked on opens a new page with a form that contains all necessary fields like title, description, ingredients list, cook time, and pictures. You can also add any additional fields you think are necessary or relevant to this. For the images we will have the option of selecting from our gallery or taking a photo directly. You should consider the permission of the user and accordingly display the UI. The images can be converted to base64 and sent with the payload to the server to avoid any additional dependencies with storage buckets.

**Bonus Challenges**

`*` Search - add a search bar to allow users to search for recipes by title or ingredients.  
`*` Favorite Recipes - allow users to mark recipes as favorites, and create a separate screen to display their favorite recipes.  
`*` Add/Edit Recipes - implement a way for users to add new recipes or edit existing ones. You can use modal dialogs for this purpose.  
`*` Categories/Tags - allow recipes to be categorized or tagged, and provide a way to filter recipes by category or tag.  

**Requirements**

`*` Use React Native CLI  
`*` Use TypeScript  
`*` Use eslint and prettier for code styling and formatting  
`*` Use Zustand for state management  
`*` Use React Hook Form for form management  
`*` Use React Query for API calls  
`*` Use React Navigation for routing  
`*` Use json-server for an out of the box for a REST server  
`*` You can use any UI Library or your own solution  
