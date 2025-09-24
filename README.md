
<div align="center">
  <br>
  <h1>LetsCode</h1>
  <strong>Code Together, Code for Fun!</strong>
  <div align="center">
    <a href="https://letscode.hungweb.com/">Project Page</a> |
    <a href="https://shift0965.github.io/portfolio/">About Me</a>
    <br>
    <br>
    <img width="500" alt="letscode" src="https://github.com/shift0965/leetcode-clone/assets/53403797/b32f6601-5003-491a-8a67-3cf1f4f34db4">
</div>
</div>
<br>


A dynamic coding contest platform where you can practice algorithms, compete with friends, and enjoy coding challenges.

## How to Play? <a name="how-to-play"></a>

### 👑 Game Host:

1. Click "*Create Game*", choose the **problems** and click "*Create Game*" to enter the game lobby.
2. Observe all players' **real-time code** and the leaderboard.
3. Select any player to view their code for all problems and **send them messages**!
4. When you're ready, click "*Close Game*" to reveal the winner!

### 🥳 Game Player:

1. Click "Join Game" and enter the **Game Id** and your Player Name (no sign-up required).
2. Write down your solution, then click "Run" to execute example cases.
3. Review the input, output, expected output, console logs or errors.
4. Click "Submit" to execute all the hidden cases. If passed, see the leaderboard update!

## Structure

<div align="center">
    <img src="https://github.com/shift0965/leetcode-clone/assets/53403797/89487b94-eb4c-4caf-977c-74b9b5a6f018" width="800">
</div>

## Features

### Code Execution
- Applied a worker instance and child processes to securely execute user code and validate its output.
- Implemented a separate worker server to handle heavy tasks, preventing overload on the express server.
- Utilized a worker queue to efficiently manage traffic from the express server.
- Built the worker server with Bun instead of Node.js, resulting in a three-fold increase in user capacity.
- Implemented code error detection to notify users of any errors in their code, including excessively large output and potential infinite loops.

### Contest
- Enabled real-time code updates through **Redis pub-sub** and **Socket.IO**.
- Stored game states in the database, providing players and hosts with a seamless experience by allowing them to refresh and reconnect effortlessly.
- The host can watch the progress of every player's contest and interact with them through Bullet Screen.

<div align="center">
  <img width="800" alt="letscode_images" src="https://github.com/user-attachments/assets/22b306af-b1e7-4b18-86cc-7e1c5ea8824c" />
</div>


## Load Test

### Identified Critical Area

After conducting load tests on APIs and Socket.IO with K6, a bottleneck was discovered in the process of executing users' code and validating the output.

The original load test for the run code API revealed the following metrics:


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


## Acknowledgements

Give credit here.

- This project is inspired by [Leetcode](https://leetcode.com/problemset/all/) and [Kahoot](https://kahoot.com/).
