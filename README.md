This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Its purpose is to read and display a list of food items, allowing the user to choose some to add to a recipe. The recipe is displayed in a table that shows the totals for selected nutrients, and also (in the final project part, which you'll create) as a traditional recipe, with a list of ingredients and directions for making it.

## Notes about setup

### Repository
The repo for this project is at https://bitbucket.org/htriolo/food

To install it in a folder on the desktop called final, open the terminal window (using Git Bash, or WebStorm) and cd to the Desktop.  Then do:

```
git clone https://bitbucket.org/htriolo/food.git final
cd final
npm install
```

(if you have trouble installing, try deleting package-lock.json and yarn.lock first)

### Run the app
In Desktop/final, run 
```
npm start
```

### Save your work
After you make some changes and want to save them, do:
```
git add .
git commit -m "Add input field for recipe name and state property recipeName to keep it"
```

When you want to push to your bitbucket or github account, commit your changes and do:
```
git push origin master
```

When you want to push to Heroku, commit your changes and do:
```
git push heroku master
```


## Final Project

Below the existing app, add an area that looks like this at first:

![Start setup](https://s3-us-west-1.amazonaws.com/lfm-general/mc2019/screen1.png)

Then when the user starts entering ingredients, looks like this:

![Intermediate view](https://s3-us-west-1.amazonaws.com/lfm-general/mc2019/screen2.png)

And finally looks like this:

![Final view](https://s3-us-west-1.amazonaws.com/lfm-general/mc2019/screen3.png)

## Learn more

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
