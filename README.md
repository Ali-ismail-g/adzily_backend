# adzily_backend
a simple todo app
you have to create .env file that has secret key called ==> {secretOrPrivateKey} for the authentication purpose
to Run backend app you need to install some packages by running the following:
* npm init 
* npm i express bcrypt bcryptjs body-parser dotenv jsonwebtoken mongodb mongoose nodemon --save
* npm start

In order to run API using postman

*to signup a new user you need to add{name , email, password} {method:POST}
#localhost:3000/user/signup
------
*to signin with an existing user you need {email , password} but make sure to set token you will get in the response in Headers section in postman 
key:x-access-token  and  value:${token}                       {method:POST}
#localhost:3000/user/signin
------

*to add a new todo with an existing user write in the body   {todo : "your todo"} {method:POST}
#localhost:3000/todo/addTodo
------

*to get todos only of a logged in user                        {method:GET}
#localhost:3000/todo/
------
