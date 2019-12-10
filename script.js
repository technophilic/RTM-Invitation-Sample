
let client;

document.getElementById('start').onclick = function(){
    client = AgoraRTM.createInstance(document.getElementById('app').value);

    client.login({ token: null, uid: document.getElementById('uid').value }).then(() => {
        console.log('AgoraRTM client login success');
        client.on('RemoteInvitationReceived',function(remoteInvitation){
            console.log("recieved remote invitation" , remoteInvitation);
        });
        enableSend();

    }).catch(err => {
        console.log('AgoraRTM client login failure', err);
    });
}


function enableSend(){
    document.getElementById('send').onclick=function(){
        let localInvitation = client.createLocalInvitation(document.getElementById('remote').value);
        subcribeLocalEventInvitationEvents(localInvitation);
        localInvitation.send();
    }
}

function subcribeLocalEventInvitationEvents(localInvitation) {
    localInvitation.on('LocalInvitationAccepted', (arg) => {
        console.log(arg);
    });
    localInvitation.on('LocalInvitationFailure', (arg) => {
        console.log('FAILURE');
        console.log(arg);
        // leave();
    });
    localInvitation.on('LocalInvitationReceivedByPeer', (arg) => {
        console.log('RECEIVED_BY_REMOTE');
        console.log(arg);
    });
    localInvitation.on('LocalInvitationRefused', (arg) => {
        console.log('REFUSED_BY_REMOTE');
        console.log(arg);
        // leave();
    });
    localInvitation.on('LocalInvitationCanceled', (args) => {
        console.log('Invitation cancelled.');
        // leave();

    });
}


