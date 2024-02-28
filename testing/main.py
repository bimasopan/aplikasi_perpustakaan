import requests as req
import json


url = "http://localhost:4000/"

a = input("username: ")
b = input("password: ")

kirim = {
    'username': a,
    'password': b
}

data = req.post(url, data=kirim)
konver = data.json()
if data.status_code == 200:
    print(konver['message'])
else:
    print(konver['message'])