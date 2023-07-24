from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import time


def solveTwoSumWithConsole(driver):
    resetCode = driver.find_element(By.CSS_SELECTOR, "[aria-label='reset code']")
    codeMirror = driver.find_element(By.ID, "code editor")
    codeLines = codeMirror.find_elements(By.CLASS_NAME, "cm-line")

    # start action
    action = ActionChains(driver)
    action.click(resetCode)
    action.pause(1)
    action.click(codeLines[4])
    action.send_keys(
        "\nvar obj = {}; \nconsole.log(nums); \nfor(var i=0; i<nums.length; i++){ \nif(obj[nums[i]] !== undefined){ \nreturn [obj[nums[i]], i];"
    )
    action.pause(1)
    action.send_keys(Keys.DOWN, Keys.ENTER)
    action.pause(1)
    action.send_keys("else \nobj[target - nums[i]] = i;")
    action.perform()


def testTwoSum():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.get("https://letscode.courater.com")
    twoSumLink = driver.find_element(By.CSS_SELECTOR, "[aria-label='Two sum']")
    twoSumLink.click()
    time.sleep(1)
    solveTwoSumWithConsole(driver)

    runCode = driver.find_element(By.CSS_SELECTOR, "[aria-label='run]")

    driver.quit()


testTwoSum()
