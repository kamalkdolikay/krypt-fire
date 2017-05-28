import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Injectable()
export class AF {

  public messages: FirebaseListObservable<any>;
  public user: Observable<firebase.User>;
  public displayName: string;
  public email: string;
  public item: FirebaseObjectObservable<any>;

  constructor(public afa: AngularFireAuth, db: AngularFireDatabase) {
    this.messages = db.list('messages');
    this.user = afa.authState;
    this.item = db.object('/registeredUsers');
  }

  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() {
    return this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  /**
   * Logs out the current user
   */
  logout() {
    return this.afa.auth.signOut();
  }

  /*addUserInfo(){
    //We saved their auth info now save the rest to the db.
    this.user.push({
      email: this.email,
      displayName: this.displayName
    });
  }*/

  /**
   * Saves a message to the Firebase Realtime Database
   * @param text
   */
  sendMessage(text) {
    var message = {
      message: text,
      displayName: this.displayName,
      email: this.email,
      timestamp: Date.now()
    };
    this.messages.push(message);
  }

  /**
   * Calls the AngularFire2 service to register a new user
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    console.log(email)
    return firebase.auth().createUserWithEmailAndPassword(email, password)
              .catch(function(error) {
                // Handle Errors here.
                // var errorCode = error;
                // var errorMessage = error.message;
                // if (errorCode == 'auth/weak-password') {
                //   alert('The password is too weak.');
                // } else {
                //   alert(errorMessage);
                // }
                console.log(error);
              });
  }

  /**
   *
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, name, email) {
    // return this.afa.database.object('registeredUsers/' + uid).set({
    //   name: name,
    //   email: email,
    // });
   return this.item.set({ name: name, email: email, uid: uid });
  }

  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithEmail(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
              .catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // if (errorCode === 'auth/wrong-password') {
            //   alert('Wrong password.');
            // } else {
            //   alert(errorMessage);
            // }
            console.log(error);
          });
  }


}