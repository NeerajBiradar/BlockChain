
let account;
ethereum.request({method : "eth_requestAccounts"}).then(accounts => {
  account = accounts[0];
  console.log(account); 
});

//2.connect to contract
const connectContract = async () => {
    const ABI =[
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "BugArr",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "bug_title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "bug_description",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "priority",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "labelbugs",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "Developer",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string[]",
                            "name": "bugs",
                            "type": "string[]"
                        },
                        {
                            "internalType": "string[]",
                            "name": "features",
                            "type": "string[]"
                        },
                        {
                            "internalType": "string",
                            "name": "patch_name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "deadline",
                            "type": "string"
                        },
                        {
                            "internalType": "bytes",
                            "name": "patch_file",
                            "type": "bytes"
                        },
                        {
                            "internalType": "string",
                            "name": "check",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "deploy",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "uploadtime",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "apprejtime",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "deploytime",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct BugTracking.PatchReq[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "FeatureArr",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "feat_title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "feat_description",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "priority",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "labelfeatures",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "title_b",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description_b",
                    "type": "string"
                }
            ],
            "name": "ReciveBugReport",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "title_f",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description_f",
                    "type": "string"
                }
            ],
            "name": "ReciveFeatureReport",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "SendBugReport",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "bug_title",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "bug_description",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "priority",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "labelbugs",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct BugTracking.BugReport[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "SendFeatureReport",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "feat_title",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "feat_description",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "priority",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "labelfeatures",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct BugTracking.FeatureReport[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_patch_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_time",
                    "type": "string"
                }
            ],
            "name": "SetDeploy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_patch_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_newdate",
                    "type": "string"
                }
            ],
            "name": "SetNewDeploy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "_bugs",
                    "type": "string[]"
                },
                {
                    "internalType": "string[]",
                    "name": "_features",
                    "type": "string[]"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_date",
                    "type": "string"
                }
            ],
            "name": "SetPatch",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_patch_name",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "_file",
                    "type": "bytes"
                },
                {
                    "internalType": "string",
                    "name": "_upt",
                    "type": "string"
                }
            ],
            "name": "SetPatchFile",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_patch_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_check",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_time",
                    "type": "string"
                }
            ],
            "name": "SetPatchcheck",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "_features",
                    "type": "string[]"
                },
                {
                    "internalType": "string[]",
                    "name": "_priority",
                    "type": "string[]"
                }
            ],
            "name": "SetPriorityFeature",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "_bugs",
                    "type": "string[]"
                },
                {
                    "internalType": "string[]",
                    "name": "_priority",
                    "type": "string[]"
                }
            ],
            "name": "SetPrioritybug",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "reports",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "patch_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "deadline",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "patch_file",
                    "type": "bytes"
                },
                {
                    "internalType": "string",
                    "name": "check",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "deploy",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "uploadtime",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "apprejtime",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "deploytime",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]; 
    const Address = "0xC73b335Daeb32f4df2635aA821A4B8532a18EC9c";
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract( ABI, Address); 
    ReadFeatureReport();
    ReadBugReport();
    Approved();
    Rejected();
    Deployed();
}

//3. read from smart contract

//4. Send to smart contract
let FeatCount=1;
const Featindex =[];
const ReadFeatureReport = async () => {
    const data = await window.contract.methods.SendFeatureReport().call();
    console.log(data);
    const table = document.getElementById('Feature-Table');
    for (let i=data.length-1 ; i>=0 ; i--){
        if(data[i].priority != 'default' && data[i].labelfeatures == 0){
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = FeatCount;
            
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = data[i].feat_title;
            const cell3 = newRow.insertCell(2);
            cell3.innerHTML = data[i].priority;

            const cell4 = newRow.insertCell(3);
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.setAttribute('name','myCheckbox');
            checkbox.setAttribute('id', 'checkbox-f-' + FeatCount);
            Featindex.push(i);
            const checkboxWrapper = document.createElement('div');
            checkboxWrapper.classList.add('d-flex', 'justify-content-center','mt-1');
            checkboxWrapper.appendChild(checkbox);
            cell4.appendChild(checkboxWrapper);

            FeatCount=FeatCount+1;
        }
    }
}

