from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


options = Options()
options.add_experimental_option("detach", True)

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get("https://letscode.courater.com")
# driver.maximize_window()
wait = WebDriverWait(driver, 10) 
# problem finished loading
element = wait.until(EC.visibility_of_element_located((By.TAG_NAME, "table")))

links = driver.find_elements(By.TAG_NAME, 'a')
for link in links:
    #print(a.get_attribute("innerHTML"))
    if link.text == "Valid Parentheses":
        link.click()

        codeMirror = driver.find_element(By.CLASS_NAME, "codeMirror")
        break
    print(link.text)