let inpEl = document.getElementById('searchInput');
let resultContEl = document.getElementById("searchResults");

function createAndAppendOf(result) {
    let {
        title,
        link,
        description
    } = result;

    let divEl = document.createElement("div");
    divEl.classList.add("result-item");

    let anchorEl = document.createElement("a");
    anchorEl.textContent = title;
    anchorEl.classList.add("result-title");
    anchorEl.href = link;
    anchorEl.target = "_blank";
    divEl.appendChild(anchorEl);

    let brEl = document.createElement("br");
    divEl.appendChild(brEl);

    let anchorEle = document.createElement("a");
    anchorEle.textContent = link;
    anchorEle.classList.add("result-url");
    anchorEle.href = link;
    anchorEle.target = "_blank";
    divEl.appendChild(anchorEle);

    let brEle = document.createElement("br");
    divEl.appendChild(brEle);

    let paraEl = document.createElement("p");
    paraEl.classList.add("link-description");
    paraEl.textContent = description;
    divEl.appendChild(paraEl);

    resultContEl.appendChild(divEl);

}


function displaying(search_results) {
    for (let result of search_results) {
        createAndAppendOf(result);
    }
}


function findpage(event) {

    if (event.key === "Enter") {
        resultContEl.textContent = '';

        let serachValue = inpEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + serachValue;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = (jsonData);
                console.log(search_results);
                displaying(search_results);
            });


    }
}


inpEl.addEventListener("keydown", findpage);
