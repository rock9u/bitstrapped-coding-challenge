# Coding-Challenge

## Setup

### Npm

- `npm i` to install
- `npm run start` to start locally at port `3000` by default

### Docker

- `docker build -t ALIAS .`
- `docker run -dp 3000:3000 ALIAS`

## Endpoint

- `/all` returns all currency rates
- `/COUNTRY` returns currency conversion rate of COUNTRY
- `/COUNTRY1?base=COUNTRY2` returns the conversion rate of COUNTRY1 based from COUNTRY2

## Credit

- Used endpoint at [Rates API](https://ratesapi.io/documentation/)

## Demo

- [:moneybag:](http://3.17.67.81:3000/)
