# This file is used to load initial data into database
# First user is loaded and then meals is loaded for the users

import json
import random


FIRST_NAME = [
    'Raju', 'Ram', 'Hari', 'Ganesh', 'Gopal', 'Prem', 'Kumar', 'Narayan',
    'Balram', 'Anjay', 'Rajesh', 'Hari Shankar',
    'Shankar', 'Santosh', 'Sitaram', 'Nandlal',
    'Shiva Shankar', 'Shankar', 'Maiya', 'Nanu', 'Nani maiya',
    'Maya', 'Pragya', 'Anu', 'Chameli', 'Nirmala', 'Anushka',
    'Komal', 'Kamala', 'Goma', 'Srijana', 'Bhavana', 'Pramila',
    'Saraswati', 'Laxmi', 'Ganga', 'Radha', 'Radhika'
]

LAST_NAME = [
    "Aryal", "Bhatta", "Devkota", "Dawadi", "Dulal", "Kalikote",
    "Paudel", "Pokharel", "Rosyara", "Sharma", "Sigdel", "Thapa",
    "Adhikari", "Chaulagai", "Devkota", "Jamarkattel",
    "Lohani", "Niraula", "Panthi", "Pandey", "Panta",
    "Shahi", "Siwakoti", "Subedi",
    "Thami", "Thapaliya", "Upadhaya", "Wagle", "Bhandari",
    "Niraula", "Suntakhane"
]

TIME = ["06:00:00", "09:00:00", "12:00:00", "15:00:00", "18:00:00", "21:00:00"]
MEALS = {
    "Rice": 200, "Orange": 50, "Spinach": 50, "Chicken Fry": 300,
    "Mutton": 400, "Milk": 70, "Pasta": 250, "Beer": 30, "Omelete": 60,
    "Butter": 500, "Jam": 300, "Bread": 200, "Boiled Egg": 40,
    "Chicken Boiled": 167, "Wine": 50, "Beans": 150, "Stew": 40,
    "noodles": 200, "chocolate": 300, "Apple": 70, "Yoghurt": 60,
    "Vegetables": 80, "Banana": 100, "Corn": 250

}


def create_initial_data():
    with open("meal/fixtures/meal_data.json", "w") as json_file:
        data = []
        username_list = []
        uoffset = 2
        moffset = 1
        start_date = "2016-11-"

        # # User data
        # for i in range(20):
        #     fname = random.choice(FIRST_NAME)
        #     lname = random.choice(LAST_NAME)
        #     uname = fname.lower().strip().replace(' ', '') + \
        #         '-' + lname.lower().strip().replace(' ', '')
        #     if uname in username_list:
        #         uname = uname + str(i)
        #     username_list.append(uname)
        #     user_dict = {
        #         "model": "auth.user",
        #         "pk": i + uoffset,
        #         "fields": {
        #             "username": uname,
        #             "password": 'pbkdf2_sha256$30000$ISf0pHfSGVHH$1SEdJ59LuoHRyIrHIpzVUe9XxdrR1ocz5CS8CPJYeAc=',
        #             "first_name": fname,
        #             "last_name": lname

        #         }
        #     }
        #     data.append(user_dict)

        # Meal data
        for day in range(29):
            for t, time in enumerate(TIME):
                for user in range(1, 20):
                    meal = random.choice(list(MEALS.keys()))
                    meal_dict = {
                        "model": "meal.Meal",
                        "pk": day * 6 * 20 + t * 20 + user,
                        "fields": {
                            "user": random.randint(1, 20),
                            "name": meal,
                            "date": start_date + str(day + 1),
                            "time": time,
                            "calorie": MEALS.get(meal)
                        }
                    }
                    data.append(meal_dict)

        json_file.write(json.dumps(data))


create_initial_data()
