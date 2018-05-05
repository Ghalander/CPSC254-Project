## Open Source Applications
React Javascript Framework - https://reactjs.org/ - MIT License
Node Server - https://nodejs.org/en/ - MIT License
SQLite3 - https://www.sqlite.org/index.html - Public Domain (Open Souce, not Open-Contribution)

---
## Dependencies you may need to install to run everything
  - bootstrap `npm install bootstrap`
  - immutability-helper `npm install immutability-helper` https://github.com/kolodny/immutability-helper
  - nodejs `node install`
  - react `npm install react`
  - sqlite3 `npm install sqlite3`


  I would google how to install sqlite3 on your computer since it's windows.
  Since you already have node maybe it's just `node install sqlite3`, I'm not sure though.

## To start client
```
  cd dtf-budget-app
  npm start (or 'yarn start' works too)
```

## To start server
Open another instance of terminal/command prompt (you my be able to press ctrl-t for a new tab)
```
  cd dtf-budget-app
  node server.js
```

## How to add data to the server
  `cd dtf-budget-app`

  You should see a file called `bootlegger.db`
  Once you've installed `sqlite3` open the database by typing
  `sqlite3 bootlegger.db`
  Then you can see a list of tables I've made for testing by typing `.tables`
  From here you can types

  `SELECT * from <whatevTables>;`

  Replace `<whatevTables>` with the table you want to see. And it will return everything in that table.

  For a great resource check out [sqlite documentation](https://www.sqlite.org/lang.html)

  Here's a mini How To guide:
  Create a new table:
  `CREATE TABLE testHannah(pk INTEGER PRIMARY KEY ASC, price INTEGER, name, VARCHAR(35), type VARCHAR(15), bar VARCHAR(100));`
  This creates a table that has 4 columns, a primary key (start it at 1), a price for the drink as an integer, name of the drink with a 35 character limit, name of the bar with a 100 character limit.

  Insert data into the table;
  I haven't really found an fast way to do this so we will be code monkeys for a bit when we actually put in real data.
  `INSERT INTO testHannah(pk, price, name, type, bar) VALUES (1, 7, Angry Orchard Rose, Cider, The Rusty Pupper)`
  You will need to add the table name and the columns, then the values as the table corresponds. Just do that a few times while increasing the `pk` value by one each time.

## How to get your new data to appear
  `cd dtf-budget-app`
  open `server.js` in your favorite text editor
  You should see a line that has `const TABLE = 'testFINAL';`
  Replace `testFINAL` with `testHannah` and it should work.

  Note:
  Every time you change something in `server.js` you will need to restart the server. So hit ctrl-c then `node server.js`.

## As for what the database should be down the line...
  I don't know how deep we should get into it. I don't know if we have time for photo of the drinks either.

  - One table will have (pk, price, name (of drink), type (of drink), barID)
    which will hold the price and name of the drink then the respective bar it came from in ID form.
  - One table will have (pk, barID, barName, barPhoto)
    Then the bar name and photo so we don't have to keep typing long names.

    Then we will just join them together by barID and it should cut down good time.

---
## Edit a file

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Click **Source** on the left side.
2. Click the README.md link from the list of files.
3. Click the **Edit** button.
4. Delete the following text:
5. After making your change, click **Commit** and then **Commit** again in the dialog. The commit page will open and you’ll see the change you just made.
6. Go back to the **Source** page.

---

## Create a file

Next, you’ll add a new file to this repository.

1. Click the **New file** button at the top of the **Source** page.
2. Give the file a filename of **contributors.txt**.
3. Enter your name in the empty file space.
4. Click **Commit** and then **Commit** again in the dialog.
5. Go back to the **Source** page.

Before you move on, go ahead and explore the repository. You've already seen the **Source** page, but check out the **Commits**, **Branches**, and **Settings** pages.

---

## Clone a repository

Use these steps to clone from SourceTree, our client for using the repository command-line free. Cloning allows you to work on your files locally. If you don't yet have SourceTree, [download and install first](https://www.sourcetreeapp.com/). If you prefer to clone from the command line, see [Clone a repository](https://confluence.atlassian.com/x/4whODQ).

1. You’ll see the clone button under the **Source** heading. Click that button.
2. Now click **Check out in SourceTree**. You may need to create a SourceTree account or log in.
3. When you see the **Clone New** dialog in SourceTree, update the destination path and name if you’d like to and then click **Clone**.
4. Open the directory you just created to see your repository’s files.

Now that you're more familiar with your Bitbucket repository, go ahead and add a new file locally. You can [push your change back to Bitbucket with SourceTree](https://confluence.atlassian.com/x/iqyBMg), or you can [add, commit,](https://confluence.atlassian.com/x/8QhODQ) and [push from the command line](https://confluence.atlassian.com/x/NQ0zDQ).
