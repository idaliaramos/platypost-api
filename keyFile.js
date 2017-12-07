// const fs = require('fs');
//
// // Your Google Cloud Platform project ID
// const projectId = 'mailapp-backend-187406';
//
// // The location of the crypto key's key ring, e.g. "global"
// const locationId = 'global';
//
// // The name of the crypto key's key ring, e.g. "my-key-ring"
// const keyRingId = 'AWS_KEY_RING';
//
// // The name of the crypto key, e.g. "my-key"
// const cryptoKeyId = 'AWS_PRIVATE_KEY';
//
// // The path to the file to decrypt, e.g. "./path/to/plaintext.txt.encrypted"
// const ciphertextFileName = './s3Key.txt.encrypted';
//
// // Builds and authorizes a Cloud KMS client
// var plainTextKey;
// buildAndAuthorizeService((err, cloudkms) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//
//   // Reads the file to be decrypted
//   fs.readFile(ciphertextFileName, (err, contentsBuffer) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//
//     const request = {
//       // This will be a path parameter in the request URL
//       name: `projects/${projectId}/locations/${locationId}/keyRings/${keyRingId}/cryptoKeys/${cryptoKeyId}`,
//       // This will be the request body
//       resource: {
//         ciphertext: contentsBuffer.toString('base64')
//       }
//     };
//
//     // Decrypts the file using the specified crypto key
//     cloudkms.projects.locations.keyRings.cryptoKeys.decrypt(
//       request,
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         plainTextKey = Buffer.from(result.plaintext, 'base64');
//
//         //  Writes the dencrypted file to disk
//         // fs.writeFile(
//         //   plaintextFileName,
//         //   Buffer.from(result.plaintext, 'base64'),
//         //   err => {
//         //     if (err) {
//         //       console.log(err);
//         //       return;
//         //     }
//         //
//         //     console.log(
//         //       `Decrypted ${ciphertextFileName}, result saved to ${plaintextFileName}.`
//         //     );
//         //   }
//         // );
//       }
//     );
//   });
// });
//
// function buildAndAuthorizeService(callback) {
//   // Imports the Google APIs client library
//   const google = require('googleapis');
//
//   // Acquires credentials
//   google.auth.getApplicationDefault((err, authClient) => {
//     if (err) {
//       callback(err);
//       return;
//     }
//
//     if (authClient.createScopedRequired && authClient.createScopedRequired()) {
//       authClient = authClient.createScoped([
//         'https://www.googleapis.com/auth/cloud-platform'
//       ]);
//     }
//
//     // Instantiates an authorized client
//     const cloudkms = google.cloudkms({
//       version: 'v1',
//       auth: authClient
//     });
//
//     callback(null, cloudkms);
//   });
// }
// module.exports = plainTextKey;
