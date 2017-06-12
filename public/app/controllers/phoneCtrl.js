(function () {

    angular.module('app').controller("phoneCtrl", 
        function ($scope, $state, currentAuth, Auth, USERS,userObj) {

            // initialize all of the important varibles at controller load.

            $scope.auth = Auth;
            $scope.currentAuth = currentAuth;
            $scope.confirmationResult = null;
            $scope.recaptcha = false;
            $scope.phoneNumber = '';
            $scope.verificationCode = '';
            $scope.checkPhone = false;
            $scope.countryId = '+972';               // for now put only israel for testing later their is plugin of google to get all countries.
        

            /**
             * Set up UI event listeners and registering Firebase auth listeners.
             */

//        // Listening for auth state changes.
//        firebase.auth().onAuthStateChanged(function (user) {
//
//     
//        });
            // [START appVerifier]
            $scope.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'normal',
                'callback': function (response) {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // [START_EXCLUDE]
                    $scope.$apply(function () {
                        $scope.recaptcha = true;
                    });
                    // [END_EXCLUDE]
                },
                'expired-callback': function () {
                    // Response expired. Ask user to solve reCAPTCHA again.
                    // [START_EXCLUDE]
                    $scope.$apply(function () {
                        $scope.recaptcha = false;
                    });
                    // [END_EXCLUDE]
                }
            });
            // [END appVerifier]
            // [START renderCaptcha]
            $scope.recaptchaVerifier.render().then(function (widgetId) {
                $scope.recaptchaWidgetId = widgetId;
            });
            // [END renderCaptcha]



            $scope.checkPhone = function () {

                if ($scope.phoneNumber.length < 9) {
                    $scope.phoneComplete = false;
                } else {
                    $scope.phoneComplete = true;
                }
            };
            $scope.checkCode = function () {

                if ($scope.verificationCode.length !== 6) {
                    $scope.codeComplete = false;
                } else {
                    $scope.codeComplete = true;
                }
            };
            /**
             * Function called when clicking the Login/Logout button.
             */
            $scope.signInSub = function () {
                if (isCaptchaOK()) {
//                $scope.signingIn = true;
//                updateSignInButtonUI();
                    // [START signin]
                    var combinedPhone = $scope.countryId + $scope.phoneNumber;

//                var appVerifier = $scope.recaptchaVerifier;
                    firebase.auth().signInWithPhoneNumber(combinedPhone, $scope.recaptchaVerifier)
                            .then(function (confirmationResult) {
                                // SMS sent. Prompt user to type the code from the message, then sign the
                                // user in with confirmationResult.confirm(code).
                                $scope.confirmationResult = confirmationResult;
                                // [START_EXCLUDE silent]
//                            $scope.signingIn = false;
//                            updateSignInButtonUI();
                                $scope.$apply(function () {
                                    updateVerificationCodeFormUI();
                                    updateSignInFormUI();
                                });
//                        updateVerifyCodeButtonUI();

                                // [END_EXCLUDE]
                            }).catch(function (error) {
                        // Error; SMS not sent
                        // [START_EXCLUDE]
                        console.error('Error during signInWithPhoneNumber', error);
                        window.alert('Error during signInWithPhoneNumber:\n\n'
                                + error.code + '\n\n' + error.message);
                        // [END_EXCLUDE]
                    });
                    // [END signin]
                }
            };

            /**
             * Function called when clicking the "Verify Code" button.
             */
            $scope.onVerifyCodeSubmit = function () {

                var currentUser = userObj.$id;         // get current authnticate user

                // [START verifyCode]
                var credential = firebase.auth.PhoneAuthProvider.credential($scope.confirmationResult.verificationId, $scope.verificationCode);

                // link user phone auth to facebook auth on the same instance in firebase
                currentUser.linkWithCredential(credential).then(function (user) {
                    $scope.refUser.phone = $scope.phoneNumber;
                    $scope.refUser.$save();
                    $state.go('main', {userObj: user},);
                }, function (error) {
                    console.log("Account linking error", error);
                });
                // [END verifyCode]

            };

            /**
             * Cancels the verification code input.
             */
            $scope.cancelVerification = function () {

                $scope.confirmationResult = null;
                updateVerificationCodeFormUI();
                updateSignInFormUI();
            };

            /**
             * Returns true if the ReCaptcha is in an OK state.
             */
            function isCaptchaOK() {

                if (typeof grecaptcha !== 'undefined'
                        && typeof $scope.recaptchaWidgetId !== 'undefined') {
                    // [START getRecaptchaResponse]
                    var recaptchaResponse = grecaptcha.getResponse($scope.recaptchaWidgetId);
                    // [END getRecaptchaResponse]
                    return recaptchaResponse !== '';
                }
                return false;
            }

            /**
             * Updates the state of the Sign-in form (used for ng-show).
             */
            function updateSignInFormUI() {
                if ($scope.confirmationResult)
                {
                    resetReCaptcha();
                    $scope.signIn = false;
                } else
                    $scope.signIn = true;
            }

            /**
             * Updates the state of the Verify code form (used for ng-show).
             */
            function updateVerificationCodeFormUI() {
                if ($scope.confirmationResult) {
                    $scope.verifyCode = true;
                } else {
                    $scope.verifyCode = false;
                }
            }

            /**
             * Re-initializes the ReCaptacha widget.
             */
            function resetReCaptcha() {
                if (typeof grecaptcha !== 'undefined'
                        && typeof $scope.recaptchaWidgetId !== 'undefined') {
                    grecaptcha.reset($scope.recaptchaWidgetId);
                }
            }

            $scope.auth.$onAuthStateChanged(function (authData) {

                updateSignInFormUI();
                updateVerificationCodeFormUI();

            });
        }
    );

})();