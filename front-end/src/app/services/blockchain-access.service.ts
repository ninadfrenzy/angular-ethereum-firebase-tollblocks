import { Injectable } from '@angular/core';
import * as Web3_ from "web3";
import * as TruffleContract from "truffle-contract";
import { promise } from "protractor";
declare let window: any;
declare let require: any;
const Web3: any = Web3_;
let tokenAbi = require("../../truffle-env/build/contracts/RoadContract.json");
@Injectable({
  providedIn: 'root'
})
export class BlockchainAccessService {
  private web3Prov: any = null;
  private contracts: {};
  constructor() {

    if (typeof window.web3 !== "undefined") {
      this.web3Prov = window.web3.currentProvider;
    } else {
      //Ganache provider is at 7545 enable this when using ganache and comment out geth
      this.web3Prov = 'http://127.0.0.1:7545'

      //Geth provider
      //this.web3Prov = 'http://127.0.0.1:8645'
      
    }
    window.web3 = new Web3(this.web3Prov);

  }

  getAccountInfo() {
    return new Promise(function(resolve, reject) {
      
      window.web3.eth.getCoinbase(function(err, account) {
        if (err === null) {
          
          
          window.web3.eth.getBalance(account, function(err, balance) {
            if (err === null) {

              
              return resolve({
                fromAccount: account,
                balance: window.web3.utils.fromWei(balance, "ether")
              });
            } else {
              return reject({ fromAccount: "error", balance: 0 });
            }
          });
        }
      });
    });
  }
  setNewUser(_userId, fromAdr) {
    let that = this;
    return new Promise((resolve, reject) => {
      let contractVar = TruffleContract(tokenAbi);
      contractVar.setProvider(that.web3Prov);
      contractVar
        .deployed()
        .then(instance => {
          return instance.makeNewUser(_userId, { from: fromAdr });
        })
        .then(data => {
          return resolve({ status: true });
        })
        .catch(err => {
          return reject({ errormsg: "error in adding user" });
        });
    });
  }
  // getNumOfVehicles() {
  //   let that = this;
  //   return new Promise((resolve, reject) => {
  //     let contractVar = TruffleContract(tokenAbi);
  //     contractVar.setProvider(that.web3Prov);
  //     contractVar
  //       .deployed()
  //       .then(instance => {
  //         return instance.numVehicles();
  //       })
  //       .then(data => {
  //         return resolve({ value: data });
  //       })
  //       .catch(err => {
  //         return reject({ errormsg: "error" });
  //       });
  //   });
  // }

  addBalance(_userId, _amount, fromAdr) {
    
    
    let that = this;
    return new Promise((resolve, reject) => {
      let contractVar = TruffleContract(tokenAbi);
      contractVar.setProvider(that.web3Prov);
      contractVar
        .deployed()
        .then(instance => {
          return instance.updateBalance(_userId, _amount, { from: fromAdr });
        })
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject({ errormsg: "error to add balance" });
        });
    });
  }
  addNewRoad(_id, _amount, _deductionCar, _deductionTruck, _deductionBus, fromAdr) {
    let that = this;
    return new Promise((resolve, reject) => {
      let contractVar = TruffleContract(tokenAbi);
      contractVar.setProvider(that.web3Prov);
      contractVar
        .deployed()
        .then(instance => {
          return instance.setNewRoad(_id, _amount, _deductionCar, _deductionTruck, _deductionBus, { from: fromAdr });
        })
        .then(data => {
          return resolve({ status: true });
        })
        .catch(err => {
          return reject({ errormsg: "error to add road" });
        });
    });
  }
  validateAndCollect(_roadId, _vehicleId, _boothId, fromAdr) {
    console.log('here');
    
    let that = this;
    return new Promise((resolve, reject) => {
      let contractVar = TruffleContract(tokenAbi);
      contractVar.setProvider(that.web3Prov);
      contractVar
        .deployed()
        .then(instance => {
          return instance.validateTxn(_roadId, _vehicleId, _boothId, { from: fromAdr });
        })
        .then(data => {
          return resolve({ status: data });
        })
        .catch(err => {
          return reject({ errormsg: err });
        });
    });
  }
  getBalance (_userId) {
    let that = this;
    return new Promise((resolve, reject) => {
      let contractVar = TruffleContract(tokenAbi);
      contractVar.setProvider(that.web3Prov);
      contractVar
        .deployed()
        .then(instance => {
           instance.users.call(_userId, (err, result) => {
            return resolve({ value: result.balance});
             

          })
        })
        .then(data => {
          
        })
        .catch(err => {
          return reject({ errormsg: "error to show" });
        });
    });
  }
  addVehicle(_vehicleId, _userId, _vehicleType, fromAdr) {
    let that = this;
    return new Promise((resolve, reject) => {
      let contractVar = TruffleContract(tokenAbi);
      contractVar.setProvider(that.web3Prov);
      contractVar
        .deployed()
        .then(instance => {
          return instance.addVehicle(_vehicleId, _userId, _vehicleType, { from: fromAdr });
        })
        .then(data => {
          return resolve({ status: true });
        })
        .catch(err => {
          return reject({ errormsg: err });
        });
    });
  }
  addBooth(_boothId, fromAdr) {
    let that = this;
    return new Promise((resolve, reject) => {
      let contractVar = TruffleContract(tokenAbi);
      contractVar.setProvider(that.web3Prov);
      contractVar
        .deployed()
        .then(instance => {
          return instance.addBooth(_boothId, { from: fromAdr });
        })
        .then(data => {
          return resolve({ status: true });
        })
        .catch(err => {
          return reject({ errormsg: "error to add" });
        });
    });
  }
  getRoadCollection (_roadId) {
    let that = this;
    return new Promise((resolve, reject) => {
      let contractVar = TruffleContract(tokenAbi);
      contractVar.setProvider(that.web3Prov);
      contractVar
        .deployed()
        .then(instance => {
           instance.roads.call(_roadId, (err, result) => {
            return resolve({ value: result.collectedSoFar});
             

          })
        })
        .then(data => {
          
        })
        .catch(err => {
          return reject({ errormsg: "error to show" });
        });
    });
  }
  getBoothCollection (_boothId) {
    let that = this;
    return new Promise((resolve, reject) => {
      let contractVar = TruffleContract(tokenAbi);
      contractVar.setProvider(that.web3Prov);
      contractVar
        .deployed()
        .then(instance => {
           instance.boothCollection.call(_boothId, (err, result) => {
            return resolve({ value: result});
             

          })
        })
        .then(data => {
          
        })
        .catch(err => {
          return reject({ errormsg: "error to show" });
        });
    });
  }
  // getNumber() {
  //   let that = this;
  //   return new Promise ((resolve, reject) => {
  //     let contractVar = TruffleContract(tokenAbi);
  //     contractVar.setProvider(that.web3Prov);
  //     contractVar.deployed().then((instance) => {
  //       return instance.getCnt();
  //     }).then((data) => {
  //       return resolve({num: data});
  //     }).catch(err => {
  //       return reject({errormsg:'error'});
  //     })
  //   })
  // }

  // setNumber(fromAdr, num) {
  //   let that = this;
  //   return new Promise ((resolve,reject) => {
  //     let cv = TruffleContract(tokenAbi);
  //     cv.setProvider(that.web3Prov);
  //     cv.deployed().then((instance) => {
  //       instance.setCnt(num, {from: fromAdr});
  //     }).then((data)=> {
  //       return resolve({st: data});
  //     }).catch(err => {
  //       return reject('rejected');
  //     })
  //   })
  // }

}
