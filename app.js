function callServer(){
  const addressData = {
    "address": "E:\\Guvi Bootcamp\\Main Bootcamp\\Assignments\\Assignment-29-12-20\\file-manager-back-end"
  }
  fetchFileManagerData(addressData);
}

async function fetchFileManagerData(addressData){
  let url = `http://localhost:3500/fm`;
  
  try{
    const response = await fetch(url, {
      mode: 'cors', 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addressData)
    });
    const data = await response.json();
    processFilesInfo(data);
  }catch(err){
    console.error(err);
  }
}

function processFilesInfo(data){
  document.getElementById('filesAddress').innerHTML = '';
  document.getElementById('filesAndDirectories').innerHTML = '';
  const path = data.path.split('\\');
  showPath(path);
  const filesInfoArray = data.filesInfo;
  showFilesAndDirectories(filesInfoArray);
}

function showPath(path){
  const filesAddress = document.getElementById('filesAddress');
  let basePath = '';
  path.forEach(ele => {
      
      basePath += ele+"/";
      console.log(ele, basePath);
      const div = document.createElement('div');
      div.innerHTML = ele;
      div.setAttribute('onclick', `showFilesFolders('${basePath}')`);
      filesAddress.append(div);
  });
}

function showFilesAndDirectories(filesInfoArray){
  const filesAndDirectoriesRow = document.getElementById('filesAndDirectories');
  filesInfoArray.forEach(file => {
    let icon = './icons/file.png';
    let directory = '';
    switch (file.extension) {
      case ".js":
        icon = "./icons/javascript.png";
        break;
      case ".css":
        icon = "./icons/css.png";
        break;
      case ".html":
        icon = "./icons/html.png";
        break;
      case ".txt":
        icon = "./icons/txt.png";
        break;  
      case "directory":
        directory = 'directory';
        icon = "./icons/folder.png";
        break;
      default:
        icon = "./icons/file.png";
        break;
    }
    const address = file.path.replaceAll('\\', '/');
    const col = document.createElement('div');
    col.classList.add('col-md-2','cardStyle','mt-2');
    col.innerHTML = `<div class="card bg-dark text-white text-center ${directory}" onclick="showFilesFolders('${address}')">
                      <img src="${icon}" class="img-fluid-fm" alt="image not found">
                      <div class="card-img-overlay cardBackGround">
                        <p class="card-title text-white" style="padding-top:80%;">${file.name}</p>
                      </div>
                    </div>`;
    filesAndDirectoriesRow.append(col);
  })
}

function showFilesFolders(folderAddress){
  //console.log(folderAddress.replaceAll('/', '\\\\'));
  const addressData = {
    "address": folderAddress.replaceAll('/', '\\\\')
  }
  fetchFileManagerData(addressData);
}