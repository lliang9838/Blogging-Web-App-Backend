* TODO: tip #1: if the desired result isn't obtained, check the err message to troubleshoot
* TODO: tip #2: to send html in response body. the string needs to be in line
* My problem with res.send was that I had html code and newlines. You cannot have newlines in javascript.
    * For ex: with console.log 
    ```
    console.log('hi I'm cool
    , please tell me I'm cool') //THIS IS NOT ALLOWED... instead...
    ```
    ```
    //do this
    console.log('hi I'm cool'
    + ', please tell me I'm cool')
    ```
    * Many thanks to StackOverflow for solving this.
    For more details, go to: https://stackoverflow.com/questions/5296402/unterminated-string-literal
---
* Knowing when to put parameters in request body (POST/PUT) vesus putting parameters in query string (GET/DELETE)