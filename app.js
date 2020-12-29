function callServer(){
  console.log('callServer');
  fetchFileManagerData();
}

async function fetchFileManagerData(entity_id, entity_type){
  let url = `http://localhost:3000/fm`;
  
  try{
    const response = await fetch(url, {
      mode: 'cors',
      method: 'POST',
    });
    console.log('file manager data',response);
    const data = await response.json();
    console.log(data);
    processFilesInfo(data);
    //return data;
  }catch(err){
    console.error(err);
  }
}

function processFilesInfo(data){
  const path = data.path.split('\\');
  showPath(path);
  const filesInfoArray = data.filesInfo;
  showFilesAndDirectories(filesInfoArray);
  console.log(path);
  console.log(filesInfoArray);

}

function showPath(path){
  const filesAddress = document.getElementById('filesAddress');
  path.forEach(ele => {
      const div = document.createElement('div');
      div.innerHTML = ele;
      filesAddress.append(div);
  });
}

function showFilesAndDirectories(filesInfoArray){
  const filesAndDirectoriesRow = document.getElementById('filesAndDirectories');
  filesInfoArray.forEach(file => {
    const col = document.createElement('div');
    col.classList.add('col-md-4');
    col.innerHTML = file.name;
    filesAndDirectoriesRow.append(col);
  })
}