
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
    ReadBugReport();
    ReadFeatureReport();
}

let Bugcount=1;
const Bugindex=[];
const ReadBugReport = async () => {
    const data = await window.contract.methods.SendBugReport().call();
    console.log(data);
    const table = document.getElementById('Bugs-Label-Table');
    for (let i=data.length-1 ; i>=0 ; i--){
        if(data[i].priority == 'default'){
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = Bugcount;
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = data[i].bug_title;
            const cell3 = newRow.insertCell(2);
            cell3.innerHTML = data[i].bug_description.replace(/\n/g, '<br>');
            const cell4 = newRow.insertCell(3);
            const prioritySelect = document.createElement('select');
            prioritySelect.setAttribute('class', 'form-select mt-1');
            prioritySelect.setAttribute('id', 'bug-priority' + Bugcount);
            Bugindex.push(i);
            prioritySelect.setAttribute('name', 'bug-priority-' + i);
            prioritySelect.setAttribute('required', '');
            const priorityOption1 = document.createElement('option');
            priorityOption1.setAttribute('value', '');
            priorityOption1.textContent = 'Select Priority';
            const priorityOption3 = document.createElement('option');
            priorityOption3.setAttribute('value', 'High');
            priorityOption3.textContent = 'High';
            const priorityOption4 = document.createElement('option');
            priorityOption4.setAttribute('value', 'Medium');
            priorityOption4.textContent = 'Medium';
            const priorityOption5 = document.createElement('option');
            priorityOption5.setAttribute('value', 'Low');
            priorityOption5.textContent = 'Low';
            prioritySelect.appendChild(priorityOption1);
            prioritySelect.appendChild(priorityOption3);
            prioritySelect.appendChild(priorityOption4);
            prioritySelect.appendChild(priorityOption5);
            cell4.appendChild(prioritySelect);
            Bugcount=Bugcount+1;
        } 
    }
}    


let FeatCount=1;
const Featindex =[];
const ReadFeatureReport = async () => {
    const data = await window.contract.methods.SendFeatureReport().call();
    console.log(data);
    const table = document.getElementById('Features-Label-Table');
    for (let i=data.length-1 ; i>=0 ; i--){
        if(data[i].priority == 'default'){
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = FeatCount;
            
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = data[i].feat_title;
            const cell3 = newRow.insertCell(2);
            cell3.innerHTML = data[i].feat_description.replace(/\n/g, '<br>');
            const cell4 = newRow.insertCell(3);
            const prioritySelect = document.createElement('select');
            prioritySelect.setAttribute('class', 'form-select mt-1');
            prioritySelect.setAttribute('id', 'feat-priority-' + FeatCount);
            Featindex.push(i);
            prioritySelect.setAttribute('name', 'feat-priority-' + i);
            prioritySelect.setAttribute('required', '');
            const priorityOption1 = document.createElement('option');
            priorityOption1.setAttribute('value', '');
            priorityOption1.textContent = 'Select Priority';
            const priorityOption3 = document.createElement('option');
            priorityOption3.setAttribute('value', 'High');
            priorityOption3.textContent = 'High';
            const priorityOption4 = document.createElement('option');
            priorityOption4.setAttribute('value', 'Medium');
            priorityOption4.textContent = 'Medium';
            const priorityOption5 = document.createElement('option');
            priorityOption5.setAttribute('value', 'Low');
            priorityOption5.textContent = 'Low';
            prioritySelect.appendChild(priorityOption1);
            prioritySelect.appendChild(priorityOption3);
            prioritySelect.appendChild(priorityOption4);
            prioritySelect.appendChild(priorityOption5);
            cell4.appendChild(prioritySelect);
            FeatCount=FeatCount+1;
        }
    }
}

const BugArr=[];
const Bugpriority =[];
const SendBugReport = async () => {
    const data = await window.contract.methods.SendBugReport().call();
    for(let i=1 ; i<Bugcount ; i++){
        const priority_value = document.getElementById('bug-priority' +i).value;
        if(priority_value != ''){
            let temp=Bugindex[i-1];
            BugArr.push(data[temp].bug_title);
            Bugpriority.push(priority_value);
        }
    }

    await window.contract.methods.SetPrioritybug(BugArr,Bugpriority).send({ from: account });
    location.reload();
}

const FeatArr = [];
const Featpriority =[];

const SendFeatureReport = async () => {
    const data = await window.contract.methods.SendFeatureReport().call();
    for(let i=1 ; i<FeatCount; i++){
        const priority_value = document.getElementById('feat-priority-' + i).value;
        if(priority_value != ''){
            let temp=Featindex[i-1];
            FeatArr.push(data[temp].feat_title);
            Featpriority.push(priority_value);
        }
    }
    await window.contract.methods.SetPriorityFeature(FeatArr,Featpriority).send({ from: account });
    location.reload();
}