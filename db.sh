#!/bin/bash

show dbs
use BlogServer
db.Posts.drop()
db.Users.drop()
db.createCollection("Posts")
db.createCollection("Users")

db.Posts.insert({ "postid": 1, "username": "cs144", "created": 1518669344517, "modified": 1518669344517, "title": "Title 1", "body": "Hello, world!" })
db.Posts.insert({ "postid": 2, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 2", "body": "I am here.2" })
db.Posts.insert({ "postid": 3, "username": "user2", "created": 1518669658420, "modified": 1518669658420, "title": "Title 3", "body": "I am here.3" })
# db.Posts.insert({ "postid": 4, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 4", "body": "I am here.4" })
# db.Posts.insert({ "postid": 5, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 5", "body": "I am here.5" })
# db.Posts.insert({ "postid": 6, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 6", "body": "I am here.6" })
# db.Posts.insert({ "postid": 7, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 7", "body": "I am here.7" })
# db.Posts.insert({ "postid": 7, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 8", "body": "I am here.8" })
# db.Posts.insert({ "postid": 7, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 9", "body": "I am here.9" })
# db.Posts.insert({ "postid": 7, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 10", "body": "I am here.10" })
# db.Posts.insert({ "postid": 7, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 11", "body": "I am here.11" })
# db.Posts.insert({ "postid": 7, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 12", "body": "I am here.12" })
# db.Posts.insert({ "postid": 7, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 13", "body": "I am here.13" })
# db.Posts.insert({ "postid": 7, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 14", "body": "I am here.14" })
# db.Posts.insert({ "postid": 7, "username": "cs144", "created": 1518669658420, "modified": 1518669658420, "title": "Title 15", "body": "I am here.15" })

db.Users.insert({ "username": "cs144", "password": "$2a$10$2DGJ96C77f/WwIwClPwSNuQRqjoSnDFj9GDKjg6X/PePgFdXoE4W6" })
db.Users.insert({ "username": "user2", "password": "$2a$10$kTaFlLbfY1nnHnjb3ZUP3OhfsfzduLwl2k/gKLXvHew9uX.1blwne" })

