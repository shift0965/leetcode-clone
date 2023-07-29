
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


Welcome to our dynamic coding contest platform, where you can practice algorithms, compete with friends, and enjoy coding challenges. Join us to enhance your coding skills and experience the excitement of real-time contests!

##  Outline
- [How to Play?](#how-to-play)
- [Tech Stack](#tech-stack)
- [Structure](#structure)
- [Features](#features)
- [Load Test](#load-test)
- [End-to-End Game Test](#end-to-end-game-test)
- [Acknowledgements](#acknowledgements)

## How to Play? <a name="how-to-play"></a>

### 👑 Game Host:

1. Login first, then click "*Create Game*".
2. Choose the **problems** for the game and set the **time limit**.
3. Click "*Create Game*" to enter the game lobby, where players can join using the **Game-Id**.
4. Click "*Start Game*" to observe all players' **real-time code**.
5. Select any player to view their code for all problems and **send them messages**!
6. When you're ready, click "*Close Game*" to reveal the winner!

### 🥳 Game Player:

1. Click "Join Game" and enter the Game Id and your Player Name.
2. Write down your solution, then click "Run" to execute example cases.
3. Review the input, output, expected output, and console logs. You will also be notified if any errors are detected.
4. Click "Submit" to execute all the hidden cases. If passed, see the leaderboard update!
5. Once the time is up or the host closes the game, the final game results will be displayed.

| Testing Account |               |
| --------------- | ------------- |
| Email           | test@test.com |
| Password        | test          |

## Tech Stack

### Server
![Nodejs](https://img.shields.io/badge/Node.js-343434?style=for-the-badge&logo=node.js&logoColor=3C873A)
![Express.js](https://img.shields.io/badge/Express.js-343434?style=for-the-badge&logo=express)
![SocketIo](https://img.shields.io/badge/Socket.io-343434?&style=for-the-badge&logo=Socket.io)
![Typescript](https://img.shields.io/badge/Typescript-343434?style=for-the-badge&logo=typescript&logoColor=007acc)
### Client

![React](https://img.shields.io/badge/-React-343434?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-343434?style=for-the-badge&logo=tailwindcss)
![Typescript](https://img.shields.io/badge/Typescript-343434?style=for-the-badge&logo=typescript)

### DataBase

![Redis](https://img.shields.io/badge/redis-343434?&style=for-the-badge&logo=redis&logoColor=RED)
![Mysql](https://img.shields.io/badge/MySQL-343434?style=for-the-badge&logo=mysql)

### Deployment And Test

![Jest](https://img.shields.io/badge/Jest-343434?style=for-the-badge&logo=jest&logoColor=C21325)
![Github Action](https://img.shields.io/badge/GitHub_Actions-343434?style=for-the-badge&logo=github-actions)
![Docker](https://img.shields.io/badge/Docker-343434?style=for-the-badge&logo=docker)

## Structure

<div align="center">
    <img src="https://github.com/shift0965/leetcode-clone/assets/53403797/89487b94-eb4c-4caf-977c-74b9b5a6f018" width="800">
</div>

## Features

### Code Execution
- Applied **VM** and **child processes** to securely execute user code and validate its output.
- Implemented a separate worker server to handle heavy tasks, preventing overload on the express server.
- Utilized a worker queue to efficiently manage traffic from the express server.
- Built the worker server with **Bun** instead of Node.js, resulting in a three-fold increase in user capacity.
- Implemented code error detection to notify users of any errors in their code, including excessively large output and potential infinite loops.

### Contest
- Enabled real-time code updates through **Redis pub-sub** and **Socket.IO**.
- Stored game states in the database, providing players and hosts with a seamless experience by allowing them to refresh and reconnect effortlessly.
- The host can watch the progress of every player's contest and interact with them through **Bullet Screen**.

### CICD
- Automated deployment and testing using **GitHub Actions** CI/CD and **Docker** on AWS.

## Load Test

### Identified Critical Area

After conducting load tests on APIs and Socket.IO with K6, a bottleneck was discovered in the process of executing users' code and validating the output.

The original load test for the run code API revealed the following metrics:

- Maximum virtual users: **30**
- Request rate: **6** requests per second

<div align="center">
    <img src="https://github.com/shift0965/leetcode-clone/assets/53403797/efb8061f-3a2c-4459-b2df-972039b42442" width="800">
</div>

The bottleneck appears to be occurring specifically during the execution and validation of user code.

### Improvement

To address the bottleneck, several important improvements have been implemented:

1. Bundling Functionality and Using an Independent Server:

   - Separated code execution functionality and hosted on an independent EC2 instance, preventing server blockage and ensuring smoother performance.

2. Implementation of a Worker Queue:

   - Introduced a worker queue to efficiently manage incoming requests. If the queue reaches capacity, users will be advised to run their code later.

3. Utilizing Bun JS for Faster Performance:
   - Switched to Bun from Node.js to significantly improved the execution speed.

<div align="center">
    <img src="https://github.com/shift0965/leetcode-clone/assets/53403797/1019e697-a4a1-4970-8fc0-9df84324fe61" width="800">
</div>

**Load Test Results:**

- Maximum virtual users: **100**
- Request rate: **20**

## End-to-End Game Test

**Selenium Test:**

1. Host login and start a game.
2. Player joins the game and submits a solution.
3. Host observes real-time updates and sends messages.
4. Close the game and verify results.


https://github.com/shift0965/leetcode-clone/assets/53403797/4e0944e0-aff2-4ebe-b7cc-c5eb30da1ff7



## Acknowledgements

Give credit here.

- This project is inspired by [Leetcode](https://leetcode.com/problemset/all/) and [Kahoot](https://kahoot.com/).
