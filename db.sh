#!/bin/bash

show dbs
use BlogServer
db.Posts.drop()
db.Users.drop()
db.createCollection("Posts")
db.createCollection("Users")

db.Posts.insert({ "postid": 10, "username": "recruiter", "created": 1518669344517, "modified": 1518669344517, "title": "Northrop Grumman", "body": "Redondo Beach" })
db.Posts.insert({ "postid": 1, "username": "recruiter", "created": 1518669658420, "modified": 1518669658420, "title": "Facebook", "body": "Menlo Park" })
db.Posts.insert({ "postid": 2, "username": "recruiter", "created": 1518669658420, "modified": 1518669658420, "title": "Software Engineer", "body": "Best Job in the World" })
db.Posts.insert({ "postid": 5, "username": "recruiter", "created": 1518669658420, "modified": 1518669658420, "title": "DevOps", "body": "Make the customers happy" })

db.Posts.insert({ "postid": 5, "username": "hayden", "created": 1518669658420, "modified": 1518669658420, "title": "UC Irvine", "body": "Computer Science" })
db.Posts.insert({ "postid": 5, "username": "recruiter", "created": 1518669658420, "modified": 1518669658420, "title": "Software Engineering", "body": "is fun" })

db.Users.insert({ "username": "recruiter", "password": "$2b$10$77Qxm1Ak992CWu1kS8pkrOQ8OWozhUoiy2PXpz4fXHOOmwyv1CTbu" })
db.Users.insert({ "username": "hayden", "password": "$2b$10$VDRjy6UcZSXxer8iCr7CXOKwjouyaDj5J9cx5ibP1OlTB/5v7RkMG" })
db.Users.insert({ "username": "joyce", "password": "$2b$10$gTYcEHyQiFG8EOSe5eeD1.dSwQ/q0vHOZpRLwarScRbp.MoCSVaGW" })
