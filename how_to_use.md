# How to Use AssetFlow Project

This guide is written for absolute beginners. If you have zero technical knowledge, follow these steps carefully.

---

# 1. What is this project?

AssetFlow is a simple system for managing company assets.

It helps you:
- add new assets
- see all assets in a list
- edit asset details
- delete assets
- track asset status

This project is divided into parts so each team member can work on a different section.

---

# 2. Before You Start

You need these things:
- a computer
- internet connection
- VS Code opened
- the project folder opened in VS Code

If you do not know what VS Code is, ask your team leader to open the project folder for you.

---

# 3. How to Open the Project

Follow these steps:
1. Open VS Code.
2. Click File.
3. Click Open Folder.
4. Choose the AssetFlow project folder.
5. Wait for the project to load.

Once the folder opens, you will see the project files on the left side.

---

# 4. How to Use the Project for Everyone

## General Rule
Each member should only work inside their assigned part.
Do not change files that belong to another member unless your team leader says so.

---

# 5. How Member 1 Should Use It

## Role
Member 1 works on:
- login and authentication
- dashboard
- organization setup

## What to Do
1. Open the folder named frontend.
2. Open the folder named src.
3. Open the folder named features.
4. Open the folder named auth-dashboard-org.
5. Add or update files related to login, dashboard, and organization setup here.

## Important Reminder
- Do not change the Asset Management folder.
- Do not change the Booking folder.
- Do not change the Maintenance folder.

## Simple Work Flow
1. Understand the task.
2. Open the correct folder.
3. Make changes only in that folder.
4. Save the file.
5. Ask the team leader to check it.

---

# 6. How Member 2 Should Use It

## Role
Member 2 works on:
- asset registration
- asset list
- asset editing
- asset deletion

## What to Do
1. Open the frontend folder.
2. Open src.
3. Open features.
4. Open asset-management.
5. Work only inside this folder.

## What This Folder Contains
Inside this folder, you will find:
- pages for asset screens
- components for forms and tables
- services for talking to the backend
- utilities for helper functions

## Simple Work Flow
1. Open the asset-management folder.
2. Add new pages or components if needed.
3. Save your work.
4. Make sure your changes are only inside this folder.

---

# 7. How Member 3 Should Use It

## Role
Member 3 works on:
- allocation of assets
- transfer of assets
- resource booking

## What to Do
1. Open the frontend folder.
2. Open src.
3. Open features.
4. Open allocation-booking.
5. Add or update files related to allocation and booking here.

## Important Reminder
- Do not change the Asset Management files.
- Do not change the Authentication files.

## Simple Work Flow
1. Open the correct folder.
2. Build the feature there.
3. Save the change.
4. Inform the team leader.

---

# 8. How Member 4 Should Use It

## Role
Member 4 works on:
- maintenance management
- audit
- reports
- notifications

## What to Do
1. Open the frontend folder.
2. Open src.
3. Open features.
4. Open maintenance-audit-reports.
5. Add or update files for maintenance, audit, reports, and notifications here.

## Important Reminder
- Keep all work inside this folder.
- Do not edit other members' folders.

---

# 9. How the Backend Team Should Use It

The backend is the part that stores and manages data.

## Backend Folder Structure
Open the backend folder.
Then open src.
Then open features.
Then open the matching feature folder.

Example:
- asset-management for assets
- auth-dashboard-org for authentication
- allocation-booking for booking logic
- maintenance-audit-reports for maintenance and reports

## What to Do
1. Open the matching backend folder.
2. Add routes, controllers, services, and validators there.
3. Keep the work organized.
4. Do not edit another member's backend folder.

---

# 10. How to Run the Project

This section gives the exact commands to run the project.

## 10.1 Open the terminal
1. Open VS Code.
2. Click Terminal.
3. Click New Terminal.
4. A terminal window will open at the bottom of VS Code.

## 10.2 Run the frontend
1. In the terminal, go to the frontend folder.
2. Type this command:

```bash
cd frontend
```

