import { Component, OnInit } from "@angular/core";
import { FirebaseAuthenticationService } from "src/app/services/firebase-authentication.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { BlockchainAccessService } from "src/app/services/blockchain-access.service";
import { sha256 } from "js-sha256";
@Component({
  selector: "app-vehicles",
  templateUrl: "./vehicles.component.html",
  styleUrls: ["./vehicles.component.css"]
})
export class VehiclesComponent implements OnInit {
  vehicleName: string = "";
  vehicleId: string = "";
  vehicleType: string = "";
  myVehicles: Array<any> = [];
  userId: string = "";
  user: any = null;
  transferFrom: any;
  bal: any;
  constructor(
    private authService: FirebaseAuthenticationService,
    private afFirestore: AngularFirestore,
    private eth: BlockchainAccessService
  ) {
    this.initEth();
  }

  ngOnInit() {
    this.authService.uid.subscribe(userId => {
      if(userId) {
        this.userId = userId;
      }
    });
    this.authService.userData.subscribe(data => {
      if (data) {
        data.forEach(value => {
          this.user = value;
          this.afFirestore
            .collection("vehicles", ref =>
              ref.where("user_id", "==", this.userId)
            )
            .valueChanges()
            .subscribe(data => {
              this.myVehicles = data;
            });
        });
      }
    });
  }
  initEth() {
    let that = this;
    this.eth
      .getAccountInfo()
      .then((acctInfo: any) => {
        that.transferFrom = acctInfo.fromAccount;
        that.bal = acctInfo.balance;
        console.log("blockchain current account is", {
          from: this.transferFrom,
          balance: this.bal
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  hideNotification() {
    document.getElementById("success-notification").style.display = "none";
    document.getElementById("fail-notification").style.display = "none";
  }
  addVehicle() {
    this.afFirestore
      .collection("vehicles")
      .doc(sha256(this.vehicleId))
      .set({
        vehicle_id: this.vehicleId,
        vehicle_name: this.vehicleName,
        vehicle_type: this.vehicleType,
        user_id: this.userId
      })
      .then(() => {
        this.eth
          .addVehicle(
            this.vehicleId,
            this.userId,
            this.vehicleType,
            this.transferFrom
          )
          .then(() => {
            document.getElementById("success-notification").style.display =
              "block";
          });
      });
  }
  deleteVehicle(vehicleId) {
    this.afFirestore
      .collection("vehicles")
      .doc(sha256(vehicleId))
      .delete()
      .then(() => {
        document.getElementById("success-notification").style.display =
        "block";
      });
  }
}
