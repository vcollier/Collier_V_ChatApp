// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

function setUserId({sID}) {
    console.log(sID);
    vm.socketID = sID;
}

function showDisconnectMessage() {
    console.log('a user disconnected');

}

const messageSound = new Audio ('../audio/game-sound.mp3');


function appendMessage(message) {
    vm.messages.push(message);
    messageSound.play();

}

function appendUser(user){
    vm.users.push(user);
}


const vm = new Vue({
    data: {
        socketID: "",
        message: "",
        nickname: "",
        users: [
            { name: ''}
        ],

        messages: [],

    },

    methods: {

        characterEmoji(e){
            let emoji = e.target.dataset.value;
            this.message = this.message + emoji;
        },

        disbatchMessage() {
            console.log('handle emit message');


            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || "anonymous"
            })
            this.message = "";

        },

    }, 

    mounted: function() {
        console.log('vue is done mounting');
    },

    components: {
        newmessage: ChatMessage
    }
    
}).$mount("#app");


socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);
socket.addEventListener('newUser', appendUser);


const welcome    = document.querySelector('.welcome'),
      goButton   = document.querySelector('.goButton');

      goButton.addEventListener('click', function(){
        
            welcome.classList.add('hide');

            
      });

