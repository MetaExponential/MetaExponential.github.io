var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.min.js";document.getElementsByTagName('head')[0].appendChild(script);

(function() {
    // Check if jQuery is loaded
    if (typeof jQuery == 'undefined') {
        // jQuery is not loaded, load it
        var script = document.createElement('script');
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
        script.onload = runChatbot;
        document.head.appendChild(script);
    } else {
        // jQuery is loaded, run the chatbot
        runChatbot();
    }

    function runChatbot() {
	
	var link = document.createElement('link');
	link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
	link.rel = 'stylesheet';
	document.head.appendChild(link);
	
        // Inject CSS
        var css = `
        #chat-bot-body {    
        background: #efefef;      
        height:100%;
        visibility: hidden;
        }
    
        #chat-circle {
        box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.2), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        background: white;
        position: fixed;
        bottom: 30px;
        right: 30px;
        border-radius: 50%;
        z-index: 999;
        color: white;
        cursor: pointer;
        font-size: 2em;
        padding: 2px 6px;
        }
    
        #chat-overlay {
            background: rgba(255,255,255,0.1);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: none;
        }
    
        .chat-box {
        font-family: Poppins,sans-serif;
        display:none;
        position:fixed;
        right:30px;
        bottom:50px;  
        width:350px;
        max-width: 85vw;
        max-height:100vh;
        border-radius:5px;  
        /*   box-shadow: 0px 5px 35px 9px #464a92; */
        bottom: 0px; /* Stick the chat box to the bottom of the page */
        z-index: 999;
        border: 1px solid var(--Gray-200, #EAECF0);
        border-radius: 24px 24px 0px 0px;
        }
    
        .chat-box-header {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            flex-shrink: 0;
            border-radius: 24px 24px 0px 0px;
            background: #4C7727;
            padding-top: 20px;
        }
    
        .chat-box-header-content {
            display: flex;
            align-items: center;
            flex-direction: row;
            flex-shrink: 0;
            justify-content: space-between;
            border-bottom: 1px solid var(--Gray-200, #EAECF0);
            background: var(--Base-White, #FFF);
            align-self: stretch;
            padding: 6px 16px;
        }
        
        .chat-box-body {
        position: relative;  
        height:370px;  
        overflow: hidden;
        }
    
        .chat-box-body:after {
        content: "";
        background: #f5f5f5;
        opacity: 0.1;
        top: 0;
        left: 0;
        right: 0;
        height:100%;
        position: absolute;
        z-index: -1;   
        }
        #chat-input {
        display: flex;
        height: 64px;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        align-self: stretch;
        }
        .chat-input > form {
            margin-bottom: 0;
        }
        #chat-input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #ccc;
        }
        #chat-input::-moz-placeholder { /* Firefox 19+ */
        color: #ccc;
        }
        #chat-input:-ms-input-placeholder { /* IE 10+ */
        color: #ccc;
        }
        #chat-input:-moz-placeholder { /* Firefox 18- */
        color: #ccc;
        }
        .chat-submit {
        color: white;
        box-shadow:none;
        border:none;
        background: linear-gradient(to right, #fd5bfb, #313082);
        width:20%; /* change this */
        font-size:12px;
        }
        .chat-logs {
	display: flex;
	flex-direction: column-reverse;
	padding:15px 15px 0px 15px; 
	height:100%;
	word-wrap: break-word;
	overflow-y: auto;
	font-size:13px;
	box-sizing: border-box;
	background: var(--Base-White, #FFF);
        }
        
        .chat-logs::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: #F5F5F5;
        }
        
        .chat-logs::-webkit-scrollbar
        {
            width: 5px;  
            background-color: #F5F5F5;
        }
        
        .chat-logs::-webkit-scrollbar-thumb
        {
            background-color: #5A5EB9;
        }
    
        .chat-self {
        align-self: flex-end;
        max-width: 70%;
        width: auto;
        margin: 15px 8px;
        padding: 8px 10px;
        background: rgb(235, 235, 235);
        border-radius: 10px 10px 10px;
        box-shadow: rgba(50, 50, 50, 0.2) 4px 4px 5px 0px;
        word-break: break-word;
        }
    
        .chat-friend {
        align-self: flex-start;
        max-width: 70%;
        width: auto;
        margin: 15px 8px;
        padding: 8px 10px;
        background: rgb(255, 255, 255);
        border-radius: 10px 10px 10px 0px;
        box-shadow: rgba(50, 50, 50, 0.2) 4px 4px 5px 0px;
        word-break: break-word;
        }
        
        .chat-msg.user > .msg-avatar img {
        width:45px;
        height:45px;
        border-radius:50%;
        float:left;
        }
        .chat-msg.self > .msg-avatar img {
        width:45px;
        height:45px;
        border-radius:50%;
        float:right;
        }
        .cm-msg-text {
        background:white;
        padding:10px 15px 10px 15px;  
        color:#666;
        max-width:75%;
        float:left;
        margin-left:10px; 
        position:relative;
        margin-bottom:20px;
        border-radius:30px;
        }
        .chat-msg {
        clear:both;    
        }
        .chat-msg.self > .cm-msg-text {  
        float:right;
        margin-right:10px;
        background: #5A5EB9;
        color:white;
        }
        .form-container {
        display: flex;
        justify-content: space-between;
        }
        .chat-message a {
        color: #0070E0;
        }
        .typing-indicator {
        display: inline-block;
        margin-left: 2px;
        }
        
        .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 3px;
        background-color: #000;
        border-radius: 50%;
        animation: bounce 1s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-5px);
            }
            60% {
                transform: translateY(-3px);
            }
        }
        
        .dot:nth-child(1) {
            animation-delay: 0.2s;
        }
        
        .dot:nth-child(2) {
            animation-delay: 0.4s;
        }
        
        .dot:nth-child(3) {
            animation-delay: 0.6s;
        }
    
        .spacer {
        flex-grow: 1;
        }
    
        #chatbot-icon {
        width: 90%;  /* Adjust as needed */
        height: 90%;  /* Adjust as needed */
        }
    
        .svg-cls-1 {
        fill: #cfe1ff;
        }
    
        .svg-cls-2 {
            fill: none;
            stroke: #0b2959;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 2px;
        }
    
        #chat-circle, .chat-box {
        transition: opacity 0.3s, transform 0.3s;
        transform-origin: bottom right; /* This will make it scale towards the bottom right */
        }
        
        .visible {
        opacity: 1;
        transform: scale(1);
        display: block;
        }
        
        .hidden {
        opacity: 0;
        transform: scale(0);
        display: none; /* Initially hidden */
        }
    
        .sender {
        padding-bottom: 4px;
        font-size: 15px;
        font-weight: 700;
        }
    
        .message-container {
        display: flex;
        align-items: flex-start; /* Align items to the start of the container */
        padding: 10px 0px 0px 0px;
        margin-bottom: 10px; /* Space between messages */
        max-width: 90%;
        }
        
        .message-icon {
            margin-right: 5px; /* Space between icon and message content */
        }
        
        .message-icon img {
            width: 40px; /* Adjust size as needed */
            height: 40px;
            border-radius: 20px; /* Circular icon */
        }
        
        .message-content-wrapper {
            flex-grow: 1;
            background: #FFFFFF; /* White background for the wrapper */
            border-radius: 8px;
        }
        
        .message-header {
            display: flex;
            justify-content: space-between; /* Sender name on the left, time on the right */
            padding: 6px 2px 4px 2px; /* Padding inside the white background */
            background: #FFFFFF; /* White background for the header */
            border-top-left-radius: 8px; /* Rounded corners for the top of the header */
            border-top-right-radius: 8px;
        }
        
        .sender-name {
            color: var(--Gray-700, #344054);
            /* Text sm/Medium */
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 142.857% */
        }
        
        .message-time {
            color: var(--Gray-500, #667085);
    
            /* Text xs/Normal */
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px; /* 150% */
        }
        
        .message-content {
            border-radius: 0px 8px 8px 8px;
            background: var(--Gray-100, #F2F4F7);
            padding: 10px; /* Padding inside the grey background */
            font-family: Inter;
            min-height: 13px;
            display: flex;
            align-items: center;
	  word-wrap: break-word;
	  word-break: break-word;
	}

        }
    
        .message-content p {
            margin: 0; /* Remove default paragraph margin */
        }
    
        .user-message-content p {
            margin: 0; /* Remove default paragraph margin */
        }
    
        
        .user-message-container {
      display: grid;
      grid-template-columns: 1fr; /* Take up the full available width */
      max-width: 80%; /* Maximum width of the container */
      margin-left: auto; /* Align the container to the end (right) */
      justify-items: end; /* Align grid items to the end (right) */
    }
    
    .user-message-header {
      display: flex;
      justify-content: space-between; /* Sender name on the left, time on the right */
      margin-bottom: 5px; /* Space between header and body */
      width: 100%; /* Take up the full width of the grid column */
    }
    
    .user-message-content {
      background: #4C7727;
      color: white; /* White text color */
      border-radius: 8px;
      padding: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: adds some shadow for depth */
      font-family: Inter;
  word-wrap: break-word;
  word-break: break-word;
}

    }

    
        .user-sender-name {
            font-weight: bold;
        }
    
        .user-message-time {
            opacity: 0.6; /* Lighter text for time */
            font-size: smaller;
        }
    
        .user-message-body p {
            margin: 0; /* Remove default paragraph margin */
        }    
    
        .chat-footer {
            display: flex;
            padding: 16px;
            flex-direction: column;
            align-items: flex-end;
            gap: 12px;
            background: var(--Base-White, #FFF);
            border-top: 1px solid var(--Gray-200, #EAECF0);
        }
    
        .chat-input-area {
            display: flex;
            height: 64px;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
            align-self: stretch;
        }
    
        #chat-input {
            color: var(--Gray-500, #667085);
            border-radius: 8px;
            border: 1px solid var(--Gray-300, #D0D5DD);
            background: var(--Base-White, #FFF);
    
            /* Shadow/xs */
            box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    
            display: flex;
            padding: 10px 14px;
            align-items: flex-start;
            gap: 8px;
            flex: 1 0 0;
            align-self: stretch;
    
            /* Text md/Normal */
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px; /* 150% */
        }
    
        .chat-actions-area {
            display: flex;
            gap: 61px;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }
    
        .help-section {
            display: inline-flex;
            padding: 10px 16px;
            justify-content: center;
            align-items: center;
            gap: 8px;
            border-radius: 8px;
            border: 1px solid var(--Primary-50, #F9F5FF);
            background: #F0F0F0;
    
            /* Shadow/xs */
            box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
        }
    
        #chat-human-help {
            color: #4C7727;
    
            /* Text sm/Medium */
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 142.857% */
            text-decoration: none;
        }
    
        .chat-action-icon {
            margin-right: 16px; /* Increased padding between icon and submit button */
            width: 24px; /* Adjust as necessary */
            height: 24px;
        }
    
        #chat-send-button {
            display: inline-flex;
            padding: 10px 16px;
            justify-content: center;
            align-items: center;
            gap: 8px;
            border-radius: 8px;
            border: 1px solid var(--Primary-600, #7F56D9);
            background: #4C7727;
            color: var(--Base-White, #FFF);
    
            /* Text sm/Medium */
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 142.857% */
        }
    
    
	    @media (max-width: 768px) {
	        .chat-footer {
	            padding: 16px 8px; /* Adjust padding for smaller screens */
	        }
	        #chat-input {
	            padding: 16px 16px; /* Adjust padding for smaller screens */
	        }
	        .chat-box-body{
	          height: 240px;
	        }
	    }

    
        .chat-box-header-avatar-icon {
            width: 91px;
            height: 91px;
            flex-shrink: 0;
            border-radius: 200px;
            border: 4px solid var(--Gray-200, #EAECF0);
    
        }
    
        .chat-box-header-text {
            font-family: Inter;
            display: flex;
            flex-direction: column;
            align-items: baseline;
            justify-content: space-between;
        }
    
        .chat-box-header-text-title {
            color: var(--Gray-900, #101828);
    
            /* Display xs/Medium */
            font-family: Inter;
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: 32px; /* 133.333% */
        }
    
        .chat-box-header-text-sub-title {
            color: var(--Gray-500, #667085);
            align-self: stretch;
            /* Text md/Normal */
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px; /* 150% */
        }
    
        .chat-box-header-x-close-button {
            display: flex;
            padding: 8px;
            justify-content: center;
            align-items: center;
            gap: 8px;
            border-radius: 8px;
            border: 1px solid var(--Gray-300, #D0D5DD);
            background: var(--Base-White, #FFF);
    
            /* Shadow/xs */
            box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
        }
    
        
          `;
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);

        // Inject HTML
        var html = `
        
        <div id="chat-bot-body">
          <div id="chat-circle" class="btn btn-raised visible">
              <svg id="chatbot-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <circle class="svg-cls-1" cx="47.94" cy="35.52" r="13.5"/>
                  <path class="svg-cls-2"
                        d="m21.17,16.71v3.88c0,.65.26,1.27.72,1.73l2.05,2.05c.38.38.11,1.02-.42,1.02H7.83c-1.35,0-2.45-1.1-2.45-2.45v-6.23c0-1.35,1.1-2.45,2.45-2.45h10.89c1.35,0,2.45,1.1,2.45,2.45Z"/>
                  <line class="svg-cls-2" x1="16.5" y1="19.79" x2="16.55" y2="19.79"/>
                  <line class="svg-cls-2" x1="9.85" y1="19.79" x2="12.9" y2="19.79"/>
                  <path class="svg-cls-2"
                        d="m42.83,9.16v3.88c0,.65-.26,1.27-.72,1.73l-2.05,2.05c-.38.38-.11,1.02.42,1.02h15.68c1.35,0,2.45-1.1,2.45-2.45v-6.23c0-1.35-1.1-2.45-2.45-2.45h-10.89c-1.35,0-2.45,1.1-2.45,2.45Z"/>
                  <line class="svg-cls-2" x1="50.5" y1="12.25" x2="47.45" y2="12.25"/>
                  <line class="svg-cls-2" x1="54.15" y1="12.25" x2="54.1" y2="12.25"/>
                  <line class="svg-cls-2" x1="26.86" y1="48.91" x2="26.86" y2="45.35"/>
                  <line class="svg-cls-2" x1="38.26" y1="45.35" x2="38.26" y2="48.91"/>
                  <path class="svg-cls-2" d="m23.16,23.57c1.86-1.76,4.22-3,6.84-3.5"/>
                  <path class="svg-cls-2"
                        d="m34.83,20.02c6.47,1.08,11.41,6.71,11.41,13.49v8.56c0,1.26-1.02,2.28-2.28,2.28h-22.79c-1.26,0-2.28-1.02-2.28-2.28v-8.56c0-2.84.87-5.48,2.35-7.67"/>
                  <circle class="svg-cls-2" cx="32.56" cy="17.72" r="2.99"/>
                  <path class="svg-cls-2" d="m46.23,31.39h.93c.82,0,1.49.66,1.49,1.49v6.15c0,.82-.66,1.49-1.49,1.49h-.93"/>
                  <path class="svg-cls-2" d="m18.89,31.39h-.93c-.82,0-1.49.66-1.49,1.49v6.15c0,.82.66,1.49,1.49,1.49h.93"/>
                  <g>
                      <line class="svg-cls-2" x1="36.67" y1="27.25" x2="36.67" y2="28.69"/>
                      <line class="svg-cls-2" x1="28.78" y1="27.25" x2="28.78" y2="28.69"/>
                  </g>
                  <path class="svg-cls-2"
                        d="m40.1,34.9c.17-.62.25-1.26.25-1.91,0-.35-.28-.64-.64-.64h-13.98c-.35,0-.64.28-.64.64,0,.64.09,1.28.25,1.91"/>
                  <path class="svg-cls-2" d="m25.35,34.9c1.05,4.07,5.21,6.52,9.28,5.46,2.68-.69,4.77-2.79,5.46-5.46"/>
                  <path class="svg-cls-2" d="m16.49,49.47h32.15c1.66,0,3,1.34,3,3v4.92H13.49v-4.92c0-1.66,1.34-3,3-3Z"/>
                  <line class="svg-cls-2" x1="25.69" y1="35.87" x2="39.33" y2="35.87"/>
                  <line class="svg-cls-2" x1="14.39" y1="54.27" x2="50.94" y2="54.27"/>
              </svg>
          </div>

          <div class="chat-box hidden">
            <div class="chat-box-header">
              <div class="chat-box-header-content">
                  <div class="chat-box-header-text">
                      <div class="chat-box-header-text-title">Neura Nest</div>
                      <div class="chat-box-header-text-sub-title">Vaše AI asistentka</div>
                  </div>
                  <img class="chat-box-header-avatar-icon" src="https://uploads-ssl.webflow.com/63e907777c3cf786df5a5ddd/65c7cfca30490ffb8bf3ae4f_neuranest.png">
                  <img class="chat-box-header-x-close-button" id="chat-box-toggle" src="https://uploads-ssl.webflow.com/63e907777c3cf786df5a5ddd/65c89da041307db45d1dc095_x-close.svg">
              </div>
            </div>
            <div class="chat-box-body">
              <div class="chat-logs">
                <div class="spacer"></div>
              </div><!--chat-log -->
            </div>
            <div class="chat-footer">
              <div class="chat-input-area">
                  <input type="text" id="chat-input" placeholder="Napište zprávu" aria-label="Napište zprávu">
              </div>
              <div class="chat-actions-area">
                  <div class="help-section">
                      <a href="https://www.aktion.cz/vyrobce/kontakt.html" id="chat-human-help" class="chat-action-link">Chci pomoci od člověka</a>
                  </div>
                  <!--<img src="path_to_extra_icon.png" alt="Icon" class="chat-action-icon">-->
                  <button id="chat-send-button" aria-label="Odeslat">Odeslat</button>
              </div>
            </div>
          </div>
        </div>
          `;
          var div = document.createElement('div');
          div.innerHTML = html;
          div.style.position = 'fixed';  // Set position to fixed
          div.style.bottom = '0';  // Position at the bottom of the window
          div.style.right = '0';  // Position at the right of the window
          div.style.zIndex = '999';
          document.body.appendChild(div);

          // Run JavaScript
          var script = document.createElement('script');
          script.innerHTML = ` 
$(document).ready(function() {
  const EXPIRATION_TIME = 86400000; 

  const SHOW_BOT = true;
  let chatHistory = [];
  let greeted = false;

  const chatLogs = $('.chat-logs');
  const chatInput = $('#chat-input');
  const chatSubmit = $('#chat-send-button');

  if (SHOW_BOT) {
    $("#chat-bot-body").css("visibility", "visible");
  }

  loadChatHistory();

  chatInput.on('keypress', handleKeyPress);
  chatSubmit.on('click', sendMessage);

  $("#chat-circle").click(function() {
    toggleChat();
  });

  $("#chat-box-toggle").click(function() {
    toggleChat();
  });

  function toggleChat() {
    const chatCircle = document.getElementById('chat-circle');
    const chatBox = document.querySelector('.chat-box');

    // Function to handle the end of a transition
    function handleTransitionEnd(event) {
      if (event.propertyName === 'opacity') {
        const layout = this.id === 'chat-circle' ? 'flex' : 'block';
        this.style.display = this.classList.contains('hidden') ? 'none' : layout;
        this.removeEventListener('transitionend', handleTransitionEnd);
      }
    }

    // Toggle chat circle
    chatCircle.addEventListener('transitionend', handleTransitionEnd);
    if (chatCircle.classList.contains('hidden')) {
      chatCircle.style.display = 'flex'; // Make it block before starting the transition
      setTimeout(() => {
        chatCircle.classList.toggle('visible');
        chatCircle.classList.toggle('hidden');
      }, 0);
    } else {
      chatCircle.classList.toggle('visible');
      chatCircle.classList.toggle('hidden');
    }

    // Toggle chat box
    chatBox.addEventListener('transitionend', handleTransitionEnd);
    if (chatBox.classList.contains('hidden')) {
      chatBox.style.display = 'block'; // Make it block before starting the transition
      setTimeout(() => {
        chatBox.classList.toggle('visible');
        chatBox.classList.toggle('hidden');
      }, 0);
    } else {
      chatBox.classList.toggle('visible');
      chatBox.classList.toggle('hidden');
    }

    scrollToTheBottom();
    if (!greeted) {
      greetUser(true);
    }
  }

  function handleKeyPress(e) {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function sendMessage() {
    const message = chatInput.val();
    if (message.length === 0) { return; }
    chatInput.val('');
    setFormAvailability(true);
    
    // // Trigger the Google Analytics event
    // gtag('event', 'Chat Message Sent', {
    //   'event_category': 'Chatbot',
    //   'event_label': 'User sent a chat message'
    // });

    const messageElement = createMessageElement(message, 'Vy', 'self');
    prependMessage(messageElement);
    // positionUserMessageName($('.chat-logs').find('.user-message-container:first'));

    const typingIndicator = createTypingIndicator();
    prependMessage(typingIndicator);

    scrollToTheBottom();

    $.ajax({
      url: 'https://metaexponential.eu.pythonanywhere.com/api',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        question: message,
        chat_history: chatHistory
      }),
      dataType: 'json',
      success: function(data) {
        var answer = data.answer;

        typingIndicator.remove();

        // Update chat history
        chatHistory.push({ 'HumanMessage': message });
        chatHistory.push({ 'AIMessage': answer });

        // Save chat history
        saveChatHistory();

        // Write the answer to the window
        answer = removeAssistant(answer);
        const messageElement = createMessageElement(urlify(answer), 'Chatbot');
        $('.chat-logs').prepend(messageElement);
        
        // typeMessage(urlify(answer), messageElement.find('.chat-message'));

        // Re-enable the input and submit button
        setFormAvailability(false);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
        // Remove typing indicator in case of error
        typingIndicator.remove();

        // Re-enable the input and submit button
        setFormAvailability(false);

        let error_message = 'Error! Vyskytla se chyba! Prosíme použijte kontaktní formulář.';
        if (jqXHR.status === 429) {
          const response = JSON.parse(jqXHR.responseText);
          error_message = response.message;
        }
		if(textStatus === 'timeout') {
          error_message('Request timeout! Požadavek se zpracovával příliš dlouho. Zkuste to prosím ještě jednou.');
        }
        const errorMessageElement = createMessageElement(error_message, 'Chatbot');
        prependMessage(errorMessageElement);
      }
    });
  }
  
  function urlify(text) {
    return text;
  }
  
  function renderMessage(message, type) {
    const title = type === 'HumanMessage' ? 'Vy' : 'Chatbot';
    const messageDiv = createMessageElement(message, title);
    prependMessage(messageDiv);
    // positionUserMessageName(messageDiv);
  }

  function createMessageElement_old(message, senderName, className) {
    return $('<div class="chat-' + className + '"><div class="icon"><i class="material-icons"><b>' + senderName + '</b></i></div><div class="chat-message">' + message + '</div></div>');
  }

  function greetUser(shouldTypeMessage) {
    const greeting = "Dobrý den, jsem asistentka poháněná umělou inteligencí. Ráda vám odpovím na jakoukoliv otázku týkající se společnosti Aktion. Ptejte se...";
    const messageElement = createMessageElement(greeting, 'Chatbot');
    $('.chat-logs').prepend(messageElement);
    // if (shouldTypeMessage) {
    //   	typeMessage(greeting, messageElement.find('.chat-message'));
    // }
    // else {
	// 	messageElement.append(greeting);
    // }
    greeted = true;
  }

  function typeMessage(message, element) {
    var i = 0;
    var tempMessage = "";
    var isInsideTag = false;
    var tagBuffer = "";

    function typeWriter() {
      if (i < message.length) {
        var char = message.charAt(i);

        if (char === '<') {
          isInsideTag = true;
        }

        if (isInsideTag) {
          tagBuffer += char;
        } else {
          tempMessage += char;
        }

        if (char === '>') {
          isInsideTag = false;
          tempMessage += tagBuffer;
          tagBuffer = "";
        }

        element.html(tempMessage);  // Use .html() to update the entire text content
        i++;

        // Scroll to the bottom of the chat logs
        scrollToTheBottom();
        requestAnimationFrame(typeWriter);
      }
    }
    requestAnimationFrame(typeWriter);
  }


  function clearChatHistory() {
    localStorage.removeItem('chatHistory');
    chatHistory = [];
    $('.chat-logs').html('');
  }

  function createTypingIndicator() {
    return $('<div class="chat-friend"><div class="icon"><i class="material-icons"><b>Chatbot</b></i></div><div class="typing-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>');
  }

  function scrollToTheBottom() {
    chatLogs.scrollTop(0);
  }

  function setFormAvailability(newState) {
    chatInput.prop('disabled', newState);
    chatSubmit.prop('disabled', newState);
  }

  function loadChatHistory() {
    const savedData = localStorage.getItem('chatHistory');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const currentTime = new Date().getTime();

      // Check if the chat history has expired
      if (currentTime - parsedData.timestamp < EXPIRATION_TIME) {
        chatHistory = parsedData.chatHistory;
        renderChatHistory();
      } else {
        // If the chat history has expired, remove it from local storage
        localStorage.removeItem('chatHistory');
      }
    }
  }

  function saveChatHistory() {
    const data = {
      chatHistory: chatHistory,
      timestamp: new Date().getTime()
    };
    localStorage.setItem('chatHistory', JSON.stringify(data));
  }

  function renderChatHistory() {
    chatLogs.html('');
    greetUser(false);
    chatHistory.forEach(function(entry) {
      const type = Object.keys(entry)[0];
      const message = entry[type];
      const messageWithLinks = urlify(message);
      renderMessage(messageWithLinks, type);
    });
  }

  function prependMessage(messageElement) {
    chatLogs.prepend(messageElement);
  }

  function removeAssistant(response) {
    // Check if the response starts with "Assistant: " and remove it
    return response.replace(/^Assistant: /, '');
  }

  function createMessageElement(message, senderName) {
      return createCommonElement(message, senderName, false);
  }

  function createTypingIndicator() {
      return createCommonElement(null, 'Chatbot', true);
  }

  function createCommonElement(message, senderName, isTypingIndicator) {
    // Determine the class names based on the sender
    var containerClass = senderName === 'Chatbot' ? 'message-container' : 'user-message-container';
    var headerClass = senderName === 'Chatbot' ? 'message-header' : 'user-message-header';
    var contentClass = senderName === 'Chatbot' ? 'message-content' : 'user-message-content';
    var senderTitle = senderName === 'Chatbot' ? 'Neura Nest' : 'Vy';

    // Create the container for the entire message
    var messageContainer = $('<div>', { class: containerClass });

    // Get the current time
    var currentTime = new Date();
    var hours = currentTime.getHours().toString().padStart(2, '0');
    var minutes = currentTime.getMinutes().toString().padStart(2, '0');
    var timeString = hours + ':' + minutes;

    // Create the header element with sender's name and time
    var messageHeader = $('<div>', { class: headerClass })
      .append($('<span>', { class: 'sender-name', text: senderTitle }))
      .append($('<span>', { class: 'message-time', text: timeString }));

    // Decide between showing the message or the typing indicator
    var messageContent;
    if (isTypingIndicator) {
        messageContent = $('<div>', { class: contentClass })
            .append($('<div>', { class: 'typing-indicator' })
                .append($('<div>', { class: 'dot' }))
                .append($('<div>', { class: 'dot' }))
                .append($('<div>', { class: 'dot' })));
    } else {
        messageContent = $('<div>', { class: contentClass })
            .append($('<p>').html(message)); // Insert message content here
    }

    // Append elements based on the sender type
    if (senderName !== 'Chatbot') {
        messageContainer.append(messageHeader).append(messageContent);
    } else {
        // Create the icon element for the chatbot
        var messageIcon = $('<div>', { class: 'message-icon' })
          .append($('<img>', { 
            src: 'https://uploads-ssl.webflow.com/63e907777c3cf786df5a5ddd/65c7cfca30490ffb8bf3ae4f_neuranest.png',
            alt: 'Icon' 
          }));

        // Create a wrapper for the header and content, and append the icon
        var messageContentWrapper = $('<div>', { class: 'message-content-wrapper' })
          .append(messageHeader)
          .append(messageContent);
        messageContainer.append(messageIcon).append(messageContentWrapper);
    }

    // Return the full message container jQuery object
    return messageContainer;
}
});

  `;

  document.body.appendChild(script);

    }
})();
