# AvastTask
Hi, this is a task project written using Node.js and Express.

## To run this project:

```
git clone https://github.com/PetrPhilipp/AvastTask.git

npm install

npm start
```
[localhost:3000](http://localhost:3000/)

## Documentation
Since this project is quite small, there is not much else but a little bit of routing and one simple function.
There are four pages that you can go to (index, UNIX time, NBytes and Content of URL).

Index is a simple view with a little bit of text.

Unix time is a view that has a variable time which is a unix timestamp obrained from Date.now

nBytes is a view with a form where you can submit a number (where n: 0 < n < 2147483647). Pressing the submit button will rerender the page and show N bytes (encoded with UTF 8), from a file in resources folder. Data from this file is returned using a promise.

Content of URL is a view that prints data given after .../contentOfURL/[DATA]


