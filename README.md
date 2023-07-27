<div align="center">
  <br>
  <h1>LetsCode</h1>
  <strong>Code Together, Code for Fun!</strong>
  <div align="center">
    <a href="https://letscode.courater.com/">Home Page</a> |
    <a href="https://drive.google.com/file/d/1mEXF2dGyqi4U4Kx2WkBKsURcxzXcRzSY/view?usp=sharing">Video Intro</a> |
    <a href="https://shift0965.github.io/portfolio/">About Me</a>
    <br>
    <br>
    <img width="500" alt="letscode" src="https://github.com/shift0965/leetcode-clone/assets/53403797/b32f6601-5003-491a-8a67-3cf1f4f34db4">
</div>
</div>
<br>

## How to Play?


### 👑 Game Host:

1. **Login** first, then click "Create Game."
2. Choose the **problems** for the game and set the **time limit**.
3. Click "Create Game" to enter the game lobby, where players can join using the **Game-Id**.
4. Click "Start Game" to observe all players' real-time code.
5. Select any player to view their code for all problems and send them messages!
6. When you're ready, click "Close Game" to reveal the winner!

### 🥳 Game Player:

1. Click "Join Game" and enter the **Game Id** and your **Player Name**.
2. Write down your **solution**, then click "Run" and "Submit" to see the leaderboard update!
3. Once the time is up or the host closes the game, the final game results will be displayed.

| Testing Account |               |
| --------------- | ------------- |
| Email           | jackie@ee.com |
| Password        | jackie        |

## Tech Used

### Server

![Nodejs](https://img.shields.io/badge/Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SocketIo](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)
![Typescript](https://img.shields.io/badge/Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc)<br/>

### Client

![React](https://img.shields.io/badge/-React-61DBFB?style=for-the-badge&labelColor=black&logo=react&logoColor=61DBFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-092749?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&labelColor=000000)
![Typescript](https://img.shields.io/badge/Typescript-007acc?style=for-the-badge&labelColor=black&logo=typescript&logoColor=007acc)

### DataBase

![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)
![Mysql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

### Deployment And Test

![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Github Action](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

## Structure

![structure](https://github.com/shift0965/leetcode-clone/assets/53403797/89487b94-eb4c-4caf-977c-74b9b5a6f018)


## Features

- Enabled real-time code updates through **Redis pub-sub** and **Socket.IO**.
- Implemented a separate worker server to handle heavy tasks, preventing overload on the express server.
- Utilized a worker queue to efficiently manage traffic from the express server.
- Built the worker server with **Bun** instead of Node.js, resulting in a three-fold increase in user capacity.
- Applied **VM** and **child processes** to securely execute user code and validate its output.
- Automated deployment and testing using **GitHub Actions** CI/CD and **Docker** on AWS.
- Stored game states in the database, providing players and hosts with a seamless experience by allowing them to refresh and reconnect effortlessly.

## Load Test

### Identified Critical Area

After conducting load tests on APIs, Socket.IO, and other functionalities, a bottleneck was discovered in the process of executing users' code and validating the output.

The original load test for the run code API revealed the following metrics:

- Maximum virtual users: **30**
- Request rate: **6** requests per second

![test_original](https://github.com/shift0965/leetcode-clone/assets/53403797/efb8061f-3a2c-4459-b2df-972039b42442)


The bottleneck appears to be occurring specifically during the execution and validation of user code.

### Improvement

To address the bottleneck, several important improvements have been implemented:

1. Bundling Functionality and Using an Independent Server:

   - Separated code execution functionality and hosted on an independent EC2 instance, preventing server blockage and ensuring smoother performance.

2. Implementation of a Worker Queue:

   - Introduced a worker queue to efficiently manage incoming requests. If the queue reaches capacity, users will be advised to run their code later.

3. Utilizing Bun JS for Faster Performance:
   - Switched to Bun from Node.js to significantly improved the execution speed.

![test_with_Bun](https://github.com/shift0965/leetcode-clone/assets/53403797/1019e697-a4a1-4970-8fc0-9df84324fe61)


**Load Test Results:**

- Maximum virtual users: **100**
- Request rate: **20**

## Selenium test for game



https://github.com/shift0965/leetcode-clone/assets/53403797/3d1c8d9b-bf96-46ea-97de-f309cccfaa4c



## Acknowledgements

Give credit here.

- This project is inspired by [Leetcode](https://leetcode.com/problemset/all/).