3. Then install dependencies if needed:

```bash
npm install
```

4. Then start the frontend:

```bash
npm run dev
```

5. After running the command, you will see a local address like this:

```bash
http://localhost:5173
```

6. Open that address in your browser.

## 10.3 Run the backend
1. Open a second terminal.
2. Go to the backend folder.
3. Type this command:

```bash
cd backend
```

4. Then install dependencies if needed:

```bash
npm install
```

5. Then start the backend:

```bash
node src/server.js
```

6. If the backend uses nodemon, you can also run:

```bash
npx nodemon src/server.js
```

7. The backend will usually run on a port like:

```bash
http://localhost:5000
```

## 10.4 If you see an error
If you see an error like "command not found", then run:

```bash
npm install
```

If the project is missing packages, install them again.

## 10.5 If you want to stop the app
Press:

```bash
Ctrl + C
```

This will stop the running server.

---

# 11. How to Access the Asset Management Module

If you want to use the Asset Management part:
1. Open the frontend project.
2. Go to the Asset Management page.
3. You will see a form to register a new asset.
4. Fill in the asset details.
5. Click save.
6. The system will create an asset tag automatically.

Example asset tag:
- AF-0001
- AF-0002

---

# 12. How to Register an Asset

Follow these steps:
1. Open the Asset Management page.
2. Fill in the asset name.
3. Enter the category.
4. Enter the serial number.
5. Choose the acquisition date.
6. Enter the acquisition cost.
7. Choose the condition.
8. Enter the location.
9. Choose whether the asset is bookable.
10. Click save.

The system will generate an asset tag automatically.

---

# 13. How to View All Assets

1. Open the Asset List page.
2. You will see a table with all assets.
3. You can search by asset tag, name, or serial number.
4. You can filter by category, status, or location.

---

# 14. How to Edit an Asset

1. Open the asset list.
2. Find the asset you want to edit.
3. Click the Edit button.
4. Change the needed fields.
5. Click Save.

---

# 15. How to Delete an Asset

1. Open the asset list.
2. Find the asset.
3. Click Delete.
4. Confirm the action if asked.

The system should remove the asset softly so it is not permanently lost.

---

# 11. How to Access the Asset Management Module

If you want to use the Asset Management part:
1. Open the frontend project.
2. Go to the Asset Management page.
3. You will see a form to register a new asset.
4. Fill in the asset details.
5. Click save.
6. The system will create an asset tag automatically.

Example asset tag:
- AF-0001
- AF-0002

---

# 12. How to Register an Asset

Follow these steps:
1. Open the Asset Management page.
2. Fill in the asset name.
3. Enter the category.
4. Enter the serial number.
5. Choose the acquisition date.
6. Enter the acquisition cost.
7. Choose the condition.
8. Enter the location.
9. Choose whether the asset is bookable.
10. Click save.

The system will generate an asset tag automatically.

---

# 13. How to View All Assets

1. Open the Asset List page.
2. You will see a table with all assets.
3. You can search by asset tag, name, or serial number.
4. You can filter by category, status, or location.

---

# 14. How to Edit an Asset

1. Open the asset list.
2. Find the asset you want to edit.
3. Click the Edit button.
4. Change the needed fields.
5. Click Save.

---

# 15. How to Delete an Asset

1. Open the asset list.
2. Find the asset.
3. Click Delete.
4. Confirm the action if asked.

The system should remove the asset softly so it is not permanently lost.

---

# 16. How to Work Without Breaking the Project

Follow these safety rules:
- work only in your own folder
- do not edit other members' files
- save your work often
- ask before changing shared files
- keep the code simple
- do not delete important files without checking

---

# 17. Simple Team Rule

If you are unsure:
1. stop
2. ask the team leader
3. do not guess

This is the safest way to avoid errors.

---

# 18. Final Reminder

The easiest way to work is:
1. understand your task
2. open your folder
3. make small changes
4. save often
5. test your work
6. tell the team leader

This project is meant to be simple, fast, and easy to complete in a hackathon.
