

function renderComponent(){
    return ` 
      <a style="color: #fff;text-decoration: none;" href="https://yigitsereflioglu.dev" target="_blank">Yigit S</a> 
    `
}

function load(){
    document.getElementById('comp-id').innerHTML = renderComponent();
}

load()