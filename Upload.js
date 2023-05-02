
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
    UploadData();
}


SendPatch = ()  => {
    let obj=JSON.parse(localStorage.getItem("object"));
    let fileinput = document.getElementById("Patch-File");
          const file = fileinput.files[0];
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = async ()=>{
                const fileData = new Uint8Array(reader.result);
                const timestamp = new Date();
                const Time = timestamp.toString();
                console.log(obj[0],obj[1],timestamp,fileData);
                document.getElementById('up').innerHTML = "Upload Time:";
                document.getElementById('upload-time').innerHTML =  Time;
                await window.contract.methods.SetPatchFile(obj[2],fileData,Time).send({ from: account });
                alert('Transcation Successful');
            }
}

UploadData = async () => {
    const bug_data = await window.contract.methods.SendBugReport().call();
    const feature_data = await window.contract.methods.SendFeatureReport().call();
    let obj=JSON.parse(localStorage.getItem("object"));
    console.log(obj,bug_data,feature_data);
    document.getElementById('patch-name').innerHTML = obj[2];
    document.getElementById('bug-title').innerHTML = obj[0].join('<br>');
    document.getElementById('feature-title').innerHTML = obj[1].join('<br>');
    document.getElementById('deadline').innerHTML = obj[3];
}