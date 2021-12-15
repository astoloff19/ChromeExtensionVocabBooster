//detect More Info button click and run function
document.getElementById('mybutton').onclick=function(){
    try {
        clearMoreInfo();
        document.getElementById("t1").style="display:none";
        getMoreInfo();
      }
    catch(e) {
        document.getElementById("t").innerHTML = "Unable to fetch data for request";
    }
    
}

//detect Synonym button click and run function
document.getElementById('synButton').onclick=function(){
    try {
        clearMoreInfo();
        clearSyns();
        document.getElementById("t1").style="display:inline-block";
        getSynonyms();
      }
    catch(e) {
        document.getElementById("t").innerHTML = "Unable to fetch data for request";
    }
}   

//function to send a request for Synonyms and display them in HTML elements
function getSynonyms(){
    //get input
    let inputWord=document.getElementById('word').value;

    //Initialize Variables
    let synArray=[];
    let synsAdded=0;
    const request= new XMLHttpRequest();

    //Send request and do a function on response
    request.open("GET",urlConcatSyn(inputWord));
    request.send();
    request.onload = function(){

        //parse JSON response
        let synonyms=JSON.parse(request.response);
        

        try{
            console.log(synonyms[0].meta.syns)
        }
        catch(e){
            document.getElementById("t1").style="display:none";
            document.getElementById("t").innerHTML = "Unable to fetch data for request";
        }
        
        //Store Synonyms from response array 
        for(let i=0;i<synonyms[0].meta.syns[0].length&&synsAdded<18;i++){
            if(synonyms[0].meta.syns[0]!=null){
                synArray.push(synonyms[0].meta.syns[0][i]);
                synsAdded+=1;
            }
            if(synonyms[0].meta.syns[1]!=null&&i<synonyms[0].meta.syns[1].length){
                synArray.push(synonyms[0].meta.syns[1][i]);
                synsAdded+=1;
            }
            if(synonyms[1]!=null){
                if(synonyms[1].meta.syns[0]!=null&&i<synonyms[1].meta.syns[0].length){
                    synArray.push(synonyms[1].meta.syns[0][i]);
                    synsAdded+=1;
                }
            }
            if(synonyms[2]!=null){
                if(synonyms[2].meta.syns[0]!=null&&i<synonyms[2].meta.syns[0].length){
                    synArray.push(synonyms[2].meta.syns[0][i]);
                    synsAdded+=1;
                }
            }
        }
        console.log(synArray);

        //display synonyms to user
        if(synArray.length>0){
            document.getElementById('a1').innerHTML=synArray[0];
        }
        if(synArray.length>1){
            document.getElementById('a2').innerHTML=synArray[1];
        }
        if(synArray.length>2){
            document.getElementById('b1').innerHTML=synArray[2];
        }
        if(synArray.length>3){
            document.getElementById('b2').innerHTML=synArray[3];
        }
        if(synArray.length>4){
            document.getElementById('c1').innerHTML=synArray[4];
        }
        if(synArray.length>5){
            document.getElementById('c2').innerHTML=synArray[5];
        }

    }
}

//function to send a request for Dictionary Info and display it in HTML elements
function getMoreInfo(){
    //Get Input Value
    let inputWord=document.getElementById('word').value; 

    //Initialize Variables
    let defArray=[];
    const request=new XMLHttpRequest();
    
    ////Send request and do function on response
    request.open("GET",urlConcatMoreInfo(inputWord));
    request.send();
    request.onload = function(){
        let stems;
        //parse JSON response
        let responseArray=JSON.parse(request.response);

        //store part of speach of input
        let poSpeach=responseArray[0].fl;
        
        //Store the stems of input 
        if(responseArray[0].meta!=null){
            stems=responseArray[0].meta.stems;
        }
            

        //store the definitions of input
        if(responseArray[0].shortdef[0]!=null){
            defArray.push(responseArray[0].shortdef[0]);
        }
        if(responseArray[0].shortdef[1]!=null){
            defArray.push(responseArray[0].shortdef[1]);
        }
        if(responseArray[0].shortdef[2]!=null){
            defArray.push(responseArray[0].shortdef[2]);
        }

        //Displays Stored value in HTML elements
        document.getElementById('t').innerHTML=inputWord;
        document.getElementById('t2').innerHTML='Part of Speech';
        document.getElementById('t3').innerHTML=poSpeach;
        document.getElementById('t4').innerHTML="Definitions";
        document.getElementById('t7').innerHTML="Stems";

        if(defArray.length>0){
            document.getElementById('t5').innerHTML=defArray[0];
        }
        if(defArray.length>1){
            document.getElementById('t6').innerHTML=defArray[1];
        }
        if(stems.length>0){
            document.getElementById('t8').innerHTML=stems[0];
        }
        if(stems.length>1){
            document.getElementById('t9').innerHTML=stems[1];
        }
        if(stems.length>2){
            document.getElementById('t10').innerHTML=stems[2];
        }        
    }   
}

//function to concat base url,response type,input word and api key (Dictionary API)
function urlConcatMoreInfo(word){
    fullURL='https://www.dictionaryapi.com/api/v3/references/collegiate/json/'+word+'?key=2a313ed6-a9b0-49c6-b947-d60f244ddd24';
    return fullURL;
}

//function to concat base url,response type,input word and api key (Thesaurus API)
function urlConcatSyn(word){
    fullURL='https://www.dictionaryapi.com/api/v3/references/thesaurus/json/'+word+'?key=1cc37419-31b2-4bac-93c8-2affb4e8afee'
    return fullURL;
}
//clear dictionary dat
function clearMoreInfo(){
    document.getElementById('t').innerHTML='';
    document.getElementById('t2').innerHTML='';
    document.getElementById('t3').innerHTML='';
    document.getElementById('t4').innerHTML='';
    document.getElementById('t7').innerHTML='';
    document.getElementById('t5').innerHTML='';
    document.getElementById('t6').innerHTML='';
    document.getElementById('t8').innerHTML='';
    document.getElementById('t9').innerHTML='';
    document.getElementById('t10').innerHTML='';
}
//clear synonym data
function clearSyns(){
    document.getElementById('a1').innerHTML='';
    document.getElementById('a2').innerHTML='';
    document.getElementById('b1').innerHTML='';
    document.getElementById('b2').innerHTML='';
    document.getElementById('c1').innerHTML='';
    document.getElementById('c2').innerHTML='';
}