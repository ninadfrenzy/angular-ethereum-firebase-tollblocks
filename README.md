# Tollblocks
Tollblocks is a decentralized web application based on blockchain, which makes it easier for toll processing, payments and auditing
using the smart contract functionality provided by ethereum blockchain. Tollblocks is built on top of Angular and Ethereum, and utilizes
Google Firebase for Authentication and basic storage. As a part of the final year project, we also published a research paper
on the project, which is available to read at [Research Paper](http://www.jcreview.com/?mno=114934).
### Contributors / Team Members:
- Ninad Manjaramkar
- Snehal Naikare
- Sumeet Patil
- Vineet Shinde
### Run Locally
- clone the repository using `git clone`
#### Angular setup (the client)
- Navigate to front-end folder and open cmd / shell window.
- Run the command `npm install` to pull in all the dependencies.
- install the angular cli using command `npm instal -g @angular/cli@8.3.20`
#### Blockchain setup (the chain)
- install ganache app or ganache-cli (using npm)
- install truffle using command `npm install -g truffle`
- run the blockchain instance of ganache and check if the port matches the port specified in this.web3Prov in 
/front-end/src/app/services/blockchain-access.service.ts
- deploy the contract by navigating to the folder /front-end/src/truffle-env and running command `truffle migrate`.
- Now the contract is deployed on ganache instance of blockchain.
#### Database setup
- use the existing firebase config to run the app without worrying about database.
- replace with your own firebase config to control the database. read more on [firebase](https://firebase.google.com/)

finally run the app by navigating to the frontend folder and running the command `npm start`.
#### Screenshots
![dashboard-customer](./screens/cusstomer_dash.png?raw=true "customer-dashboard")
![dashboard-authority](./screens/authority_dash.png?raw=true "authority-dashboard")
find more screenshots in the screens folder.
