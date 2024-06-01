# Straw - Backend
Straw is a forum-like website which aims to provide a place for discussion about indie games, or for sharing creative endeavours.

This is the API server for Straw. The API is made to be generic and used anywhere, not just the web - so that games can implement an overlay for Straw for, for example, posting screenshots.

The API is to be hosted standalone, without it serving any HTML.
The web frontend for Straw is located in another respository.

## Installation
First, clone the repository, then install dependencies using `npm install`.
```
$ git clone https://github.com/CrispyBun/Straw-Backend
$ npm install
```
After cloning and installing dependencies, create a .env file in the format of the provided `example.env`. It needs PostgreSQL database access information and a secret key for encrypting JWT tokens.
The server can then be started for development using:
```
$ npm run dev
```