let BugCount=1;
const Bugindex =[];
const ReadBugReport = async () => {
    const data = await window.contract.methods.SendBugReport().call();
    console.log(data);
    const table = document.getElementById('Bug-Table');
    for (let i=data.length-1 ; i>=0 ; i--){
        if(data[i].priority != 'default' && data[i].labelbugs == 0){
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = BugCount;
            
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = data[i].bug_title;
            const cell3 = newRow.insertCell(2);
            cell3.innerHTML = data[i].priority;

            const cell4 = newRow.insertCell(3);
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.setAttribute('name','myCheckbox');
            checkbox.setAttribute('id', 'checkbox-b-' + BugCount);
            Bugindex.push(i);
            const checkboxWrapper = document.createElement('div');
            checkboxWrapper.classList.add('d-flex', 'justify-content-center','mt-1');
            checkboxWrapper.appendChild(checkbox);
            cell4.appendChild(checkboxWrapper);

            BugCount=BugCount+1;
        }
    }
}


const BugArr=[];
const FeatArr = [];
const SendTeamBugReport = async () => {
    const bug_data = await window.contract.methods.SendBugReport().call();
    const feat_data = await window.contract.methods.SendFeatureReport().call();
    for(let i=1 ; i<BugCount ; i++){
        const checkbox = document.getElementById('checkbox-b-' + i);
        if(checkbox.checked){
            let temp=Bugindex[i-1];
            BugArr.push(bug_data[temp].bug_title);
        }
    }
    for(let i=1 ; i<FeatCount ; i++){
        const checkbox = document.getElementById('checkbox-f-' + i);
        if(checkbox.checked){
            let temp=Featindex[i-1];
            FeatArr.push(feat_data[temp].feat_title);
        }
    }
    const patch_name  = document.getElementById('Patch-Name').value;
    const deadline = document.getElementById('deadline').value;
    console.log(BugArr,FeatArr,patch_name,deadline);
    if(account == '0x47fb4385f5c205b59033d72330cd9e795626904c'){
        await window.contract.methods.SetPatch(BugArr,FeatArr,patch_name,deadline).send({ from: account });
        location.reload();
        console.log('Transcation Successful');
    }
    else{
        console.log('Transcation Unsuccessful! Admin account does not match');
    }
    
}

const Approved = async () => {
    const data = await window.contract.methods.Developer().call();
    console.log(data);
    let j=0;
    for (let i=data.length-1 ; i>=0 ; i--){
        if(data[i].check == "Approved" && data[i].deploy == 'not'){
            const table = document.getElementById('Approved-Table');
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = j+1;
            j=j+1;
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = data[i].patch_name;
            const cell3 = newRow.insertCell(2);
            cell3.innerHTML = '<ul><li>' + data[i].bugs.join('</li><li>') + '</li><li>' + data[i].features.join('</li><li>') + '</li></ul>';
            const cell4 = newRow.insertCell(3);
            const button = document.createElement('button');
            button.classList.add('btn','btn-primary','mt-3');
            button.innerHTML = 'Download';
            button.onclick = () => {
                const fileBlob = new Blob([new Uint8Array(web3.utils.hexToBytes(data[i].patch_file))], { type: 'application/octet-stream'});
                const fileUrl = URL.createObjectURL(fileBlob);
    
                // Create a new anchor element and set its attributes
                const downloadLink = document.createElement('a');
                downloadLink.href = fileUrl;
                downloadLink.download = 'Patch.exe';
    
                 // Simulate a click on the download link
                downloadLink.click();
            }
            cell4.appendChild(button);

            const cell6 = newRow.insertCell(4);
            cell6.innerHTML = data[i].apprejtime;

            const cell5 = newRow.insertCell(5);
            const deploybutton = document.createElement('button');
            deploybutton.classList.add('btn','btn-success','mt-3');
            deploybutton.innerHTML = 'Deploy';
            cell5.appendChild(deploybutton);
            deploybutton.onclick = async () => {
                const timestamp = new Date();
                const Time = timestamp.toString();
                deploybutton.innerHTML = Time;
                if(account == '0x47fb4385f5c205b59033d72330cd9e795626904c'){
                    await window.contract.methods.SetDeploy(data[i].patch_name,Time).send({ from: account });
                    location.reload();
                    console.log('Transcation Successful');
                }
                else{
                    console.log('Transcation Unsuccessful! Admin account does not match');
                }
                
            }
        }
        

    }
}

