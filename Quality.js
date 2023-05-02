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
    QC();
}

//3. read from smart contract

//4. Send to smart contract
const QC = async () => {
    const data = await window.contract.methods.Developer().call();
    console.log(data);
    const table = document.getElementById('Verify-Table');
    let j=0;
    for (let i=data.length-1 ; i>=0 ; i--){
        if(data[i].check == 'None'){
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            cell1.innerHTML = j+1;
            j=j+1;
            const cell2 = newRow.insertCell(1);
            cell2.innerHTML = data[i].patch_name;
            const cell3 = newRow.insertCell(2);
            cell3.innerHTML = '<ul><li>' + data[i].bugs.join('</li><li>') + '</li><li>' + data[i].features.join('</li><li>') + '</li></ul>';
            const cell8 = newRow.insertCell(3);
            cell8.innerHTML = data[i].uploadtime;

            const cell4 = newRow.insertCell(4);
            const button = document.createElement('button');
            button.classList.add('btn','btn-primary','mt-3');
            button.innerHTML = 'Download';
            button.onclick = () => {
                const fileBlob = new Blob([new Uint8Array(web3.utils.hexToBytes(data[i].patch_file))], { type: 'application/octet-stream'});
                const fileUrl = URL.createObjectURL(fileBlob);
                const downloadLink = document.createElement('a');
                downloadLink.href = fileUrl;
                downloadLink.download = 'Patch.exe';
                downloadLink.click();
            }
            cell4.appendChild(button);
            const cell5 = newRow.insertCell(5);
            const buttonContainer = document.createElement('div');
            
            const approveButton = document.createElement('button');
            approveButton.classList.add('btn', 'btn-success', 'mt-2');
            approveButton.innerHTML = 'Approve';
            approveButton.onclick = async () => {
                const timestamp = new Date();
                const Time = timestamp.toString();
                approveButton.innerHTML = Time;
                rejectButton.disabled = true;

                const s = 'Approved';
                console.log(data[i].patch_name,s)
                await window.contract.methods.SetPatchcheck(data[i].patch_name,s,Time).send({ from: account });
            };
            
            const rejectButton = document.createElement('button');
            rejectButton.classList.add('btn', 'btn-danger', 'mt-3','m-2');
            rejectButton.innerHTML = 'Reject';
            rejectButton.onclick = async () => {
                const timestamp = new Date();
                const Time = timestamp.toString();
            // Code for rejecting the patch
                rejectButton.innerHTML = Time;
                approveButton.disabled = true;

                const s = 'Rejected';
                console.log(data[i].time,s)
                await window.contract.methods.SetPatchcheck(data[i].patch_name,s,Time).send({ from: account });
            };
            buttonContainer.appendChild(approveButton);
            buttonContainer.appendChild(rejectButton);
            cell5.appendChild(buttonContainer);
            
        }
    }
}

