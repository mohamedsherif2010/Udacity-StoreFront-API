# Storefront Backend Project
```
# Table of contents
```
* [Getting Started](#getting-started)
* [Overview](#overview)

## [Getting Started](#storefront-backend-project)
- To get started,run npm i in your terminal at the project root.
- You have to create two databases for main DB and testing DB with the following commands:
 - For Windows:<br />
    Open psql shell form start menu
 - For Linux:<br />
    Open terminal then execute the following command to enter psql:
    ```
    sudo -u postgres psql
    ```
THEN execute the following command on Wiindows or Linux:<br />
    ```
	CREATE DATABASE store_dev;
	CREATE DATABASE store_test;
	```

## [Overview](#storefront-backend-project)

1. DB Creation and Migrations
 - To run migrations up in dev environment use : 
    ```
    db-migrate up --config ./database.json --e dev
    ```
 - To run migrations down in dev environment use : 
    ```
    db-migrate reset --config ./database.json --e dev
    ```

 - No migrations is needed to run the tests as the test script will do the up and down migrations <br />
But if needed, to run migrations up on test use:```npm run testdb-up```<br />
And to run migrations down use : ```npm run testdb-down```

2. API endpoints
 - All API are described in REQUIREMENTS.md

3. Authentication
 - on user creation or successful authentication, user is provided a token, make sure to add this as a bearer token in authorization for routes that require authentication to work correctly

4. QA and README.md
 - to run tests for database(models) run :```npm run test-db```
 - to run tests for handlers run			: ```npm run test-handler```

5. Local host ports
 - For the database, port is default to ```5432``` 
 - For server is running on port ```5000```