const Rejected = async () => {
    const data = await window.contract.methods.Developer().call();
    console.log(data);
    let j=1;
    for (let i=data.length-1 ; i>=0 ; i--){
        if(data[i].check == "Rejected" && data[i].deploy == 'not'){
            const table = document.getElementById('Rejected-Table');
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = j;
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = data[i].patch_name;
            const cell3 = newRow.insertCell(2);
            cell3.innerHTML = '<ul><li>' + data[i].bugs.join('</li><li>') + '</li><li>' + data[i].features.join('</li><li>') + '</li></ul>';
            const cell4 = newRow.insertCell(3);
            const button = document.createElement('button');
            button.classList.add('btn','btn-primary','mt-3');
            button.innerHTML = 'Download';
            button.onclick = () => {
                const fileBlob = new Blob([new Uint8Array(web3.utils.hexToBytes(data[i].patch_file))], { type: 'application/octet-stream'});
                const fileUrl = URL.createObjectURL(fileBlob);
    
                // Create a new anchor element and set its attributes
                const downloadLink = document.createElement('a');
                downloadLink.href = fileUrl;
                downloadLink.download = 'Patch.exe';
    
                 // Simulate a click on the download link
                downloadLink.click();
            }
            cell4.appendChild(button);

            const cell7 = newRow.insertCell(4);
            cell7.innerHTML = data[i].apprejtime;
            
            const cell6 = newRow.insertCell(5);
            const deadlineInput = document.createElement('input');
            deadlineInput.classList.add('mt-3');
            deadlineInput.type = 'date';
            deadlineInput.id = 'deadline-input';
            cell6.appendChild(deadlineInput);

            const cell5 = newRow.insertCell(6);
            const deploybutton = document.createElement('button');
            deploybutton.classList.add('btn','btn-danger','mt-3');
            deploybutton.innerHTML = 'Send';
            cell5.appendChild(deploybutton);
            deploybutton.onclick = async () => {
                const time = document.getElementById('deadline-input').value;
                if(account = '0x47fb4385f5c205b59033d72330cd9e795626904c'){
                    await window.contract.methods.SetNewDeploy(data[i].patch_name,time).send({ from: account });
                    location.reload();
                    console.log('Transcation Successful')
                }
                else{
                    console.log('Transcation Unsuccessful! Admin account does not match');
                }
                
            }
            j=j+1;
        }
        

    }
}

const Deployed = async () => {
    const data = await window.contract.methods.Developer().call();
    console.log(data);
    let j=0;
    for (let i=data.length-1 ; i>=0 ; i--){
        if(data[i].deploy == 'deployed'){
            const table = document.getElementById('Deployed-Table');
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = j+1;
            j=j+1;
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = data[i].patch_name;
            const cell3 = newRow.insertCell(2);
            cell3.innerHTML = '<ul><li>' + data[i].bugs.join('</li><li>') + '</li><li>' + data[i].features.join('</li><li>') + '</li></ul>';
            
            const cell8 = newRow.insertCell(3);
            cell8.innerHTML = data[i].deploytime;

            const cell4 = newRow.insertCell(4);
            const button = document.createElement('button');
            button.classList.add('btn','btn-primary','mt-3');
            button.innerHTML = 'Download';
            button.onclick = () => {
                const fileBlob = new Blob([new Uint8Array(web3.utils.hexToBytes(data[i].patch_file))], { type: 'application/octet-stream'});
                const fileUrl = URL.createObjectURL(fileBlob);
    
                // Create a new anchor element and set its attributes
                const downloadLink = document.createElement('a');
                downloadLink.href = fileUrl;
                downloadLink.download = 'Patch.exe';
    
                 // Simulate a click on the download link
                downloadLink.click();
            }
            cell4.appendChild(button);
        }
        

    }
}