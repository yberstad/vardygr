const FBSDK = require('react-native-fbsdk');
const {
    GraphRequest,
    GraphRequestManager,
} = FBSDK;


export function getFacebookFriends() {
    return new Promise((resolve, reject) => {
        // Create a graph request asking for friends with a callback to handle the response.
        var fetchFriendsRequest = new GraphRequest('/me/friends', null, (error, result) => {
            if (error) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        // Start the graph request.
        new GraphRequestManager().addRequest(fetchFriendsRequest).start();
    });
}
