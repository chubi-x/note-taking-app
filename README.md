To run the application you need to follow a series of steps to clone the repository, set up the environment, and start the application.

## Clone the GitHub repository locally
Use the `git clone` command to clone the GitHub repository to your local machine. Make sure you have Git installed on your local machine. 

` git clone https://github.com/chubi-x/note-taking-app.git`


Once done, navigate into the project directory using the cd command.

`cd note-taking-app`

## Install Dependencies

#### Install Required Software
Ensure you have the latest stable version of PHP, Composer, NodeJs, and NPM installed on your machine. You can download PHP from the official PHP website and install Composer following the instructions on the Composer website. 
You can also install NodeJs and NPM from the official NodeJs website.


#### Install Dependencies
Use Composer and npm to install all the required packages and dependencies for the project.

`composer install`

If you get the follwing error:

`Your lock file does not contain a compatible set of packages. Please run composer update.`

Run the following command to fix it:
`composer update`

Try running `composer install` again.

Next run:
`npm install` to install the npm packages

### Set Up Environment Configuration
Laravel projects require environment-specific configurations. Locate the .env.example file in the project's root directory, make a copy of this file and rename it to .env.

`cp .env.example .env`

### Generate Application Key
Laravel requires an application key to secure session data and other sensitive information. Generate this application key using the following command.

`php artisan key:generate`


### Run Migrations

Run migrations to create the necessary tables in the database.

`php artisan migrate`

you should be prompted to create the database. Type yes and hit enter.

### Run the Application
You can run the application using the following commands.

`php artisan serve` to start the laravel application

`npm run dev` to start the vite server

The application should now be running on your local machine. You can access it by visiting http://127.0.0.1:8000 or whatever url
the `php artisan serve` command gives you, in your browser.
