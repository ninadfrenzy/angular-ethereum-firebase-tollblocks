pragma solidity >=0.4.21 <0.7.0;

contract RoadContract{
    struct road {
        uint roadAmount;
        uint deductionForCar;
        uint deductionForBus;
        uint deductionForTruck;
        uint collectedSoFar;
    }
    struct user {
        uint balance;
        string txnHash;
    }
    struct vehicle{
        string vehicleType;
    }
    mapping(string => string) public vehicleMapping;
    mapping (string => road) public roads;
    mapping (string => user) public users;
    mapping (string => vehicle) public vehicles;
    mapping (string => uint) public boothCollection;
    uint public numRoads;
    uint public numVehicles;
    constructor () public {
        numRoads = 0;
        numVehicles = 0;
 }
    function setNewRoad(string memory _roadId, uint _roadAmount, uint _deductionForCar, uint _deductionForTruck, uint _deductionForBus) public {
        roads[_roadId].roadAmount = _roadAmount;
        roads[_roadId].deductionForCar = _deductionForCar;
        roads[_roadId].deductionForBus = _deductionForBus;
        roads[_roadId].deductionForTruck = _deductionForTruck;
        numRoads = numRoads + 1;
    }

    function addVehicle (string memory _vehicleId, string memory _userId, string memory _vehicleType) public {
        vehicleMapping[_vehicleId] = _userId;
        vehicles[_vehicleId].vehicleType = _vehicleType;
        numVehicles = numVehicles + 1;
    }
    function addBooth (string memory _boothId) public {
        boothCollection[_boothId] = 0;
    }
    function makeNewUser (string memory _userId) public {
        users[_userId].balance = 0;
        users[_userId].txnHash = "";
    }
    function validateTxn (string memory _roadId, string memory _vehicleId, string memory _boothId) public returns(bool) {
        string memory _userId = vehicleMapping[_vehicleId];
        string memory _vehicleType = vehicles[_vehicleId].vehicleType;
        require(roads[_roadId].roadAmount > 0, 'Exhausted road amount');
        uint deduction = 0;
        if(compareStrings(_vehicleType, 'car')) {
            deduction = roads[_roadId].deductionForCar;
        }
        if(compareStrings(_vehicleType, 'bus')) {
            deduction = roads[_roadId].deductionForBus;
        }
        if(compareStrings(_vehicleType, 'truck')) {
            deduction = roads[_roadId].deductionForTruck;
        }
        
        require(users[_userId].balance >= deduction, 'low Balance');
        users[_userId].balance = users[_userId].balance - deduction;
        boothCollection[_boothId] = boothCollection[_boothId] + deduction;
        roads[_roadId].roadAmount = roads[_roadId].roadAmount - deduction;
        roads[_roadId].collectedSoFar = roads[_roadId].collectedSoFar + deduction;
        return true;
    }
    function compareStrings(string memory _s1, string memory _s2) public pure returns(bool){
        if(bytes(_s1).length != bytes(_s2).length) {
            return false;
        } else {
            return keccak256(bytes(_s1)) == keccak256(bytes(_s2));
        }
    }
    function updateBalance (string memory _userId, uint _value) public {
        users[_userId].balance = users[_userId].balance + _value;
    }
    function checkTxnHash (string memory _vehicleId, string memory _hash) public view returns(bool) {
        if(keccak256(bytes(users[_vehicleId].txnHash)) == keccak256(bytes(_hash))) {
            return true;
        } else {
            return false;
        }
    }
    function updateTxnHash (string memory _vehicleId, string memory _oldHash, string memory _newHash) public {
        if(checkTxnHash(_vehicleId, _oldHash)) {
            users[_vehicleId].txnHash = _newHash;
        }
    }
}