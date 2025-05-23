# BlogNest

**BlogNest** is a full-stack blogging web application where users can create, manage, and explore blogs. The project is built with the MERN stack, featuring a secure authentication system, CRUD operations for blogs, filtering, and a responsive UI.

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcryptjs

## Authentication Features

- Passwords are hashed using **bcryptjs**
- JWT-based authentication
- APIs are protected and accessible only to logged-in users

## Blog Features

- Create, Read, Update, Delete blogs
- Only authors can update or delete their blogs
- All logged-in users can view all blogs
- Filter blogs by **category**, **author**, or both

## Example Login Credentials
- Email - johndoe@example.com
- Password - Test@123

## Deployment Links
- FrontEnd - https://blog-nest-demo.netlify.app/
- BackEnd - https://blogging-application-be.onrender.com

## GitHub - BackEnd
- https://github.com/muthukumar24/Blogging-Application-BE.git

## Application Workflow
- Upon landing on the login page, users can log in using their credentials if they already have an account. Otherwise, they can create a new account by providing their name, email, and password.

- After a successful login, users will be redirected to the Blogs page, where they can view all available blogs. The View button allows users to read the full content of a blog.

- The Category and Author filters help users find specific blogs based on the selected criteria. Blogs can be filtered by category only, author only, or a combination of both. If the user selects a mismatched filter (i.e., a combination of category and author that doesn’t match any blogs), an alert message will be displayed stating that no blogs are available for the selected filter.

- To add a new blog, users can click on the Add Blogs option in the navigation menu.

- On the Add Blog page, users can enter the blog details such as title, author, category, content, and image, and then click the Submit button.

- To edit or delete a blog, users can go to the My Blogs section from the navigation bar. On this page, they will see Edit and Delete buttons at the bottom of blogs they have authored.

- Clicking the Edit button will navigate to the Edit Blog page, where existing blog details(title, author, category, content) are pre-filled and Add the Image again. Click the Update button to save changes. The Delete button will remove the blog permanently.

- The User Icon at the right end of the navigation bar allows users to log out from the application.


### Thankyou!!