parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
var e;const t={height:.85*window.innerHeight,width:.95*window.innerWidth};var n=!1;t.height<t.width?t.width=t.height:n=!0;var o=t.width/5,r=o,s=t.width-o-r,a=11,c=o/3,d=.6*c,h=10,u="black",f=t.height/(2*a)*.5,g=t.height/(2*a)*.2,m=[1,1],y=document.createElement("button");y.id="redButton",y.style.backgroundColor="red",y.addEventListener("click",function(){re()});var w=document.createElement("button");w.id="blueButton",w.style.backgroundColor="blue",w.addEventListener("click",function(){se()});var p=document.createElement("button");p.id="greenButton",p.style.backgroundColor="green",p.addEventListener("click",function(){ae()});var b=document.createElement("button");b.id="yellowButton",b.style.backgroundColor="yellow",b.addEventListener("click",function(){le()});var x=document.createElement("button");x.id="purpleButton",x.style.backgroundColor="purple",x.addEventListener("click",function(){ce()});var v=document.createElement("button");v.id="whiteButton",v.style.backgroundColor="white",v.addEventListener("click",function(){de()});var S=document.createElement("button");S.id="redGradeButton",S.style.backgroundColor="red",S.addEventListener("click",function(){he()}),whiteGradeButton=document.createElement("button"),whiteGradeButton.id="whiteGradeButton",whiteGradeButton.style.backgroundColor="white",whiteGradeButton.addEventListener("click",function(){ue()});var B=document.createElement("button");B.id="mainButton",B.style.backgroundColor="purple",B.addEventListener("click",function(){mainButtonClick()});var C=document.createElement("button");C.id="doneButton",C.style.backgroundColor="blue",C.addEventListener("click",function(){fe()});var E=document.createElement("button");E.id="helpButton",E.style.backgroundColor="purple",E.addEventListener("click",function(){me()});var T=document.createElement("button");T.id="backButton",T.style.backgroundColor="blue",T.addEventListener("click",function(){ye()});var G=document.createElement("button");G.id="resetButton",G.style.backgroundColor="grey",G.addEventListener("click",function(){we()});var O=document.createElement("button");O.id="modeButton",O.style.backgroundColor="black",O.style.border="black",O.addEventListener("click",function(){ge()});var L={codeBreaker:"Breaker",codeMaker:"Maker",value:"Breaker"},I=0,M=[["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"]],R={x:0,y:0},P={reds:0,whites:0},W=[],H=0,N=0;for(colors=["red","blue","green","yellow","purple","white"],posCodes=[],subCode=[],i=0;i<6;i++)for(j=0;j<6;j++)for(k=0;k<6;k++)for(l=0;l<6;l++)subCode=[colors[i],colors[j],colors[k],colors[l]],posCodes.push(subCode);var A,V=0,U={gamesPlayed:0,gamesWon:0,winRate:0,averageTries:0,highScore:0,timesVisited:0},D={gamesPlayed:0,gamesWon:0,winRate:0,averageTries:0,highScore:0,timesVisited:0};function F(e){Ge(e),currentTV=D.timesVisited,D.timesVisited=currentTV+1,je(e),containerName="mw-mastermind-usernames";try{U=Z(containerName,"overallStats"),(U=JSON.parse(U)).timesVisited+=1,overallStatsStr=JSON.stringify(U)}catch(t){U={gamesPlayed:0,gamesWon:0,winRate:0,averageTries:10,highScore:0,timesVisited:1},overallStatsStr=JSON.stringify(U)}}testing=0,window.startMenu=function(){if(!sessionStorage.getItem("test")){sessionStorage.setItem("test","foo"),me(),A=window.prompt("Enter Player Name");try{usernameInfo=Z("mw-mastermind-usernames","usernames"),JSON.parse(usernameInfo).includes(A)}catch(e){usernameInfo=[A],UNIstr=JSON.stringify(usernameInfo),J("mw-mastermind-usernames","usernames",UNIstr)}D=Ge(A)}F(A)},window.startGame=function(){q.start()},window.startStatPage=function(){document.getElementById("gamesPlayed").innerHTML="Games played: "+D.gamesPlayed,document.getElementById("gamesWon").innerHTML="Games won: "+D.gamesWon,document.getElementById("winRate").innerHTML="Win Rate: "+D.winRate+"%",document.getElementById("averageTries").innerHTML="Average number of guesses: "+D.averageTries,document.getElementById("highScore").innerHTML="High score (least number of guessses): "+D.highScore},window.overallStatPage=function(){U=Z("mw-mastermind-usernames","overallStats"),U=JSON.parse(U),document.getElementById("gamesPlayed").innerHTML="Most games played: "+U.gamesPlayed,document.getElementById("gamesWon").innerHTML="Most games won: "+U.gamesWon,document.getElementById("winRate").innerHTML="Highest win Rate: "+U.winRate+"%",document.getElementById("averageTries").innerHTML="Best average number of guesses: "+U.averageTries,document.getElementById("highScore").innerHTML="Lowest high score (least number of guessses): "+U.highScore};const J=async(e,t,n)=>{const o=new BlobServiceClient("https://mileswadestorage.blob.core.windows.net/?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-09-13T04:53:53Z&st=2020-09-12T20:53:53Z&spr=https,http&sig=0cR8UDG1GAFpT2ig%2FMj%2Bmu2I0yVMfl21U1RgLVKWjpg%3D").getContainerClient(e).getBlockBlobClient(t);await o.upload(n,n.length)},Z=async(e,t)=>{const n=new BlobServiceClient("https://mileswadestorage.blob.core.windows.net/?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-09-13T04:53:53Z&st=2020-09-12T20:53:53Z&spr=https,http&sig=0cR8UDG1GAFpT2ig%2FMj%2Bmu2I0yVMfl21U1RgLVKWjpg%3D").getContainerClient(e),o=(n.getBlockBlobClient(t),n.getBlobClient(t)),i=await o.download();return await async function(e){const t=new FileReader;return new Promise((n,o)=>{t.onloadend=(e=>{n(e.target.result)}),t.onerror=o,t.readAsText(e)})}(await i.blobBody),downloaded},z=async(e,t)=>{const n=new BlobServiceClient("https://mileswadestorage.blob.core.windows.net/?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-09-13T04:53:53Z&st=2020-09-12T20:53:53Z&spr=https,http&sig=0cR8UDG1GAFpT2ig%2FMj%2Bmu2I0yVMfl21U1RgLVKWjpg%3D").getContainerClient(e);await n.deleteBlob(option.text)};var q={canvas:document.createElement("canvas"),start:function(){this.canvas.setAttribute("id","board"),this.canvas.height=t.height,this.canvas.width=t.width,this.canvas.style.marginLeft=n?"0px":String((window.innerWidth-this.canvas.width)/2)+"px",this.context=this.canvas.getContext("2d"),document.body.insertBefore(this.canvas,document.body.childNodes[0]),ve(o,t.height,"#1f1f14",t.width-o,0),We(),Y(),Q(),$(C),_(E),ee(T),te(G),ne(O),X(B),L.value===L.codeBreaker&&Pe()},clear:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},reset:function(){P.reds=0,P.whites=0,R.x=0,R.y=0,I=0,M=[["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"],["0","0","0","0"]],V=0,W=[],N=0,this.start()},backCB:function(){4!=R.x&&(M[R.y-1][R.x-1]="0",Be(R.x,R.y,"black"),1==R.x?(R.x=4,R.y-=1):R.x-=1)},backCM:function(e){if(e){for(i=0;i<4;i++)Ce(i+1,R.y,"black");P.reds=0,P.whites=0}else if(Be(V,0,"black"),V-=1,W.pop(),3===V)for(i=0;i<4;i++)Be(i+1,1,"black"),M[0]=["0","0","0","0"],R.x=1,R.y=1},resetStats:function(){confirm("Are you sure you want to reset your statistics?")&&(Oe(A),startStatPage())}};function K(){}function Y(){var e=h;e+=1.5*t.height/a-c/2,oe(y,e),e+=t.height/a,oe(w,e),e+=t.height/a,oe(p,e),e+=t.height/a,oe(b,e),e+=t.height/a,oe(x,e),e+=t.height/a,oe(v,e)}function Q(){var e=h+t.height/a*7+1.5*t.height/a-d/2;ie(S,e),e+=t.height/a,ie(whiteGradeButton,e)}function X(e){var n=h;e.style.position="absolute",e.style.width=String(o-1)+"px",e.style.height=String(t.height/a-1)+"px ",e.style.borderRadius="0px";var i=document.getElementById("board").offsetLeft+s+1;wOffsetStr=i+"px",hOffsetStr=n+"px",e.style.top=hOffsetStr,e.style.left=wOffsetStr,e.textContent=" Main Menu";var r=document.createElement("I");r.classList.add("arrow"),r.classList.add("left"),e.insertBefore(r,e.childNodes[0]),e.style.color="white",document.body.appendChild(e)}function $(e){var n=h+t.height/a*10-1;e.style.position="absolute",e.style.width=String(o-1)+"px",e.style.height=String(t.height/a-1)+"px ",e.style.borderRadius="0px";var i=document.getElementById("board").offsetLeft+s+r+1;wOffsetStr=i+"px",hOffsetStr=n+"px",e.style.top=hOffsetStr,e.style.left=wOffsetStr,e.textContent="Done",e.style.color="white",document.body.appendChild(e)}function _(e){var n=h+t.height/a*11-1;e.style.position="absolute",e.style.width=String((s+r)/3-1)+"px",e.style.height=String(t.height/a-1)+"px ",e.style.borderRadius="0px";var o=document.getElementById("board").offsetLeft;wOffsetStr=o+"px",hOffsetStr=n+"px",e.style.top=hOffsetStr,e.style.left=wOffsetStr,e.textContent="Help",e.style.color="white",document.body.appendChild(e)}function ee(e){var n=h+t.height/a*11-1;e.style.position="absolute",e.style.width=String((s+r)/3-1)+"px",e.style.height=String(t.height/a-1)+"px ",e.style.borderRadius="0px";var o=document.getElementById("board").offsetLeft;wOffsetStr=o+(s+r)/3+"px",hOffsetStr=n+"px",e.style.top=hOffsetStr,e.style.left=wOffsetStr,e.textContent="Back",e.style.color="white",document.body.appendChild(e)}function te(e){var n=h+t.height/a*11-1;e.style.position="absolute",e.style.width=String((s+r)/3-1)+"px",e.style.height=String(t.height/a-1)+"px ",e.style.borderRadius="0px";var o=document.getElementById("board").offsetLeft;wOffsetStr=o+2*((s+r)/3)+1+"px",hOffsetStr=n+"px",e.style.top=hOffsetStr,e.style.left=wOffsetStr,e.textContent="Reset",e.style.color="white",document.body.appendChild(e)}function ne(e){var n=h+t.height/a*11-1;e.style.position="absolute",e.style.width=String(o-1)+"px",e.style.height=String(t.height/a-1)+"px ",e.style.borderRadius="0px";var i=document.getElementById("board").offsetLeft+s+r+1;wOffsetStr=i+"px",hOffsetStr=n+"px",e.style.top=hOffsetStr,e.style.left=wOffsetStr,e.textContent=L.value,e.style.color="grey",document.body.appendChild(e)}function oe(e,n){var i=c+"px";e.style.position="absolute",e.style.borderRadius="100%",e.style.width=i,e.style.height=i;var r=document.getElementById("board").offsetLeft;r+=t.width-o/2-c/2,wOffsetStr=r+"px",hOffsetStr=n+"px",e.style.top=hOffsetStr,e.style.left=wOffsetStr,document.body.appendChild(e)}function ie(e,n){var i=c/2+"px";e.style.position="absolute",e.style.borderRadius="100%",e.style.width=i,e.style.height=i;var r=document.getElementById("board").offsetLeft;r+=t.width-o/2-d/2,wOffsetStr=r+"px",hOffsetStr=n+"px",e.style.top=hOffsetStr,e.style.left=wOffsetStr,document.body.appendChild(e)}function re(){pe(y.style.backgroundColor)}function se(){pe(w.style.backgroundColor)}function ae(){pe(p.style.backgroundColor)}function le(){pe(b.style.backgroundColor)}function ce(){pe(x.style.backgroundColor)}function de(){pe(v.style.backgroundColor)}function he(){be(S.style.backgroundColor)}function ue(){be(whiteGradeButton.style.backgroundColor)}function fe(){if(L.value==L.codeMaker&&W!=[])for(index=0;index<10;index++)if(row=M[index],row.includes("0")){N=index;break}realGrade=[P.reds,P.whites],Ie(M[N-1],W),P.reds==realGrade[0]&&P.whites==realGrade[1]||(alert("hmm. check your work..."),P.reds=realGrade[0],P.whites=realGrade[1]),Re(N)}function ge(){L.value===L.codeBreaker?L.value=L.codeMaker:L.value=L.codeBreaker,document.getElementById("modeButton").textContent=L.value,q.reset(),L.value===L.codeBreaker&&Pe()}function me(){alert('Welcome to Mastermind. Attempt to guess the secret code or create a secret code for the computer to guess.\n\nTo guess or grade, use the buttons on the right-hand side of the game board. To change play mode, click the "Maker/Breaker" button in the lower right corner of the game board.\nA red grade peg indicates that a guess is the correct color in the correct position. A white grade peg indicates that a guess is the correct color, but in the incorrect position. ')}function ye(){L.value==L.codeMaker?q.backCM():q.backCB()}function we(){q.reset()}function pe(e){if(L.value===L.codeBreaker)if(xe(),Be(R.x,R.y,e),M[R.y-1][R.x-1]=e,R.x<4);else{N=R.y-1,toBeGraded=M[N],Ie(toBeGraded,W);var t=R.y,n=0;for(i=1;i<=P.reds;i++)Ce(++n,t,"red");for(i=1;i<=P.whites;i++)Ce(++n,t,"white");4===P.reds?(newHighScore=Le(!0,R.y),Ee(),setTimeout(function(){for(msg="Congratulations, you won! \n",newHighScore&&(msg+="New high score: "+D.highScore+"! \n"),msg+="Play again?",j=0;j<4;j++)Be(j+1,0,W[j]);confirm(msg)&&q.reset()},2500)):10===R.y&&(Le(!1,10),Te(),setTimeout(function(){alert("Nice try :(")},1500))}else V<4?(Be(V+=1,0,e),W.push(e),4===V&&Re(0)):alert("You are the code maker, you can't try to crack your own code.")}function be(e){L.value==L.codeMaker?++H>4?alert("too many player grades entered"):("red"===e?P.reds++:"white"===e&&P.whites++,Ce(H,R.y,e)):alert("You are the code breaker, you can't grade your own guess.")}function xe(){for(i=0;i<10;i++)for(j=0;j<4;j++)if("0"===M[i][j])return R.x=j+1,void(R.y=i+1)}function ve(e,t,n,o,i){this.width=e,this.height=t,this.x=o,this.y=i,ctx=q.context,ctx.fillStyle=n,ctx.fillRect(this.x,this.y,this.width,this.height)}function Se(e,t,n,o){this.r=e,this.x=n,this.y=o,ctx=q.context,ctx.fillStyle=t,ctx.beginPath(),ctx.arc(this.x,this.y,this.r,0,2*Math.PI),ctx.fill()}function ke(e,t,n,i){ctx=q.context,ctx.font=e,ctx.textAlign="center",ctx.fillStyle="white",ctx.fillText(t,n,i,.8*o)}function Be(e,n,o){this.x=e*s/5,this.y=n*t.height/a+t.height/(2*a),Se(f,o,this.x,this.y)}function Ce(e,n,o){this.x=s+e*r/5,this.y=n*t.height/a+t.height/(2*a),Se(g,o,this.x,this.y)}function Ee(){var e=0,t=setInterval(function(){if(++e%2==1)for(j=0;j<4;j++)Be(j+1,0,W[j]);else for(j=0;j<4;j++)Be(j+1,0,"black");20==e&&clearInterval(t)},100)}function Te(){var e=0,t=setInterval(function(){if(5==++e)clearInterval(t);else for(j=0;j<4;j++)color=colors[Math.floor(6*Math.random())],Be(j+1,0,color)},200);setTimeout(function(){for(j=0;j<4;j++)Be(j+1,0,W[j])},1e3)}function je(e){statsStr=JSON.stringify(D),containerName="mw-mastermind-stats"}function Ge(e){containerName="mw-mastermind-stats";try{statsStr=Z(containerName,e)}catch(t){Oe(e)}}function Oe(e){je(e)}function Le(e,t){return Ge(),t<D.highScore?(D.highScore=t,newHighScore=!0):newHighScore=!1,currentGP=D.gamesPlayed,newGP=currentGP+1,D.gamesPlayed=newGP,e&&(currentGW=D.gamesWon,newGW=currentGW+1,D.gamesWon=newGW),newWR=100*Math.floor(newGW/newGP),D.winRate=newWR,currentAT=D.averageTries,currentTotalPoints=currentAT*currentGP,newTotalPoints=currentTotalPoints+t,newAT=newTotalPoints/D.gamesPlayed,D.averageTries=newAT,je(),newHighScore}function Ie(e,t){e.includes("0")&&alert("Error 123: Coding Fail"),P.reds=0,P.whites=0;const n=[],o=[];for(i=0;i<4;i++)t[i]===e[i]?P.reds++:(n.push(e[i]),o.push(t[i]));for(;0!==n.length;)o.includes(n[0])&&(P.whites++,toRemoveIndex=o.indexOf(n[0]),o.splice(toRemoveIndex,1)),n.splice(0,1)}function Me(e,t){var n=[];for(realGrade=[P.reds,P.whites],index=0;index<e.length;index++)posCode=e[index],Ie(t,posCode),P.reds==realGrade[0]&&P.whites==realGrade[1]&&n.push(posCode);return e=n,P.reds=realGrade[0],P.whites=realGrade[1],e}function Re(e){if(0===e)guess=["yellow","green","blue","white"];else{if(4===P.reds)return alert("Computer Wins!!!"),void q.reset();posCodes=Me(posCodes,M[e-1]),len=posCodes.length,0===len&&alert("hmm. check your work..."),guess=posCodes[len-1]}for(index=0;index<4;index++)Be(index+1,e+1,guess[index]);M[e]=guess,R.y++,H=0,P.reds=0,P.whites=0}function Pe(){for(W=[],i=0;i<4;i++)W.push(colors[Math.floor(6*Math.random())])}function We(){var e=[1,7,8,10];for(i=1;i<a;i++)this.y=i*t.height/a,e.includes(i)?ve(t.width,1,"black",0,this.y):ve(t.width-o,1,"black",0,this.y);for(ve(1,t.height,"black",s,0),ve(1,t.height,"black",s+r,0),ve(s,t.height/a,"#331a00",0,0),ve(r-1,t.height/a,"331a00",s+1,0),this.guessr=t.height/(2*a)*.5,this.grader=t.height/(2*a)*.2,i=0;i<a;i++)for(this.y=i*t.height/a+t.height/(2*a),j=1;j<5;j++)this.x=j*s/5,Se(this.guessr,"black",this.x,this.y),0!==i&&(this.x=s+j*r/5,Se(this.grader,"black",this.x,this.y));this.fontSize=t.height/a*.4,this.fontString=fontSize+"px Arial",ke(this.fontString,"GUESSES",s+1.5*r,t.height/(2*a)+fontSize/2),ke(this.fontString,"GRADES",s+1.5*r,t.height-3*t.height/a-fontSize)}window.mainButtonClick=function(){window.location.href="index.html"},window.resetStatClick=function(){q.resetStats()},window.settingsButtonClick=function(){alert("coming soon")};
},{}]},{},["Focm"], null)
//# sourceMappingURL=mastermind-game-html.56660815.js.map