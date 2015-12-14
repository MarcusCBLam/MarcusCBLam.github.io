# github-api-repositories

<b>Using AngularJS for accessing Github repositories.</b>

The purpose of this app is to create a interface using the Github API (https://developer.github.com/v3/). It allows you to enter enter a search phrase and search either the Users list or the organisations list. 

On submitting, the app will return some basic info on the user/organisation and show a paginated table of the results. 

Here you can:

1. Paginate - Each page is set to display 15 records. Using server-side pagination, you can scroll through the pages using the pagination component. The component is by UI Bootstraps and works great for quick interfacing. Note that the maximum number of records allowed by Github is 1000 so I've applied a limiter in the code to avoid issues with large repositories.

2. Sort By - I've added buttons to the table header to allow sorting on some of the fields. All buttons have toggle states so each press will alternate between descending and ascending order sort. This is done on server-side too. 

3. Filter - you can filter the name and descripion of the repositories. As you can't search repositories server-side, this is done client-side on the page. You can use the pagination components to scroll through the filtered results. 


# To Do's

* Use TypeAhead to finf matches in the search users/organisations field.
* Add more sorting and show sort direction.
* only use basic styling so will be good to stylise it a bit more.
* Automated tests



