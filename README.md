# secure-task-manager-2025-03-10
 Secure Task Manager Web App - Assignment received on 6th March 2025 - W.M. Uditha Erandake Wijekoon 


-------------------------------------------------------------------------
Installation and Setup
-------------------------------------------------------------------------
***Before running the project, ensure you have the following installed:

    * PHP & Composer
    * Laravel 
    * XAMPP
    * MySQL 
    * Node.js & npm
    * Postman (for API testing)
    * Tymon JWT Auth (tymon/jwt-auth) – Required for authentication

-------------------------------------------------------------------------
Downloading and Setup
-------------------------------------------------------------------------
1. Download the 'secure-task-manager-2025-03-10' ZIP file of the project from the repository.
2. Extract the ZIP file and Copy the 'TaskManager' project folder inside the ZIP file.
3. Paste 'TaskManager' folder on C:/xampp/htdocs/


--------------------
--------------------
***Backend Setup***
--------------------
--------------------


-------------------------------------------------------------------------
Database Setup
-------------------------------------------------------------------------
1. Open phpMyAdmin and create a database called "task_manager" manually or by running this command on phpMyAdmin: 

   "CREATE DATABASE task_manager;"

2. Import "task_manager.sql" from the downloaded "TaskManager" folder to the database "task_manager".

-------------------------------------------------------------------------
Backend Installation Steps ( by running this commands in your terminal )
-------------------------------------------------------------------------

1. Navigate to the project folder - backend:

    "cd C:/xampp/htdocs/TaskManager/backend" //Or your path to the backend folder of 'TaskManager'.

2. Install dependencies:

    "composer install"

3. Create and configure '.env' file:

    "cp .env.example .env"

*** Update the database credentials in the '.env' file: 

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=task_manager
    DB_USERNAME=root
    DB_PASSWORD=

5. Generate JWT Secret Key

    "php artisan jwt:secret"

6. Generate application key:

    "php artisan key:generate"

7. To list API routes:

    "php artisan route:list"

8. Start the Laravel server (Make sure APACHE and MYSQL servers of XAMPP are Started):

    "php artisan serve"

9. If needed, clear cache and restart server:

    "php artisan cache:clear"
    "php artisan config:clear"
    "php artisan route:clear"
    "php artisan serve"

***IMPORTANT: Now make sure backend server is running in the background***


------------------------------------------------------------------------------
------------------------------------------------------------------------------
***Frontend Setup (Make sure APACHE and MYSQL servers of XAMPP are Started)***
------------------------------------------------------------------------------
------------------------------------------------------------------------------

1. Make sure 'frontend' folder of 'TaskManager' project is inside the 'htdocs' folder in xampp.

2. Open a web browser and type this URL:

    "localhost/TaskManager/frontend"

3. Register a new user or login as existing user. Here are some logins for users:

    "Email: mail1@email.com"
    "Password: 123456"

    "Email: mail2@email.com"
    "Password: 123456"

4. You can Manage your tasks after login...

***I included a documentation of the assignment inside the project folder***
----------------------------------
----------------------------------
---DEVELOPED BY UDITHA WIJEKOON---
----------------------------------
----------------------------------