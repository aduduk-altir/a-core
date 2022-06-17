# Foundation React App Template
This is repository is template for any new React applications.

## Available Scripts
To install all the necessary dependencies for application on your local machine run:
```
yarn
```
To start project on your local machine type in the terminal:
```
yarn start
```
To run automated tests use:
```
yarn test
```
To start deploy project in production use:
```
yarn build
```

## Docker file run
```
docker build -f docker/Dockerfile -t react-project . 
```
```
docker container run -p 3001:80 react-project
```
Docker run with API_HOST:
```
docker run --rm -e API_HOST={API-HOST-ADDRESS} -p 8080:80 react-project
```
Note: you can run Docker file with any other parameters, for example run with adding CRN_URL
```
docker run --rm -e API_HOST={API-HOST-ADDRESS>} -e CDN_URL={CDN-URL-ADDRESS} -p 8080:80 react-project
```

*{API-HOST-ADDRESS} - its host address to dev environment of your application (ex. 'https://api-dev.soundful.us', 'https://dev.frontdoorcorp.net')
*{CDN-URL-ADDRESS} - its host address to your CDN (ex. https://cdn-ci.soundful.us/)
