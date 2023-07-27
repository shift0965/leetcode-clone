import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from testingFuncs import *
import time

class gameTest(unittest.TestCase):

    def host_login(self):
        driver = self.hostDriver
        login(driver)

    def host_create_game(self):
        driver = self.hostDriver

        #click create game at homepage
        click_create_game_btn(driver)

        #select questions
        select_questions(driver)

        #click create game at problem creation page
        click_create_game_btn(driver)

        self.gameId = driver.find_element(By.ID, "game-id").text

    def player_join_game(self):
        driver = self.playerDriver

        #click join game at homepage
        click_join_game_btn(driver)

        #fill in info and click join game
        player_join_game(driver, self.gameId)
        
    def player_type_code(self):
        driver = self.playerDriver
        solve_twosum_with_console(driver)

    def host_start_game(self):
        driver = self.hostDriver
        click_start_game_btn(driver)

    def player_run_and_sunmit(self):
        driver = self.playerDriver
        click_run_btn(driver)
        click_submit_btn(driver)

    def host_click_focus(self):
        driver = self.hostDriver
        click_focus_player(driver, "Jackie")

    def host_close_game(self):
        driver = self.hostDriver
        click_close_game_btn(driver)
        
    def host_leave_game(self):
        driver = self.hostDriver
        click_leave_btn(driver)
        
    def host_send_message(self):
        driver = self.hostDriver
        send_message(driver, "Nice work!")

    def player_exit_game(self):
        driver = self.playerDriver
        click_exit_game_btn(driver)

    def host_click_profile(self):
        driver = self.hostDriver
        click_profile_btn(driver)



    def test_create_game(self): 
        self.service = Service()
        self.hostDriver = webdriver.Chrome(service=self.service)
        self.hostDriver.get("https://letscode.courater.com")
        self.playerDriver = webdriver.Chrome(service=self.service)
        self.playerDriver.get("https://letscode.courater.com")

        time.sleep(2)
        self.host_login()
        self.host_create_game()
        self.player_join_game()
        self.host_start_game()
        self.player_type_code()
        self.player_run_and_sunmit()
        self.host_click_focus()
        self.host_send_message()
        self.host_close_game()
        
        self.host_leave_game()
        self.player_exit_game()
        self.host_click_profile()
        time.sleep(3)

        self.hostDriver.close()
        self.playerDriver.close()


if __name__ == "__main__":
    unittest.main()