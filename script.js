      window.onload = function() {
      
        function userAgent() {
          var alert = document.getElementById('alert');
          alert.innerText = navigator.userAgent + " Match: "+ navigator.userAgent.match("Chrome");
          if (navigator.userAgent.match("Firefox")) {
          alert.innerHTML = '<div class="alert alert-warning"><strong>Warning!</strong> Use Chrome or Internet Explorer when running large files.     </div>';
          }
        }
        userAgent();    
            
            
        //get references to important elements in the html input and pre
        var fileInput = document.getElementById('fileInput');
        var fileDisplayArea = document.getElementById('fileDisplayArea');
        var rowsCheckbox = document.getElementById('rowsCheckbox');
        var rowCountDisplay = document.getElementById('rowCountDisplay');
        var msgReadyToProcess = "File Ready!. Click Process to Analyse File";
        var msgChooseFile = "Choose file to Load! :)";
        //set default message for id fileDisplayArea
        fileDisplayArea.innerText = msgChooseFile;

        //setup event listener on the fileinput that listens for the change event  
        fileInput.addEventListener('change', function(e) {
          console.log(fileInput.value);
          if (fileInput.value) {
            fileDisplayArea.innerText = msgReadyToProcess;
            rowCountDisplay.innerText = msgReadyToProcess;
          } else {
            fileDisplayArea.innerText = msgChooseFile;
            rowCountDisplay.innerText = msgChooseFile;
          }
          //code goes here 
          // //fetch first file
          // var file = fileInput.files[0];
          // //regular expression to test that the file is a text file
          // var textType = /text.*/;
          // //check that the file is a text file
          // if (file.type.match(textType)) {
          //   //create instance of FileReader
          //   var reader = new FileReader();
          //   //setup an event listener for the onload event
          //   reader.onload = function(e) {
          //     fileDisplayArea.innerText = reader.result;
          //   }
          //   reader.readAsText(file);
          // } else {
          //   fileDisplayArea.innerText = "File not supported!";
          // }

        }); //eventlistener

        $('#rowsCheckbox').on('change', function() {
          if (rowsCheckbox.value == "no") {
            rowsCheckbox.value = "yes";
          } else {
            rowsCheckbox.value = "no";
          }
        });

        $("#load").on("click", function() {
          console.log("button pressed");
          console.log(document.getElementById('rowsCheckbox').value);
          //fetch first file
          var file = fileInput.files[0];
          //regular expression to test that the file is a text file
          var textType = /text.*/;
          //check that the file is a text file
          if (file.type.match(textType)) {
            //create instance of FileReader
            var reader = new FileReader();
            //setup an event listener when reader is loaded
            reader.onload = function(e) {
              //add reader result to variable
              var readerResult = reader.result;
              var addedRowNumbers ;
              //used to keep track of row number on the addRowNumber formula
              var rowcount = 1;
              //function to add row numbers to be used later
              function addRowNumber() {
                rowcount = rowcount + 1;
                return '\n' + " " + rowcount + ". ";
              }
              //if checkbox is yes then add row numbers to file
              if (rowsCheckbox.value == "yes") {
                //replace new line with a new line plus row number using function addRowNumber
                addedRowNumbers = readerResult.replace(/\n/g, addRowNumber);
                //Display full file with row numbers (not sure if it is required)
                rowCountDisplay.innerText = addedRowNumbers;
                //console.log(addedRowNumbers);
              } else {
                addedRowNumbers = readerResult;
              }
              //match and return the row where the regex is valid
              var search = addedRowNumbers.match(/.*[^\x00-\x7F].*\n/g);
              //insert match results into element innerText
              fileDisplayArea.innerText = search;
              //use MarkJs to highligh the text. Initiate mark js https://markjs.io/
              var instance = new Mark(fileDisplayArea);
              //enter criteria to highlight
              instance.markRegExp(/[^\x00-\x7F]/g, {
                //by default the element added is "mark" but you can specify a diff element I'm using span because mark adds a little bit of size to the character highlighted
                "element": "span"
              });
            };
            reader.readAsText(file, 'UTF8');
          } else {
            fileDisplayArea.innerText = "File not supported!";
          }
        });

        $("#highlight").on("click", function() {

          var instance = new Mark(fileDisplayArea);
          instance.markRegExp(/[^\x00-\x7F]/g, {
            "element": "span"
          });
        });

      }; //window.onload end
