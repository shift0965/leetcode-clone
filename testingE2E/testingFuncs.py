from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import time

def solve_twosum_with_console(driver):
    resetCode = driver.find_element(By.ID, "reset-code-btn")
    codeMirror = driver.find_element(By.ID, "code editor")
    codeLines = codeMirror.find_elements(By.CLASS_NAME, "cm-line")
    resetCode.click()
    time.sleep(1)

    for line in codeLines:
        if line.text == 'var twoSum = function(nums, target) {':
            
            action = ActionChains(driver)
            action.click(line)
            action.send_keys(Keys.END, Keys.END)
            action.pause(0.5)
            action.send_keys(Keys.ENTER)
            action.pause(0.5)
            action.send_keys(
                "var obj = {}; \nconsole.log(nums); \nfor(var i=0; i<nums.length; i++){ \nif(obj[nums[i]] !== undefined){ \nreturn [obj[nums[i]], i];"
            )
            action.pause(0.5)
            action.send_keys(Keys.DOWN, Keys.ENTER)
            action.pause(0.5)
            action.send_keys("else \nobj[target - nums[i]] = i;")
            action.perform()

            break

def click_run_btn(driver):
    runCode = driver.find_element(By.ID, "run-btn")
    runCode.click()
    time.sleep(3)

def click_submit_btn(driver):
    submitCode = driver.find_element(By.ID, "submit-btn")
    submitCode.click()
    time.sleep(3)

def login(driver):
    signIn = driver.find_element(By.ID, "sign-in-btn")
    signIn.click()
    time.sleep(1)

    emailInput = driver.find_element(By.NAME, "email")
    emailInput.send_keys("jackie@ee.com")
    passwordInput = driver.find_element(By.NAME, "password")
    passwordInput.send_keys("jackie")
    time.sleep(1)

    submit = driver.find_element(By.ID, "login-btn")
    submit.click()
    time.sleep(2)


def click_join_game_btn(driver):
    joinGame = driver.find_element(By.ID, "join-game-btn")
    joinGame.click()
    time.sleep(2)

def player_join_game(driver, gameId):
    gameIdInput = driver.find_element(By.NAME, "game-id")
    nameInput = driver.find_element(By.NAME, "name")
    gameIdInput.send_keys(gameId)
    nameInput.send_keys("Jackie")
    time.sleep(1)
    nameInput.send_keys(Keys.ENTER)
    time.sleep(2)

def select_questions(driver):
    addQuestion = driver.find_element(By.ID, "add-question-btn")
    for i in range(3):
        addQuestion.click()
    time.sleep(1)

    selections = driver.find_elements(By.TAG_NAME, "select")
    Select(selections[1]).select_by_visible_text('Unique Paths')
    Select(selections[2]).select_by_visible_text('Course Schedule')
    time.sleep(2)

def click_create_game_btn(driver):
    createGame = driver.find_element(By.ID, "create-game-btn")
    createGame.click()
    time.sleep(2)

def click_start_game_btn(driver):
    startGame = driver.find_element(By.ID, "start-game-btn")
    startGame.click()
    time.sleep(3)

def click_focus_player(driver, playerName):
    players = driver.find_elements(By.CLASS_NAME, "player-rank")
    #   "//button[@attr-player='Jackie']".format(playerName))
    for player in players:
        #print (player.get_attribute("player"))
        player.click()
        break
    time.sleep(3)

def click_close_game_btn(driver):
    closeGame = driver.find_element(By.ID, "close-game-btn")
    closeGame.click()
    time.sleep(2)

def click_leave_btn(driver):
    leaveGame = driver.find_element(By.ID, "leave-btn")
    leaveGame.click()
    time.sleep(2)


def send_message(driver, message):
    message_input = driver.find_element(By.NAME, "message")
    message_input.send_keys(message)
    time.sleep(1)
    send_message = driver.find_element(By.ID, "send-message-btn")
    send_message.click()
    time.sleep(6)

def click_exit_game_btn(driver):
    exit_game_btn = driver.find_element(By.ID, "exit-game-btn")
    exit_game_btn.click()
    time.sleep(1)

def click_profile_btn(driver):
    profile_btn = driver.find_element(By.ID, "profile-btn")
    profile_btn.click()
    time.sleep(2)
    close_btn = driver.find_element(By.TAG_NAME, "button")
    close_btn.click()